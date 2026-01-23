import '@testing-library/jest-dom';
// mocks
import './mocks/nextNavigation';
import './mocks/nextIntl';
import './mocks/nextIntlNavigation';
import './mocks/toast';
import './mocks/auth';
import './mocks/handleAppError';
import './mocks/supabase';
import './mocks/resizeObserver';

import { beforeAll, afterEach, afterAll } from 'vitest';
import { server } from './server';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
