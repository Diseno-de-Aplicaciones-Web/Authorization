import express from 'express'
import cookieParser from 'cookie-parser'

const app = express()

app.use(cookieParser())

app.get('/updatecookies/', (req,res)=>{
    res.cookie(
        "sessionId",
        Date.now().toString(),
        {
            // secure: true
            sameSite: true,
            maxAge: 30000 // milliseconds
        }
    ) // Establecemos una cookie
    res.cookie("idioma", "castrapo") // y otra más.
    res.sendStatus(200)
})

app.get('/readcookies/', (req, res)=>{
    const { sessionId, idioma} = req.cookies // Recuperamos las cookies
    console.log(sessionId, idioma)
    res.send(`Valor de las cookies: ${sessionId}, ${idioma}`)
})

app.listen(3000)