export const nextResponse = (
  statusCode: number,
  bodyData: { message?: string; error?: string },
) => {
  const body = JSON.stringify(bodyData);

  return new Response(body, {
    status: statusCode,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
};
