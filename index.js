const express = require('express')
const cors = require('cors')
const {Configuration,OpenAIApi} = require('openai')
const { Imagenes } = require('./models/db')

const app = express()
app.use(express.text())

const configuracion = new Configuration({
    apiKey: process.env.API
})

const openai = new OpenAIApi(configuracion)
const configCors = {
    origin:process.env.HOST,
    optionsSuccessStatus:200
}

app.get('/',cors(configCors),(req,res)=>{
    res.json({backend:'hola mundo'})
})

app.post('/',cors(configCors),async(req,res)=>{
    try {
        const data = JSON.parse(req.body)
        const peticion = await openai.createImage({
            prompt:data.imagenPrompt,
            n:1,
            size:'512x512',
            response_format:'url'
        })

        const url = new String(peticion.data.data[0].url)

        const dataDB = await Imagenes.create({
            nombre:data.imagenPrompt,
            url: url
        })
        res.json(dataDB)
        
    } catch (error) {
        console.log(error);
    }
})

app.get('/imagenes',cors(configCors),async(req,res)=>{
    try {
        const data = await Imagenes.findAll()
        res.json(data)
    } catch (error) {
        console.log(error);
    }
})

app.listen(process.env.PORT)

































