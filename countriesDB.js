const {knex, connection} = require("./connection") 


const getAllCountries = async () =>{
    const result = await knex('countries').select()
    return result
} 

const getCountryById  = async (id) =>{
    const result = await knex.select().from('countries').where('id', id)
    return result
}

const addCountry = (object) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `INSERT INTO countries (country_name) VALUES (?)`,
      [object.country_name],
      (err, result) => {
        if (err) {
          console.error("Error: " + err);
          reject(err);
        } else {
          console.log(result);
          resolve(result);
          console.log("New Database Added")
        }
      }
    );
  });
};
const updateCountry = async (newName, id) =>{
    return new Promise((resolve, reject) => {
    connection.query('UPDATE countries SET country_name = ? WHERE id = ?', [newName, id], (err, res) => {
  if (err) {
    console.error(err);
    reject(err);
    // Handle the error
  } else {
    console.log(res);
    resolve(res)
    console.log("Database Updated")
    // Process the results
  }
});
  });
}
const removeCountry = async (Id) =>{
    const result = await knex("countries").where({'id': Id}).del()
    return result
}

module.exports = {
getAllCountries ,
getCountryById ,
addCountry ,
updateCountry ,
removeCountry 

}