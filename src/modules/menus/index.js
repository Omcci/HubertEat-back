const router = require("express").Router();

const {
    getAllMenus,
    getOneMenu,
    putOneMenu,
    createMenu,
    deleteMenu,
    createMenuRecipe,
    getAllRecipesMenus,
    getAllRecipesMenusById
} = require("./controller");

router.get("/", getAllMenus);
router.get("/:id", getOneMenu);
router.get("/recipes", getAllRecipesMenus)
router.get("/recipes/:id", getAllRecipesMenusById)
router.put("/:id", putOneMenu);
router.post("/recipes", createMenuRecipe)
router.post("/", createMenu);
router.delete("/:id", deleteMenu);

module.exports = router;
