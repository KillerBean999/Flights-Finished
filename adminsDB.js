const {knex, connection} = require("./connection") 

const getAllAdmins = async () =>{
    const result = await knex.raw(`select * from adminstrators`)
    return result
}  

const getAdminById = async (id) =>{
    const result = await knex.select().from('adminstrators').where('id', id)
    return result
}

const addAdmin = (object) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `INSERT INTO adminstrators (fname, lname, password, roles) VALUES (?,?,?'?)`,
      [object.fname, object.lname, object.password, object.roles],
      (err, result) => {
        if (err) {
          console.error("Error: " + err);
          reject(err);
        } else {
          console.log(result);
          resolve(result);
          console.log("New Admin Added")
          
        }
      }
    );
  });
};

const updateAdmin = async (obj, id) =>{
    return new Promise((resolve, reject) => {
    connection.query('UPDATE adminstrators SET fname = ?, lname = ? WHERE id = ?', [obj.fname, obj.lname, id], (err, res) => {
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

const removeAdmin = async (Id) =>{
    const result = await knex("adminstrators").where({'id': Id}).del()
    return result
}

const adminLogin = async () =>{
      const result = await knex('adminstrators').select('lname', 'password', 'roles')
    return result
}


module.exports = {
getAllAdmins ,
getAdminById ,
addAdmin ,
updateAdmin ,
removeAdmin ,
adminLogin
}