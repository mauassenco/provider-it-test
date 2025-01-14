const User = require('../model/User');

const handleNewUser = async (req, res) => {
  try {
    const result = await User.create({
      name: req.body.name,
      email: req.body.email,
      birth: req.body.birth,
      password: req.body.password,
    });

    console.log(result);

    res.status(201).json({ success: `Novo usuário ${user} criado!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUser };
