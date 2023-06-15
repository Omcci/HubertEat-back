const {
    findAllMenus,
    findOneMenu,
    modifyOneMenu,
    addMenu,
    removeMenu,
    addMenuRecipe,
    findAllRecipesMenus,
    findAllRecipesMenusById,
    removeRecipesMenu
  } = require("./model");
  
  const getAllMenus = (req, res) => {
    findAllMenus()
      .then((data) => res.json(data))
      .catch((err) => res.status(500).json({ message: "Server error" }));
  };

  const getAllRecipesMenus = (req, res) => {
    findAllRecipesMenus()
      .then((data) => res.json(data))
      .catch((err) => res.status(500).json({ message: "Server error" }));
  };

  const getAllRecipesMenusById = (req, res) => {
    const id = (req.params.id);
    findAllRecipesMenusById(id)
      .then((data) => {
        if (data) {
          res.json(data);
        } else {
          res.status(404).json({ message: "No menus found with this id !" });
        }
      })
      .catch((err) => res.status(500).json({ message: "Server error" }));
  };


  
  const getOneMenu = (req, res) => {
    const id = (req.params.id);

    // if (isNaN(id)) {
    //   res.status(400).json({ message: "Wrong id type !" });
    // }
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
        res.status(204).json({ id, ...menu });
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

  const createMenuRecipe = (req, res) => {
    const menuRecipe = req.body;
  
    addMenuRecipe(menuRecipe)
      .then((result) => {
        if (result.code == 201) {
        res.status(201).json({...result, code : 201})
        } else if (result.code == 1062){
            res.status(500).json({
                message : "Duplicate entry of recipes into menus",
                code : 500
            })
        } else {
            res.status(500).json({
                message : "Intern error",
                code : 500
            })
        }
    })
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

  const deleteRecipesMenu = (req, res) => {
    const menus_id = parseInt(req.params.menus_id);
    const recipes_id = parseInt(req.params.recipes_id);
    const data = {menus_id, recipes_id}
    if (isNaN(menus_id)) {
      res.status(400).json({ message: "Wrong menu id type" });
    }
    if (isNaN(recipes_id)) {
      res.status(400).json({ message: "Wrong recipe id type" });
    }
    removeRecipesMenu(data)
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
    createMenuRecipe,
    getAllRecipesMenus,
    getAllRecipesMenusById,
    deleteRecipesMenu
  };
  