const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt=require('bcrypt');

const port = 4000;

const app = express();
app.use(express.json());

const requestLogger = (request, response, next) => {
  console.log(`${request.method} : ${request.url}`);
  next();
};

app.use(requestLogger);

passport.use(new LocalStrategy((username, password, done) => {

  const user = users.find(u => u.username === username);

  if (!user) {
      return done(null, false, { message: 'Incorrect Username' });
  }

  const isMatch=bcrypt.compare(password,user.password);
  if (!isMatch) {
      return done(null, false, { message: 'Incorrect Password' });
  }

  return done(null, user);
}));

app.use(passport.initialize());

const isAuthenticated=passport.authenticate('local',{session:false});

const books = [
  {
      id: 1,
      name: 'The Begining after the end',
      author : 'turtleme',
      publications : 'hello',
      version : '1'
  },
  {
      id: 2,
      name: 'Harry potter',
      author: 'jk rowling',
      publicatons : 'darned',
      version : '1'
  },
  {
      id: 3,
      name: 'The Lord of Mysteries',
      author: 'jared',
      publicatons : 'hilibily',
      version : '1'
  }
];

const users = [];

app.get('/', (req, res) => {
  res.send('Welcome to the Book API');
});

app.get('/books',isAuthenticated, (req, res) => {
  res.json(books);
});

app.get('/books/:id',isAuthenticated,  (req, res) => {
  const book = books.find(c => c.id === parseInt(req.params.id));
  if (!book) {
    return res.status(404).send('book not found');
  }
  res.json(book);
});

app.post('/books',isAuthenticated,  (req, res) => {
  const newbook = {
    id: books.length + 1,
    name: req.body.name,
    author: req.body.author,
    publicatons : req.body.publications,
    version : req.body.version
  };
  books.push(newbook);
  res.status(201).json(newbook);
});

app.put('/books/:id',isAuthenticated,  (req, res) => {
  const book = books.find(c => c.id === parseInt(req.params.id));
  if (!book) {
    return res.status(404).send('book not found');
  }
  book.name = req.body.name;
  book.author = req.body.author;
  book.publications = req.body.publications;
  book.version = req.body.version;
  res.json(book);
});

app.delete('/books/:id',isAuthenticated,  (req, res) => {
  const bookIndex = books.findIndex(c => c.id === parseInt(req.params.id));
  if (bookIndex === -1) {
    return res.status(404).send('book not found');
  }
  const deletedbook = books.splice(booksIndex, 1);
  res.json(deletedbook);
});

app.get('/users',isAuthenticated, (req, res) => {
  res.json(users);
});

app.get('/users/:id',isAuthenticated,  (req, res) => {
  const user = users.find(c => c.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).send('User not found');
  }
  res.json(user);
});

app.post('/users',async (req, res) => {
  const hashedPassword=await bcrypt.hash(req.body.password,10);
  const newUser = {
    id: users.length + 1,
    username: req.body.username,
    password: hashedPassword
  };
  users.push(newUser);
  console.log("Users :- ",users);
  res.status(201).json(newUser);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});