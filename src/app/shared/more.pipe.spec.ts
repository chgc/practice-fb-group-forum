/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { MorePipe } from './more.pipe';

describe('Pipe: More', () => {
  it('create an instance', () => {
    let pipe = new MorePipe();
    expect(pipe).toBeTruthy();
  });
});
