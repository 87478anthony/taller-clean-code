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

  if (url === '/add-new-office' && method === 'GET') {
    const testData = {
      code: '2500',
      description: 'Bits Barranquilla',
      address: 'Cl 45#27-1',
      identification: '9095642112',
      currency: 'COP',
    };

    const response = writeNewOffice(testData);

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
  }
});

const PORT = 9001;

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
