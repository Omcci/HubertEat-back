const db = require("../../config/database");

const findAllUsers = () => {
  return db
    .query("select * from users")
    .then(([data]) => {
      return data;
    })
    .catch((err) => {
      console.error("err", err);
    });
};

const findOneUser = (id) => {
  return db
    .query("select * from users where id = ?", [id])
    .then(([data]) => {
      return data;
    })
    .catch((err) => {
      console.error("err", err);
    });
};

const modifyOneUser = (user, userId) => {
  return db
    .query("update users set ? where id = ?", [user, userId])
    .then(([result]) => {
      return result;
    })
    .catch((err) => {
      console.error("err", err);
    });
};

const addUser = (user) => {
  const { firstname, lastname, email, password } = user;
  return db
    .query(
      "insert into users (firstname , lastname , email, password) values (?, ?, ?, ?)",
      [firstname, lastname, email, password]
    )
    .then(([data]) => {
      return { id: data.insertId, ...user };
    })
    .catch((err) => {
      console.error(err);
    });
};

const removeUser = (id) => {
  return db
    .execute("delete from recipes where id = ? ", [id])
    .then(([data]) => data)
    .catch((err) => {
      console.error(err);
    });
};

module.exports = {
  findAllUsers,
  findOneUser,
  modifyOneUser,
  addUser,
  removeUser,
};
