import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  try {
    const { searchParams } = new URL(req.url);
    const name = searchParams.get('name') || 'Graduate';

    return new ImageResponse(
      (
        <div style={{ 
          display: 'flex', 
          fontSize: 60, 
          color: 'black', 
          background: 'white', 
          width: '100%', 
          height: '100%', 
          alignItems: 'center', 
          justifyContent: 'center' 
        }}>
          Final Test: Hello {name}
        </div>
      ),
      { width: 1200, height: 630 }
    );
  } catch (e) {
    return new Response(`Error: ${e.message}`, { status: 500 });
  }
}
