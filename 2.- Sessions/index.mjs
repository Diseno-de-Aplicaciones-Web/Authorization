import express from 'express'
import session from 'express-session'

const app = express()

const secret = "abc123.secreto.serio" // Esto debería de estar en un .env

const user = {
    username: "Daniel",
    password: "abc123."
}

app.use(session({
    cookie: {
        // secure: true, // Exige HTTPS
        sameSite: true, // Enviar sólo a este backend
        maxAge: 30000 // Expiration in milliseconds
    },
    secret
}))

app.get('/startsession/', (req,res)=>{
    // req.session.cookie.secure = true
    req.session.cookie.sameSite = true
    req.session.cookie.maxAge = 30000 // milliseconds
    res.sendStatus(200)
})

app.get('/readsession/', (req, res)=>{
    const { sessionId, idioma} = req.session.cookie // Recuperamos las cookies
    console.log(sessionId, idioma)
    res.send(`Valor de las cookies: ${sessionId}, ${idioma}`)
})

app.listen(3000)