const {
    findAllMenus,
    findOneMenu,
    modifyOneMenu,
    addMenu,
    removeMenu,
  } = require("./model");
  
  const getAllMenus = (req, res) => {
    findAllMenus()
      .then((data) => res.json(data))
      .catch((err) => res.status(500).json({ message: "Server error" }));
  };
  
  const getOneMenu = (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ message: "Wrong id type !" });
    }
    findOneMenu(id)
      .then(([data]) => {
        if (data) {
          res.json(data);
        } else {
          res.status(404).json({ message: "No menus found with this id !" });
        }
      })
      .catch((err) => res.status(500).json({ message: "Server error" }));
  };
  
  const putOneMenu = (req, res) => {
    const menu = req.body;
    const id = req.params.id;
  
    modifyOneMenu(menu, id).then((result) => {
      if (result.affectedRows === 1) {
        res.json({ id, ...menu });
      } else {
        res.status(404).json({ message: "No menus found with this id !" });
      }
    });
  };
  
  const createMenu = (req, res) => {
    const menu = req.body;
  
    addMenu(menu)
      .then((result) => res.status(201).json(result))
      .catch((err) => res.status(500).json({ message: "Server error" }));
  };
  
  const deleteMenu = (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ message: "Wrong id type" });
    }
    removeMenu(id)
      .then((result) => {
        if (result.affectedRows === 1) {
          res.sendStatus(204);
        } else {
          res.status(404).json({ message: "No menus found with this id !" });
        }
      })
      .catch((err) => res.status(500).json({ message: "Server error" }));
  };
  
  module.exports = {
    getAllMenus,
    getOneMenu,
    putOneMenu,
    createMenu,
    deleteMenu,
  };
  