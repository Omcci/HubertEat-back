const {
  findAllRecipes,
  findOneRecipe,
  modifyOneRecipe,
  addRecipe,
  removeRecipe,
} = require("./model");

const getAllRecipes = (req, res) => {
  findAllRecipes()
    .then((data) => res.json(data))
    .catch((err) => res.status(500).json({ message: "Server error" }));
};

const getOneRecipe = (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ message: "Wrong id type !" });
  }
  findOneRecipe(id)
    .then(([data]) => {
      if (data) {
        res.json(data);
      } else {
        res.status(404).json({ message: "No recipe found with this id !" });
      }
    })
    .catch((err) => res.status(500).json({ message: "Server error" }));
};

const putOneRecipe = (req, res) => {
  const recipe = req.body;
  const id = req.params.id;

  modifyOneRecipe(recipe, id).then((result) => {
    if (result.affectedRows === 1) {
      res.json({ id, ...recipe });
    } else {
      res.status(404).json({ message: "No recipe found with this id !" });
    }
  });
};

const createRecipe = (req, res) => {
  const recipe = req.body;

  addRecipe(recipe)
    .then((result) => res.status(201).json(result))
    .catch((err) => res.status(500).json({ message: "Server error" }));
};

const deleteRecipe = (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ message: "Wrong id type" });
  }
  removeRecipe(id)
    .then((result) => {
      if (result.affectedRows === 1) {
        res.sendStatus(204);
      } else {
        res.status(404).json({ message: "No recipe found with this id !" });
      }
    })
    .catch((err) => res.status(500).json({ message: "Server error" }));
};

module.exports = {
  getAllRecipes,
  getOneRecipe,
  putOneRecipe,
  createRecipe,
  deleteRecipe,
};
