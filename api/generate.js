import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge',
};

export default async function (req) {
  const { searchParams } = new URL(req.url);
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
        <h1
          style={{
            position: 'absolute',
            top: '510px', // This sits it perfectly on the signature/name line
            width: '100%',
            textAlign: 'center',
            fontSize: '85px',
            color: '#0e1f13', // Matches the GTMGen brand dark green/black
            fontFamily: 'serif',
            fontWeight: 'bold',
          }}
        >
          {name}
        </h1>
      </div>
    ),
    {
      width: 2000,
      height: 1414,
    }
  );
}
