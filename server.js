const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  console.log(`Requested URL: ${req.url}, Method: ${req.method}`);
  res.setHeader('Content-Type', 'text/html');

  let path = './views/';
  switch(req.url) {
    case '/':
      path += 'index.html';
      break;
    case '/about':
      path += 'about.html';
      break;
    case '/welcome':
      path += 'welcome.html';
      break;
    default:
      path += 'contact.html';
      break;
  }

  fs.readFile(path, (err, data) => {
    if (err) {
      console.error(`Error reading file ${path}:`, err);
      res.statusCode = 500;
      res.end('Server Error');
    } else {
      res.statusCode = 200;
      res.write(data);
      res.end();
    }
  });
});

server.listen(3000, 'localhost', () => {
  console.log('Server is listening on port 3000');
});
