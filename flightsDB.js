
const {knex, connection} = require("./connection") 


const getAllFlights = async ()=> {
  const result = await knex('flights').select()
  return result
}

const getFlightById = async (id) =>{
    const result = await knex.select().from('flights').where('id', id)
    return result
}

const addFlight = (object) => {
  return new Promise((resolve, reject) => { 

    const formattedDepartureTime = new Date(object.departure_time).toISOString().slice(0, 19).replace('T', ' ');
    const formattedLandingTime = new Date(object.landing_time).toISOString().slice(0, 19).replace('T', ' ');



    connection.query(
      `INSERT INTO flights (airline_company_id, origin_country_id, destination_country_id, departure_time, landing_time,remaining_tickets) VALUES (?,?,?,?,?,?)`,
      [object.airline_company_id,
         object.origin_country_id,
          object.destination_country_id,
            formattedDepartureTime,
            formattedLandingTime,
            object.remaining_tickets],
      (err, result) => {
        console.log('Departe Time: ',formattedDepartureTime);
        console.log('Landing Time: ',formattedLandingTime);
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

const updateFlight  = async (obj, id) =>{

    const formattedDepartureTime = new Date(obj.departure_time).toISOString().slice(0, 19).replace('T', ' ');
    const formattedLandingTime = new Date(obj.landing_time).toISOString().slice(0, 19).replace('T', ' ');

    return new Promise((resolve, reject) => {
    connection.query('UPDATE flights SET airline_company_id = ?,origin_country_id = ?,destination_country_id = ?,departure_time = ?,landing_time = ?, remaining_tickets =  ? WHERE id = ?',
     [obj.airline_company_id,
      obj.origin_country_id,
      obj.destination_country_id,
      formattedDepartureTime,
      formattedLandingTime,
      obj.remaining_tickets,
       id],
       (err, res) => {
  if (err) {
    console.error(err);
    reject(err);
  } else {
    console.log(res);
    resolve(res)
    console.log("Database Updated")
  }
});
  });
}

const removeFlight = async (Id) =>{
    const result = await knex("flights").where({'id': Id}).del()
    return result
}

module.exports = {
    getAllFlights ,
getFlightById ,
addFlight ,
updateFlight ,
removeFlight ,
}