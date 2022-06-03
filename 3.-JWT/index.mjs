import express  from "express";
import jwt from "jsonwebtoken";

const app = express();

const secret = "abc123.secreto.serio" // Esto debería de estar en un .env

const user = {
    username: "Daniel",
    password: "abc123."
}

function decodeBasicToken(request) {
    const [ authType, b64token ] = request.headers.authorization.split(" ")
    const tokenBuffer = new Buffer.from(b64token, "base64")
    const token = tokenBuffer.toString()
    return token.split(":")
}

function authMiddleware (req, res, next) {
    try {
        const [ method, token ] = req.headers.authorization.split(" ")
        const validAuth = jwt.verify(token,secret)
        if ( validAuth ) {
            const { username } = jwt.decode(token)
            res.locals["username"] = username // Paso el user name para uso en los controllers
            next()
        } 
    } catch (err) {
        res.sendStatus(401)
    }
}

app.get("/login/", (req, res)=>{
    const [ username, password ] = decodeBasicToken(req)
    if ( 
        username === user.username && password === user.password
    ) {
        const token = jwt.sign(
            {username},
            secret,
            {
                expiresIn: "1h",
            }
        )
        res.send(token)
    } else {
        res.sendStatus(401)
    }
})

app.get("/secretos/", authMiddleware, (req, res)=>{
    res.send(`Hola ${res.locals.username}. El secreto de la vida, el universo y de todo: 42`)
})

app.listen(3000)