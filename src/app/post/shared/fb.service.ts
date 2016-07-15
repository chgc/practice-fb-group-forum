import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import 'rxjs/Rx';

import { AngularFire, FirebaseListObservable, FirebaseAuthState, AuthProviders, AuthMethods } from 'angularfire2';
import { Post, LOAD, RESET } from '../shared/index';

declare var FB: any;
declare let firebase: any;

@Injectable()
export class FbService {

  userObj: FacebookLoginResponse;
  blackListsub: FirebaseListObservable<any>;
  authUsersub: any;
  authUser: FirebaseAuthState;
  private groupID = '609637942379913';
  private appId = '263627917354461';
  private version = 'v2.7'; // or v2.0, v2.1, v2.2, v2.3
  private postlimit = 50;
  blackList: any;

  constructor(public store: Store<any>, public af: AngularFire) {
    this.authUsersub = this.af.auth.subscribe(user => {
      this.authUser = user;
      this.blackListsub = af.database.list('blacklist');
      this.load();
    })
    this.init();
  }


  /**
   * This method is used to initialize and setup the SDK.
   * @param params
   */
  init(params?: FacebookInitParams): void {
    if (!params) {
      params = {
        appId: this.appId,
        status: true,
        xfbml: true,
        version: this.version
      }
    }
    FB.init(params);
  }

  /**
      * This method lets you make calls to the Graph API
      * @param path This is the Graph API endpoint path that you want to call.
      * @param method This is the HTTP method that you want to use for the API request.
      * @param params This is an object consisting of any parameters that you want to pass into your Graph API call.
      * @returns {Promise<any>}
      */
  api(path: string, method?: FacebookApiMethod, params?: any): Promise<any> {
    let actionName;
    switch (method) {
      case 1:
        actionName = 'post';
        break;
      case 2:
        actionName = 'delete';
      default:
        actionName = 'get';
        break;
    }
    return new Promise<any>(
      (resolve, reject) => {
        FB.api(path, actionName, params, (response: any) => {
          if (!response) {
            reject();
          } else if (response.error) {
            reject(response.error);
          } else {
            resolve(response);
          }
        });
      }
    );
  }

  fbLogin(res) {
    let creds = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken)
    if (this.authUser) {
      return new Promise<any>(
        (resolve, reject) => {
          resolve();
        }
      );
    }
    return this.af.auth.login(creds,
      {
        provider: AuthProviders.Facebook,
        method: AuthMethods.OAuthToken,
        remember: 'default',
        scope: ['public_profile'],
      });
  }


  login(options?: FacebookLoginOptions): Promise<FacebookLoginResponse> {
    return new Promise<FacebookLoginResponse>(
      (resolve, reject) => {
        FB.getLoginStatus((response) => {
          if (response.status === 'connected') {
            this.userObj = response;
            this.fbLogin(response).then(() => {
              resolve(response);
            });
          } else if (response.status === 'not_authorized') {
            reject();
          } else {
            FB.login((response: FacebookLoginResponse) => {
              if (response.authResponse) {
                this.userObj = response;
                // IMPORTANT STEP !!
                this.fbLogin(response).then(() => {
                  resolve(response);
                });
              } else {
                reject();
              }
            }, options);
          }
        });
      }
    );
  }


  /**
   * Logout the user
   * @returns {Promise<any>}
   */
  logout(): Promise<any> {
    return new Promise<any>(
      (resolve) => {
        FB.logout((response: any) => {
          resolve(response);
          this.userObj = undefined;
        });
      }
    );
  }

  // Main Fuctions
  refresh() {
    this.store.dispatch({ type: RESET, payload: [] });
    this.getGroupFeed();
  }

  load() {
    this.blackListsub.subscribe(data => {
      this.blackList = data;
      this.getGroupFeed();
    })
  }

  getGroupFeed(params = {}) {
    this.login().then(res => {
      params['token'] = res.authResponse.accessToken;
      params['limit'] = this.postlimit;
      if (!params['fields'])
        params['fields'] = 'from,message,link,with_tags,updated_time,comments{comments,message,from}'
      this.api('/' + this.groupID + '/feed', FacebookApiMethod.get, params)
        .then(res => {
          let posts = res.data.filter(d => {
            return d.message && d.message.length > 0;
          }).filter(d => {
            return !this.existInBlackList(d.from.id);
          });

          this.store.dispatch({
            type: LOAD,
            payload: {
              'posts': posts,
              'paging': res.paging
            }
          })
        })
    })

  }

  getPost(id): Observable<any> {
    let params = {
      'token': this.userObj.authResponse.accessToken,
      'fields': 'id,message,link,from,with_tags,updated_time,attachments,comments{comments,message,from}'
    }

    let ob = Observable.fromPromise(
      this.api('/' + id, FacebookApiMethod.get, params)
    );
    return ob.map((res: any) => {
      let comments = [];
      let link = '';
      if (res.comments)
        comments = res.comments.data;
      if (res.link) {
        if (res.link.indexOf('https://www.facebook.com/photo.php') == -1) {
          link = res.link;
        }
      }
      return {
        id: res.id,
        message: res.message,
        link: link,
        from: res.from.name,
        attachments: res.attachments.data[0].subattachments || [],
        comments: comments,
        updated_time: res.updated_time
      };
    });
  }

  addToBlackList(post) {
    if (!this.existInBlackList(post.from.id)) {
      let user = post.from;
      user['updated_time'] = new Date();
      user['uid'] = this.authUser.uid;
      this.blackListsub.push(user);
      this.refresh();
    }
  }

  private existInBlackList(id) {
    let isfound = false;
    if (this.blackList) {
      let myblacklist = this.blackList.filter(x => x.uid == this.authUser.uid);
      for (let i = 0; i < myblacklist.length; i++) {
        if (myblacklist[i].id == id) {
          isfound = true;
        }
      }
    }
    return isfound;
  }
}

