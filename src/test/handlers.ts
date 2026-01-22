import { http, HttpResponse } from 'msw';

export const handlers = [
  http.post('/auth/login', async () => {
    return HttpResponse.json({
      user: {
        id: '1',
        email: 'test@test.com',
      },
      session: {
        access_token: 'fake-token',
      },
    });
  }),
];
