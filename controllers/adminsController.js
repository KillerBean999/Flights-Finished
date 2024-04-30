const express = require('express')
const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.json())



const { getAllAdmins,
    getAdminById,
    addAdmin,
    updateAdmin,
    removeAdmin,
} = require ('../model/adminsDB')

const getAllAdminsC =  async (req, res) => {
    //http://localhost:3000/api/getAllAdmins
    const result = await getAllAdmins()
    res.json(result[0])
}

const getAdminByIdC = async (req, res) => {
    //http://localhost:3000/api/getAdminById/:id
    const id = req.params.id
    try{
    const result = await getAdminById(id)
    res.json(result)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

const addAdminC = async (req,res) =>{
    const newAdmin = req.body 
    const { lname , password} = newAdmin;
    if( !lname || !password) return res.sendStatus(400).json({'msg':'Username and Password Required'})
    const allAdmins = getAllAdmins()
    const duplicate = allAdmins.lname === lname
    if(duplicate) return res.sendStatus(409) //conflict
    try{
        const hashedPwd = await bcrypt.hash(password,10)
        //store new user
        const newAdmin = {
            "fname" : "Admin",
            "lname" : lname,
            "password" : hashedPwd,
            "roles" :{"Admin": 2001}
        }
        const result = addAdmin(newAdmin)
        return result
    }catch(err){
        console.log("Error: "+err)
        res.status(500).send("Error: "+err)
    }
}

const updateAdminC = async (req, res) =>{
    //http://localhost:3000/api/updateAdmin/:id
    try{
    const id = req.params.id
    const updatedAdmin = req.body
    const result = await updateAdmin(updatedAdmin, id)
    res.json(result)
    } catch (err) {
        console.log("Error: "+err)
        res.status(500).send("Error: "+err)
    }
}

const removeAdminC = async (req,res) =>{
    //http://localhost:3000/api/removeAdmin/:id
    const id = req.params.id
    try{
        const result = await removeAdmin(id)
        res.json(result)
    } catch (err) {
        console.log("Error: "+err)
        res.status(500).send("Error: "+err)
    }
}

module.exports = {
    getAllAdminsC,
    getAdminByIdC,
    addAdminC,
    updateAdminC,
    removeAdminC,

}