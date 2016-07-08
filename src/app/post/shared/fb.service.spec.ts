/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { FbService } from './fb.service';

describe('Fb Service', () => {
  beforeEachProviders(() => [FbService]);

  it('should ...',
      inject([FbService], (service: FbService) => {
    expect(service).toBeTruthy();
  }));
});
