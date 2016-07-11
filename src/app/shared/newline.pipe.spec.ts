/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { NewlinePipe } from './newline.pipe';

describe('Pipe: Newline', () => {
  it('create an instance', () => {
    let pipe = new NewlinePipe();
    expect(pipe).toBeTruthy();
  });
});
