import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge',
};

export default function (req) {
  try {
    const { searchParams } = new URL(req.url);
    const name = searchParams.get('name') || 'Graduate';

    return new ImageResponse(
      {
        type: 'div',
        props: {
          style: {
            fontSize: 60,
            color: 'black',
            background: 'white',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          },
          children: `Hello ${name}! Ready for AirOps.`,
        },
      },
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e) {
    return new Response(`Error: ${e.message}`, { status: 500 });
  }
}
