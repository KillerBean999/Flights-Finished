const {knex, connection} = require("./connection") 


const getAllAirlineCompanies = async () =>{
    const result = await knex('airline_companies').select()
    return result
}  

const getAirlineById = async (id) =>{
    const result = await knex.select().from('airline_companies').where('id', id)
    return result
}

const addAirline = (object) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `INSERT INTO airline_companies (airline_name) VALUES (?)`,
      [object.airline_name],
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

const updateAirline = async (newName, id) =>{
    return new Promise((resolve, reject) => {
    connection.query('UPDATE airline_companies SET airline_name = ? WHERE id = ?', [newName, id], (err, res) => {
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
const removeAirline= async (Id) =>{
    const result = await knex("airline_companies").where({'id': Id}).del()
    return result
}

module.exports = {
    getAllAirlineCompanies,
    getAirlineById,
    addAirline,
    updateAirline,
    removeAirline
}