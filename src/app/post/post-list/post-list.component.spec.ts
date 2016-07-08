/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { PostListComponent } from './post-list.component';

describe('Component: PostList', (fb, route, router, store) => {
  it('should create an instance', () => {
    let component = new PostListComponent(fb, route, router, store);
    expect(component).toBeTruthy();
  });
});
