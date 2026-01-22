import '@testing-library/jest-dom';
import { beforeAll, afterEach, afterAll } from 'vitest';
import { server } from './server';

// mocks
import './mocks/nextNavigation';
import './mocks/nextIntl';
import './mocks/nextIntlNavigation';
import './mocks/toast';
import './mocks/auth';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
