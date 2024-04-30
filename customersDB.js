const {knex, connection} = require("./connection") 


const customersLogin = async () =>{
      const result = await knex('customers').select('username', 'password')
    return result
}


const authCustomersLogin = async (username, pwd) =>{
    try {
    const userAuth = await knex('customers').where({
      'username' : username,
      'password' : pwd
    });
    if(user){
    console.log('Match Successful!');
    return userAuth
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}  


const getAllCustomers = async () =>{
    const result = await knex('customers').select()
    return result
}  

const getCustomerById  = async (id) =>{
    const result = await knex.select().from('customers').where('id', id)
    return result
}

// const addCustomer = (obj) => {
//   return new Promise((res, rej) => {
//     connection('customers')
//       .insert({
//         fname: obj.fname,
//         lname: obj.lname,
//         address: obj.address,
//         phone_no: obj.phone_no,
//         credit_card_no: obj.credit_card_no,
//         username: obj.username,
//         password: obj.password
//       })
//       try{
//         res(result)
//         console.log("Added new Customer!");
//       }
//       catch(err){
//         rej(err)
//       }
//   })
// };
const addCustomer = async(obj) => {
  return knex('customers')
    .insert({
      fname: obj.fname,
      lname: obj.lname,
      address: obj.address,
      phone_no: obj.phone_no,
      credit_card_no: obj.credit_card_no,
      email: obj.email
    })
    .then((result) => {
      console.log('Added new Customer!');
      return result;
    })
    .catch((err) => {
      throw err;
    });
};


const updateCustomer  = async (obj, id) =>{
    return new Promise((resolve, reject) => {
    connection.query('UPDATE customers SET fname = ?,lname = ?,address = ?,phone_no = ?,credit_card_no = ?, email = ? WHERE id = ?', [obj.fname,
      obj.lname,
      obj.address,
      obj.phone_no,
      obj.credit_card_no,
      obj.email,
      id], (err, res) => {
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
const removeCustomer = async (Id) =>{
    const result = await knex("customers").where({'id': Id}).del()
    return result
}
module.exports = {
getAllCustomers,
getCustomerById,
addCustomer, 
updateCustomer, 
removeCustomer ,
customersLogin,
authCustomersLogin
}