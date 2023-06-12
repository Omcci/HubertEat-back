// const db = require("../../config/database")
const dataJson = require("./data.js");
const dataJSONToMySQL = () => {
    const tab = [];

    dataJson.map((element, key) => {
        if (element?.idMeal != undefined && element?.strMeal != undefined && element?.strInstructions != undefined && element?.strMealThumb != undefined) {
            let newStrIngredient = "";
            for (let i = 0; i <20; i++) { 
                if (element[`strIngredient${i+1}`] != null) {
                    if (element[`strIngredient${i+1}`] != "") {
                        newStrIngredient += element[`strIngredient${i+1}`] + ", ";
                                        }
                }
            }
            const dataNew = {
                id : key,
                name : element?.strMeal,
                description : element?.strInstructions,
                img_url : element?.strMealThumb,
                ingredients : newStrIngredient
            }
            tab.push(dataNew);
        }
    })
    
    // const addRecipe = (recipe) => {
    //     console.log(db);
    //     const { name, description, ingredients, img_url } = recipe;
    //     return db
    //       .query(
    //         "insert into recipes (name , description , ingredients, img_url) values (?, ?, ?, ?)",
    //         [name, description, ingredients, img_url]
    //       )
    //       .then(([data]) => {
    //         return { id: data.insertId, ...recipe };
    //       })
    //       .catch((err) => {
    //         console.error(err);
    //       });
    //   };

    //   tab.map((item) => {
    //     // console.log(name);
    //     return addRecipe(item)
    //   })
        
    
}

dataJSONToMySQL()