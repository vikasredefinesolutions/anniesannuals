import { NextResponse } from 'next/server';

const allowedOrigins =
  //Add Urls in the array if you are htting the api's from other route apart from these
  process.env.NODE_ENV === 'production'
    ? [
        // 'https://anniesannuals.redefineapp.io',
        'http://localhost:3001',
        'http://localhost:3000',
        'https://hladmin.anniesannuals.com',
        'https://anniesadmin.redefineapp.io',
        'https://beta-anniesadmin.redefineapp.io',
      ]
    : ['http://localhost:3001', 'http://localhost:3000'];

export function middleware(request: Request) {
  const origin = request.headers.get('origin');

  if (origin && !allowedOrigins.includes(origin)) {
    return new NextResponse(null, {
      status: 400,
      statusText: 'Bad Request',
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  }

  const response = NextResponse.next({
    request: {
      ...request,
      headers: request.headers,
    },
  });

  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS',
  );
  response.headers.set('Access-Control-Allow-Headers', '*');

  return response;
}

export const config = {
  matcher: '/api/:path*',
};
