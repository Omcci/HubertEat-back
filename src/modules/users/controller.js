const {
  findAllUsers,
  findOneUser,
  modifyOneUser,
  addUser,
  removeUser,
} = require("./model");

const getAllUsers = (req, res) => {
  findAllUsers()
    .then((data) => res.json(data))
    .catch((err) => res.status(500).json({ message: "Server error" }));
};

const getOneUser = (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ message: "Wrong id type !" });
  }
  findOneUser(id)
    .then(([data]) => {
      if (data) {
        res.json(data);
      } else {
        res.status(404).json({ message: "No user found with this id !" });
      }
    })
    .catch((err) => res.status(500).json({ message: "Server error" }));
};

const putOneUser = (req, res) => {
  const user = req.body;
  const id = req.params.id;

  modifyOneUser(user, id).then((result) => {
    if (result.affectedRows === 1) {
      res.json({ id, ...user });
    } else {
      res.status(404).json({ message: "No user found with this id !" });
    }
  });
};

const createUser = (req, res) => {
  const user = req.body;

  addUser(user)
    .then((result) => res.status(201).json(result))
    .catch((err) => res.status(500).json({ message: "Server error" }));
};

const deleteUser = (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ message: "Wrong id type" });
  }
  removeUser(id)
    .then((result) => {
      if (result.affectedRows === 1) {
        res.sendStatus(204);
      } else {
        res.status(404).json({ message: "No user found with this id !" });
      }
    })
    .catch((err) => res.status(500).json({ message: "Server error" }));
};

module.exports = {
  getAllUsers,
  getOneUser,
  putOneUser,
  createUser,
  deleteUser,
};
