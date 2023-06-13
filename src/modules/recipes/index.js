const router = require("express").Router();

const {
  getAllRecipes,
  getOneRecipe,
  putOneRecipe,
  createRecipe,
  deleteRecipe,
} = require("./controller");

router.get("/", getAllRecipes);
router.get("/:id", getOneRecipe);
router.put("/:id", putOneRecipe);
router.post("/", createRecipe);
router.delete("/:id", deleteRecipe);

module.exports = router;
