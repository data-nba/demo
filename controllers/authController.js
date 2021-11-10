const bcrypt = require("bcrypt")
const {user, pass} = require("../config")
const jwt = require("jsonwebtoken");
const { token } = require("morgan");

function auth(req, res)
{
    //autenticar con usuario y contrasenha
    const req_user = req.body.user;
    const req_pass = req.body.pass;

    if(!req_user || !req_pass)
    {
        res.status(500).json({error:"debe pasar el usuario y la contrasenha"})
        return;
    }

    if(!bcrypt.compareSync(req_user, user) || !bcrypt.compareSync(req_pass, pass))
      {
        res.status(500).json({error:"Usuario o contrasenha incorrectos"})
        return;
      }

      const payload = {check:true};
      console.log("1")
      const token = jwt.sign(payload, pass, {
        expiresIn: 144012131212134121
       });
       console.log("2")
       res.status(200).json({token:token})
}

function verifyToken(req, res, next)
{
    console.log(req.headers)
    const token = req.headers.authorization;
    if(!token)
    {
        res.status(500).json({error:"Debe incluir el header authorization con el token"})
        return;
    }

    jwt.verify(token, pass, (err, decoded)=>
    {
        if(err)
        {
            res.status(500).json({error:"Token invalido"})
            return;
        }

        next();
    });


}

module.exports=
{
    auth:auth,
    verifyToken:verifyToken
}