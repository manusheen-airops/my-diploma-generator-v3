import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge',
};

export default function () {
  try {
    return new ImageResponse(
      (
        <div style={{ fontSize: 40, color: 'black', background: 'white', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          Hello Manuel! The API is live.
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e) {
    return new Response(`Error: ${e.message}`, { status: 500 });
  }
}

// Version fix
