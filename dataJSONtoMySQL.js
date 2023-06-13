// const db = require("../../config/database")
// const dataJson = require("./data.js");
// const dataJSONToMySQL = () => {
//     const tab = [];

//     dataJson.map((element, key) => {
//         if (element?.idMeal != undefined && element?.strMeal != undefined && element?.strInstructions != undefined && element?.strMealThumb != undefined) {
//             let newStrIngredient = "";
//             for (let i = 0; i <20; i++) { 
//                 if (element[`strIngredient${i+1}`] != null) {
//                     if (element[`strIngredient${i+1}`] != "") {
//                         newStrIngredient += element[`strIngredient${i+1}`] + ", ";
//                                         }
//                 }
//             }
//             const dataNew = {
//                 id : key,
//                 name : element?.strMeal,
//                 description : element?.strInstructions,
//                 img_url : element?.strMealThumb,
//                 ingredients : newStrIngredient
//             }
//             tab.push(dataNew);
//         }
//     })
    
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
        
    
// }

// dataJSONToMySQL()

require('dotenv').config()
const mysql = require('mysql2/promise');
const dataJson = require("./src/data.js");


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

    const updateData = async (tabData)  => {
        const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME} = process.env

        console.log(DB_HOST);
        // Créer une connexion à la base de données
        const connection = await mysql.createConnection({
          host: DB_HOST, // Remplacez par l'adresse de votre base de données
          user: DB_USER, // Remplacez par votre nom d'utilisateur
          password: DB_PASSWORD, // Remplacez par votre mot de passe
          database: DB_NAME // Remplacez par le nom de votre base de données
        });

        try {
            for (const key in tabData) {
                const { name, description, img_url, ingredients } = tabData[key];
                const query = `Insert into recipes (name , description , ingredients, img_url) values (?, ?, ?, ?)`;
                const params = [name, description, ingredients, img_url];
                await connection.execute(query, params);
                console.log(`Recette ${name} ajouter dans la bdd.`)
            }
            
            console.log('Mise à jour terminée avec succès !');
          } catch (error) {
            console.error('Erreur lors de la mise à jour :', error);
          } finally {
            await connection.end();
            console.log("Déconnexion de la base de données")
          }
      }

      updateData(tab)
}

dataJSONToMySQL()