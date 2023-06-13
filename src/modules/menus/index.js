const router = require("express").Router();

const {
    getAllMenus,
    getOneMenu,
    putOneMenu,
    createMenu,
    deleteMenu,
} = require("./controller");

router.get("/", getAllMenus);
router.get("/:id", getOneMenu);
router.put("/:id", putOneMenu);
router.post("/", createMenu);
router.delete("/:id", deleteMenu);

module.exports = router;
