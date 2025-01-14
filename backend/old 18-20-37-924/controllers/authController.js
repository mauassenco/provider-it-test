const usersDB = {
  users: require('../model/users.json'),
  setUsers: function (data) {
    this.users = data;
  },
};

const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  const foundUser = usersDB.users.find((person) => person.email === email);

  foundUser ? res.sendStatus(200) : res.sendStatus(401);
};

module.exports = { handleLogin };
