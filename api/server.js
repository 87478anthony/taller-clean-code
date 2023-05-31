const http = require('http');
const { getFile, writeNewOffice } = require('./jsonParser');

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  // Add a new route
  if (url === '/get-json-data' && method === 'GET') {
    const jsonFile = getFile();

    // Return JSON data
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(jsonFile);
  }

  if (url === '/add-new-office' && method === 'POST') {
    const body = [];

    req.on('data', (chunk) => body.push(chunk));

    req.on('end', () => {
      const data = JSON.parse(Buffer.concat(body).toString());
      const response = writeNewOffice(data);

      if (response.includes('exists')) {
        res.writeHead(409, { 'Content-Type': 'application/json' });
        res.end(response);
      } else if (response.includes('successfully')) {
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(response);
      } else {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end('Something went wrong');
      }
    });
  }
});

const PORT = 9001;

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
