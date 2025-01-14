require('dotenv').config();

const express = require('express');
const connectDB = require('./config/dbConnection');
const corsOptions = require('./config/corsOptions');
const mongoose = require('mongoose');
const cors = require('cors');

const PORT = process.env.SERVER_PORT || 3000;

const app = express();

app.use(express.json());

app.use(cors(corsOptions));

app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));

// const User = mongoose.model('User', {
//   name: String,
//   email: String,
//   birth: String,
//   password: String,
// });

app.post('/users', async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    birth: req.body.birth,
    password: req.body.password,
  });
  await user.save().then(() => res.send('Usuário criado com sucesso !'));
});

app.get('/', (req, res) => {
  res.send('Servidor rodando normalmente!');
});

// // Get Users
// app.get('/users', async (req, res) => {
//   const users = await User.find();
//   res.send(users);
// });

// // Get Users
// app.get('/users/:id', async (req, res) => {
//   const user = await User.findById({ _id: req.params.id });
//   return res.send(user);
// });

// //Auth

// app.post('/users/:id', async (req, res) => {
//   const { email, password } = req.body;
//   const foundUser = usersDB.users.find((person) => person.username === user);
//   // const user = await User.findById({ _id: req.params.id });
//   return res.send(user);
// });

app.listen(PORT, () => {
  // Conectando ao MongoDB
  connectDB();
  console.log(`Server running on port ${PORT}`);
});
