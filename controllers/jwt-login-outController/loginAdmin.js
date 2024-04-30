const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json())
const { adminLogin } = require('../../model/adminsDB')
// const ROLES_LIST = require('../../config/roles_list')
const jwt = require('jsonwebtoken')
require('dotenv').config();
const bcrypt = require('bcrypt')

const adminLoginC = async (req, res) => {
    const allAdmins = await adminLogin();
    const adminDB = {
        Admin : [],
        setAdmin: (data) => {this.Admin = data}
    }
    const { lname, password } = req.body;

    if(!lname || !password) return res.status(400)
    .json({'message': 'Username and Password Required'})

    // Iterate through all admins to check credentials
        const foundUser =  allAdmins.find(admin => lname === admin.lname) 
        if(!foundUser) return res.status(401) //unauth
        console.log('Found User: ',foundUser);
                
        //roles should be found in foundUser             
        const pwdMatch = await bcrypt.compare(password, foundUser.password) 
        if (pwdMatch) { 
        const roles = foundUser.roles
            isLoggedIn = true
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                    'username': foundUser.username,
                    "roles": roles
                    }
                },
                    process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: '30m'}
            )
            const refreshToken = jwt.sign(
                { 'username': lname},
                process.env.REFRESH_TOKEN_SECRET,
                {expiresIn: '1d'}
            )
            //saving refresh token with current user
            const otherUsers = allAdmins.filter(person => person.username !== foundUser.lname)
            const currentUser = {...foundUser, refreshToken}
            adminDB.setAdmin([...otherUsers, currentUser])

            res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000}); //1d
            res.json({accessToken, roles, username: lname})
            return res.json()
        }else{
            return res.status(401).send('Invalid Username or Password');
        }
    
};

module.exports = { adminLoginC }