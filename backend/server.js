require('dotenv').config();
const express = require('express');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connectDB = require('./config/dbConnection');

const PORT = process.env.SERVER_PORT || 3000;

// Inicializando Express
const app = express();

// Liberando o acesso externo - CORS
app.use(cors());

// Models
const User = require('./models/User');

// Aceitando JSON
app.use(express.json());

//Rotas
// Criando uma rota publica
app.get('/', (req, res) => {
  res.status(200).json({ msg: 'Bem vindo a API!' });
});

// Criando uma rota privada
app.get('/user/:id', checkToken, async (req, res) => {
  const id = req.params.id;

  // Checando se o usuario existe - excluindo a senha do retorno
  const user = await User.findById(id, '-password');

  if (!user) {
    return res.status(404).json({ msg: 'Usuário não encontrado!' });
  }

  res.status(200).json({ user });
});

// Rota para criar um novo usuário
app.post('/register', async (req, res) => {
  const { name, email, birth, password, confirmPassword } = req.body;

  // Validando os dados recebidos no corpo da requisição
  if (!name) {
    return res.status(422).json({ msg: 'O nome é obrigatório!' });
  }

  if (!email) {
    return res.status(422).json({ msg: 'O email é obrigatório!' });
  }

  if (!birth) {
    return res.status(422).json({ msg: 'A data de nascimento é obrigatória!' });
  }

  if (!password) {
    return res.status(422).json({ msg: 'A senha é obrigatória!' });
  }

  // Checando se a senha e a confirmação da senha sao iguais
  if (password != confirmPassword) {
    return res.status(422).json({ msg: 'A senha e a confirmação precisam ser iguais!' });
  }

  // Checando se o usuario já existe
  const userExists = await User.findOne({ email: email });

  if (userExists) {
    return res.status(422).json({ msg: 'Por favor, utilize outro e-mail!' });
  }

  // Encriptando password
  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(password, salt);

  // Criando novo usuário
  const user = new User({
    name,
    email,
    birth,
    password: passwordHash,
  });

  try {
    await user.save();

    res.status(201).json({ msg: 'Usuário criado com sucesso!' });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
});

// Rota para autenticar um usuário
app.post('/auth', async (req, res) => {
  const { email, password } = req.body;

  // Validando os dados recebidos no corpo da requisição
  if (!email) {
    return res.status(422).json({ msg: 'O email é obrigatório!' });
  }

  if (!password) {
    return res.status(422).json({ msg: 'A senha é obrigatória!' });
  }

  // Checando se o usuario existe
  const user = await User.findOne({ email: email });

  if (!user) {
    return res.status(404).json({ msg: 'Usuário não encontrado!' });
  }

  // Checando se a senha está correta
  const checkPassword = await bcrypt.compare(password, user.password);

  // Garantindo que a senha esteja correta antes de prosseguir
  if (!checkPassword) {
    return res.status(422).json({ msg: 'Senha inválida' });
  }

  if (!checkPassword) {
    return res.status(422).json({ msg: 'Senha inválida' });
  }

  // Adicionando um token de autenticação
  try {
    const secret = process.env.TOKEN_SECRET;

    const token = jwt.sign(
      {
        id: user._id,
      },
      secret,
    );

    res.status(200).json({ msg: 'Autenticação realizada com sucesso!', token });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
});

//Checando se o token é valido - Middleware
function checkToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  // Separando Bearer do token
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ msg: 'Acesso negado!' });

  try {
    const secret = process.env.SECRET;

    jwt.verify(token, secret);

    //Caso tenha um token e ele seja valido, finaliza o middleware e segue para a rota
    next();
  } catch (err) {
    res.status(400).json({ msg: 'O Token é inválido!' });
  }
}

// Conectando ao MongoDB
app.listen(PORT, () => {
  connectDB();
  console.log(`Server rodando na porta ${PORT}`);
});
