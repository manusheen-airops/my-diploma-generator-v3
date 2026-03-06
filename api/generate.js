export default async function handler(req, res) {
  const { name = 'Graduate' } = req.query;

  // This is a simple HTML template that will become your image
  const html = `
    <html>
      <body style="margin: 0; padding: 0;">
        <div style="
          width: 2000px;
          height: 1414px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-image: url('https://asset-generator-alpha.vercel.app/GTMGen-Certificate.jpg');
          background-size: cover;
          position: relative;
        ">
          <h1 style="
            position: absolute;
            top: 510px;
            font-size: 85px;
            color: #0e1f13;
            font-family: serif;
            font-weight: bold;
          ">
            ${name}
          </h1>
        </div>
      </body>
    </html>
  `;

  // We are simply sending the HTML back for now to test the route
  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(html);
}
