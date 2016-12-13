const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {BlogPosts} = require('./models');



//dummy data
BlogPosts.create(
  'Super Post', 'I had a walk with my dog!  ! ! ', 'Max');
BlogPosts.create(
  'Bad Day', 'Good times at the venue', 'John');






//works
router.get('/', (req, res) => {
  console.log('getting')
  res.json(BlogPosts.get());
});


//works...
router.post('/', jsonParser, (req, res) => {
  const requiredFields = ['title', 'content', 'author'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }
  const item = BlogPosts.create(req.body.title, req.body.content, req.body.author);
  res.status(201).json(item);
});




//this isn't working for me.
router.put('/:id', jsonParser, (req, res) => {
  const requiredFields = [
    'id', 'title', 'content', 'author', 'publishDate'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }
  if (req.params.id !== req.body.id) {
    return res.status(400).send(message);
  }
  console.log(`Updating blog post with id \`${req.params.id}\``);
  const updatedItem = BlogPosts.update({
    id: req.params.id,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    publishDate: req.body.publishDate
  });
  res.status(204).json(updatedItem);
});




//works
router.delete('/:id', (req, res) => {
  BlogPosts.delete(req.params.id)
  console.log(`Deleted blogpost item \`${req.params.id}\``)
  res.status(204).end()
})





module.exports = router;