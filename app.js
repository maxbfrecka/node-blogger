
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const blogPostsRouter = require('./blogPostsRouter');

const app = express();






app.get('/', (req, res) => {
  res.send('cool');
});


app.use('/blog-posts', blogPostsRouter);


app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});
