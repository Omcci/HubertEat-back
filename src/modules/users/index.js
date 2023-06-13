const router = require("express").Router();

const {
  getAllUsers,
  getOneUser,
  putOneUser,
  createUser,
  deleteUser,
} = require("./controller");

router.get("/", getAllUsers);
router.get("/:id", getOneUser);
router.put("/:id", putOneUser);
router.post("/", createUser);
router.delete("/:id", deleteUser);

module.exports = router;
