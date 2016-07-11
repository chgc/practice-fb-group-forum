/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { BlackListComponent } from './black-list.component';

describe('Component: BlackList', (service) => {
  it('should create an instance', () => {
    let component = new BlackListComponent(service);
    expect(component).toBeTruthy();
  });
});
