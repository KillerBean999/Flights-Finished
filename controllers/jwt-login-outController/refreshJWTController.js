const {adminLogin} = require('../../model/adminsDB')

const jwt = require('jsonwebtoken')
require('dotenv').config();

const allAdmins = adminLogin();
const adminDB = {
    Admin : [],
    setAdmin: (data) => {this.Admin = data}
}
const refreshJWT = async (req, res) => {
const cookies = req.cookies
    if(!cookies?.jwt) return res.sendStatus(401);
    console.log(cookies.jwt);
    const refreshToken = cookies.jwt
    // Iterate through all admins to check credentials
    for (const admin of allAdmins) {
        const foundUser = (admin.refreshToken === refreshToken)
        if(!foundUser) return res.status(403) //forbbiden
    }
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) =>{
            if(err || foundUser.username !== decoded.username) return res.sendStatus(403) //invalid token been tempered

            const roles = foundUser.roles && typeof foundUser.roles === 'object' ? Object.values(foundUser.roles) : 'not an obj';
            const accessToken = jwt.sign( 
                {
                    'UserInfo':{
                        'username': decoded.username,
                        'roles': roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: '30s'}
            )
            res.json({ accessToken })
        }
    )
};
module.exports = {refreshJWT}