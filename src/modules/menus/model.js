const db = require("../../config/database");

const findAllMenus = () => {
  return db
    .query("select * from menus")
    .then(([data]) => {
      return data;
    })
    .catch((err) => {
      console.error("err", err);
    });
};

const findOneMenu = (id) => {
  return db
    .query("select * from menus where id = ?", [id])
    .then(([data]) => {
      return data;
    })
    .catch((err) => {
      console.error("err", err);
    });
};

const modifyOneMenu = (menu, menuId) => {
  return db
    .query("update menus set ? where id = ?", [menu, menuId])
    .then(([result]) => {
      return result;
    })
    .catch((err) => {
      console.error("err", err);
    });
};

const addMenu = (menu) => {
  const { name } = menu;
  return db
    .query(
      "insert into menus (name) values (?)",
      [name]
    )
    .then(([data]) => {
      return { id: data.insertId, ...menu };
    })
    .catch((err) => {
      console.error(err);
    });
};

const removeMenu = (id) => {
  return db
    .execute("delete from menus where id = ? ", [id])
    .then(([data]) => data)
    .catch((err) => {
      console.error(err);
    });
};

module.exports = {
    findAllMenus,
    findOneMenu,
    modifyOneMenu,
    addMenu,
    removeMenu,
};
