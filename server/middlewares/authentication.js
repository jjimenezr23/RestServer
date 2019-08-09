const jwt = require('jsonwebtoken');


////////////////////////////////////
///Verifica token
///////////////////////////////////

let verificaToken = (req, res, next) => {

        let token = req.get('token');

        jwt.verify(token, process.env.SEED, (err, decoded) => {

            if (err) {

                return res.status(401).json({

                    ok: false,
                    err
                });
            }

            req.user = decoded.user;
            next();

        });




    }
    ////////////////////////////////////
    //// let verifica Admin_Role
    ///////////////////////////////////

let verificaAdmin_Role = (req, res, next) => {

    let user = req.user;
    if (user.role === 'ADMIN_ROLE') {

        next();

    } else {

        return res.json({
            ok: false,
            err: {
                message: 'the user is not admin'
            }
        });
    }
};


module.exports = {
    verificaToken,
    verificaAdmin_Role
};