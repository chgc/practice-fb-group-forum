/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { YoutubePipe } from './youtube.pipe';

describe('Pipe: Youtube', () => {
  it('create an instance', () => {
    let pipe = new YoutubePipe();
    expect(pipe).toBeTruthy();
  });
});
