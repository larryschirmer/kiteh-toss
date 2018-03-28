const express = require('express');
const http = require('http');
const app = express();

var options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html'],
  index: false,
  maxAge: '1d',
  redirect: false,
  setHeaders: function(res, path, stat) {
    res.set('x-timestamp', Date.now());
  },
};

app.use(express.static('public', options));

app.use(express.static('public'));

const PORT = process.env.PORT || 3090;

let serve = http.createServer(app);
serve.listen(PORT, () => console.log(`Express CDN Server Running at ${PORT}`));