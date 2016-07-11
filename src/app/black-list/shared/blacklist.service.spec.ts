/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { BlacklistService } from './blacklist.service';

describe('Blacklist Service', (af) => {
  beforeEachProviders(() => [BlacklistService]);

  it('should ...',
    inject([BlacklistService], (service: BlacklistService) => {
      expect(service).toBeTruthy();
    }));
});
