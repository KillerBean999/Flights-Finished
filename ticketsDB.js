const {knex, connection} = require("./connection") 



const getAllTickets = async () =>{
    const result = await knex.raw(`select * from tickets`)
    return result
} 

const getTicketById  = async (id) =>{
    const result = await knex.select().from('tickets').where('id', id)
    return result
}

const addTicket = (object) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `INSERT INTO tickets (flight_id, customer_id) VALUES (?, ?)`,
      [object.flight_id, object.customer_id],
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
const updateTicket = async (newName, id) =>{
    return new Promise((resolve, reject) => {
    connection.query('UPDATE tickets SET flight_id = ?, customer_id = ? WHERE id = ?', [
        newName.flight_id,
         newName.updateTicket,
          id],
           (err, res) => {
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
const removeTicket = async (Id) =>{
    const result = await knex("tickets").where({'id': Id}).del()
    return result
}

const getLastTicket = async () =>{
  
    const result = await knex("tickets")
    .select()
    .orderBy('id', 'desc')
    .limit(1)
    .first()
    return result
}


module.exports = {
    getAllTickets ,
getTicketById ,
addTicket ,
updateTicket ,
removeTicket ,
getLastTicket
}