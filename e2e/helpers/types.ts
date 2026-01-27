import { Locator } from '@playwright/test';

export type BookingsStateResult =
  | {
      state: 'list';
      rows: Locator;
      count: number;
    }
  | {
      state: 'empty';
    };
