import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  try {
    const { searchParams } = new URL(req.url);

    // Capture the name from the AirOps URL parameter
    const name = searchParams.get('name') || 'Graduate Name';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            backgroundImage: 'url(https://asset-generator-alpha.vercel.app/GTMGen-Certificate.jpg)',
            backgroundSize: '100% 100%',
            position: 'relative',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Dynamic Name Overlay */}
          <h1
            style={{
              position: 'absolute',
              top: '515px', // Adjusted to sit on the signature/name line of the GTMGen template
              width: '100%',
              textAlign: 'center',
              fontSize: '85px',
              color: '#0e1f13', // Matches the dark green/black text of the template
              fontFamily: 'serif',
              fontWeight: '600',
              letterSpacing: '-0.02em',
            }}
          >
            {name}
          </h1>
        </div>
      ),
      {
        width: 2000, // Matches the approximate 2:1 ratio of the source image
        height: 1414,
      }
    );
  } catch (e) {
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
