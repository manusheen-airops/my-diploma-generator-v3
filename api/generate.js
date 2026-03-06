import nodeHtmlToImage from 'node-html-to-image';

export default async function handler(req, res) {
  const { name = 'Graduate' } = req.query;

  const image = await nodeHtmlToImage({
    html: `
      <html>
        <body style="margin: 0; padding: 0;">
          <div style="
            width: 2000px;
            height: 1414px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-image: url('https://asset-generator-alpha.vercel.app/GTMGen-Certificate.jpg');
            background-size: 100% 100%;
            position: relative;
          ">
            <h1 style="
              position: absolute;
              top: 510px;
              font-size: 85px;
              color: #0e1f13;
              font-family: serif;
              font-weight: bold;
              width: 100%;
              text-align: center;
            ">
              ${name}
            </h1>
          </div>
        </body>
      </html>
    `,
    type: 'jpeg',
    quality: 90
  });

  // This tells the browser (and AirOps) "Here is your image file!"
  res.writeHead(200, { 'Content-Type': 'image/jpeg' });
  res.end(image, 'binary');
}
