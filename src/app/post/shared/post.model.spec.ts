/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import {Post} from './post.model';

describe('Post', () => {
  it('should create an instance', () => {
    expect(new Post()).toBeTruthy();
  });
});
