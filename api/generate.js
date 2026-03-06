// We are targeting the specific Edge-compatible version directly
import { ImageResponse } from '@vercel/og/dist/index.edge.js';

export const config = {
  runtime: 'edge',
};

export default async function (req) {
  try {
    const { searchParams } = new URL(req.url);
    const name = searchParams.get('name') || 'Manuel';

    return new ImageResponse(
      (
        <div style={{ 
          fontSize: 60, color: 'black', background: 'white', 
          width: '100%', height: '100%', display: 'flex', 
          alignItems: 'center', justifyContent: 'center' 
        }}>
          Direct Import Test: Hello {name}
        </div>
      ),
      { width: 1200, height: 630 }
    );
  } catch (e) {
    return new Response(`Direct Import Error: ${e.message}`, { status: 500 });
  }
}
