/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { FavorComponent } from './favor.component';

describe('Component: Favor', (store, af, router) => {
  it('should create an instance', () => {
    let component = new FavorComponent(store, af, router);
    expect(component).toBeTruthy();
  });
});
