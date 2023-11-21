import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import mongoose from 'mongoose';
import cartRouter from './routes/cart.router.js';
import productRouter from './routes/products.router.js';

//CONSTANTES:
const app = express()
const mongoURL = 'mongodb+srv://simonsolat:lDTOOk46b0F6VymI@cluster0.cjjajx4.mongodb.net/ecommerce?retryWrites=true&w=majority'
const mongoDB =  'ecommerce'

//traer info jsonficada
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//MOTOR DE PLANTILLAS:
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

//public
app.use(express.static(__dirname + '/public'))

//rutas
app.use('/productos', productRouter)
app.use('/carrito', cartRouter)

// Conectamos a DB y corremos el Server
mongoose.connect(mongoURL, {dbName: mongoDB})
    .then(()=>{
        console.log('db conectada')
        app.listen(8080, ()=>{console.log('escuchando...')})
    })
    .catch(e => console.error('error al conectarse a la db'))