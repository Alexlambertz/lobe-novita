export const config = {
  runtime: 'edge',
  unstable_allowDynamic: [
    '/**'
  ],
};

export default async (req: Request) => {
  //if (process.env.NODE_ENV === 'development') {
  const { createGatewayOnEdgeRuntime } = await import('@lobehub/chat-plugins-gateway');

  return createGatewayOnEdgeRuntime()(req);
  //}

  //return new Response('gateway');
};
