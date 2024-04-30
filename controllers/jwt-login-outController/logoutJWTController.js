const { adminLogin } = require('../../model/adminsDB');

const adminDB = {
    Admin: [],
    setAdmin: function(data) {
        this.Admin = data;
    }
};

const logoutJWT = async (req, res) => {
    try {
        const refreshToken = req.cookies.jwt;
        if (!refreshToken) {
            console.log('No Refresh Token Provided');
            return res.sendStatus(204);
        }
        console.log('Received Refresh Token:', refreshToken);

        const allAdmins = await adminLogin();

        let userFound = false;
        for (const admin of allAdmins) {
            if (admin.refreshToken === refreshToken) {
                userFound = true;
                // delete refreshToken in DB
                const otherAdmins = allAdmins.filter(person => person.refreshToken !== refreshToken);
                adminDB.setAdmin(otherAdmins);
                break; // Once user is found and removed from DB, exit the loop
            }
        }

        if (!userFound) {
            console.log('User not found');
            res.clearCookie('jwt', { httpOnly: true });
            return res.sendStatus(204);
        }

        // Set the expired cookie
        const expiredCookie =
            `jwt=; Max-Age=0; Secure=${req.secure || req.headers['x-forwarded-proto'] === 'https'}; HttpOnly; SameSite=Strict; Path=/`;
        res.setHeader('Set-Cookie', expiredCookie);
        console.log('Logout Success');
        res.sendStatus(204);
    } catch (err) {
        console.error('Error occurred during logout:', err);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = { logoutJWT };
