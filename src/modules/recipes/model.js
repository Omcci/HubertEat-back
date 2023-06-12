const db = require("../../config/database");

const findAllRecipes = () => {
  return db
    .query("select * from recipes")
    .then(([data]) => {
      return data;
    })
    .catch((err) => {
      console.error("err", err);
    });
};

const findOneRecipe = (id) => {
  return db
    .query("select * from recipes where id = ?", [id])
    .then(([data]) => {
      return data;
    })
    .catch((err) => {
      console.error("err", err);
    });
};

const modifyOneRecipe = (recipe, recipeId) => {
  return db
    .query("update recipes set ? where id = ?", [recipe, recipeId])
    .then(([result]) => {
      return result;
    })
    .catch((err) => {
      console.error("err", err);
    });
};

const addRecipe = (recipe) => {
  const { name, description, ingredients, img_url } = recipe;
  return db
    .query(
      "insert into recipes (name , description , ingredients, img_url) values (?, ?, ?, ?)",
      [name, description, ingredients, img_url]
    )
    .then(([data]) => {
      return { id: data.insertId, ...recipe };
    })
    .catch((err) => {
      console.error(err);
    });
};

const removeRecipe = (id) => {
  return db
    .execute("delete from recipes where id = ? ", [id])
    .then(([data]) => data)
    .catch((err) => {
      console.error(err);
    });
};

module.exports = {
  findAllRecipes,
  findOneRecipe,
  modifyOneRecipe,
  addRecipe,
  removeRecipe,
};