export interface FacebookInitParams {
  /**
   * Your application ID. If you don't have one find it in the App dashboard or go there to create a new app. Defaults to null.
   */
  appId?: string;

  /**
   * Determines which versions of the Graph API and any API dialogs or plugins are invoked when using the .api() and .ui() functions. Valid values are determined by currently available versions, such as 'v2.0'. This is a required parameter.
   */
  version: string;

  /**
   * Determines whether a cookie is created for the session or not. If enabled, it can be accessed by server-side code. Defaults to false.
   */
  cookie?: boolean;

  /**
   * Determines whether the current login status of the user is freshly retrieved on every page load. If this is disabled, that status will have to be manually retrieved using .getLoginStatus(). Defaults to false.
   */
  status?: boolean;

  /**
   * Determines whether XFBML tags used by social plugins are parsed, and therefore whether the plugins are rendered or not. Defaults to false.
   */
  xfbml?: boolean;

  /**
   * Frictionless Requests are available to games on Facebook.com or on mobile web using the JavaScript SDK. This parameter determines whether they are enabled. Defaults to false.
   */
  frictionlessRequests?: boolean;

  /**
   * This specifies a function that is called whenever it is necessary to hide Adobe Flash objects on a page. This is used when .api() requests are made, as Flash objects will always have a higher z-index than any other DOM element. See our Custom Flash Hide Callback for more details on what to put in this function. Defaults to null.
   */
  hideFlashCallback?: any;
}

export const enum FacebookApiMethod {
  'get',
  'post',
  'delete'
}

export interface FacebookUiParams {
  // TODO add all possible params for different dialogs
  /**
   * The UI dialog that is being invoked. This is a required field.
   */
  method: any;
}

export interface FacebookAuthResponse {
  accessToken: string;
  expiresIn: number;
  signedRequest: string;
  userID: string;
}

export interface FacebookLoginStatus {
  status: string;
  authResponse: FacebookAuthResponse;
}

export interface FacebookLoginOptions {
  auth_type?: string;
  scope?: string;
  return_scopes?: boolean;
  enable_profile_selector?: boolean;
  profile_selector_ids?: string;
}

export interface FacebookLoginResponse {
  authResponse: FacebookAuthResponse;
  status: string;
}
