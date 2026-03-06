import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge', // This makes the API fast and prevents timeouts
};

export default async function handler(req) {
  try {
    const { searchParams } = new URL(req.url);

    // 1. Capture the variables sent from your AirOps Workflow
    const name = searchParams.get('name') || 'Graduate Name';
    const cohort = searchParams.get('cohort') || 'Advanced';
    const date = searchParams.get('date') || 'March 2026';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#050505', // Dark background like your screenshot
            backgroundImage: 'radial-gradient(circle at 25px 25px, #333 2%, transparent 0%)',
            backgroundSize: '50px 50px',
            color: 'white',
            fontFamily: 'serif',
          }}
        >
          {/* Main Certificate Border */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              border: '10px solid #ffffff',
              padding: '40px',
              width: '90%',
              height: '80%',
              backgroundColor: 'white',
              color: '#1a1a1a',
            }}
          >
            <p style={{ fontSize: 30, marginBottom: 0, color: '#2d5a27' }}>The certification of</p>
            <h1 style={{ fontSize: 80, margin: '10px 0', fontWeight: 'bold', textAlign: 'center' }}>
              Content Engineering
            </h1>
            <p style={{ fontSize: 24, fontStyle: 'italic' }}>is hereby conferred to</p>
            <h2 style={{ fontSize: 60, margin: '5px 0', borderBottom: '2px solid #333' }}>
              {name}
            </h2>
            
            <div style={{ display: 'flex', marginTop: 40, width: '100%', justifyContent: 'space-around' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span style={{ fontSize: 20, color: '#666' }}>Cohort Type:</span>
                <span style={{ fontSize: 24, fontWeight: 'bold', color: '#2d5a27' }}>{cohort}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span style={{ fontSize: 20, color: '#666' }}>Conferral date:</span>
                <span style={{ fontSize: 24, fontWeight: 'bold' }}>{date}</span>
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1920,
        height: 1080,
      }
    );
  } catch (e) {
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}