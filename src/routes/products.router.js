import { Router } from "express";
import productModel from '../models/products.models.js';

const router = Router()
/*RUTAS*/
//traer todos los productos de la DB
router.get('/allProducts', async (req, resp)=>{
    try{
        const productos = await productModel.find().lean().exec()
        resp.json(productos) //trae un array de objetos.
        
    }catch(error){
        console.log(error)
        resp.status(500).send('ERROR AL ACCEDER A LA BASE DE DATOS')
    }
})
//trae un producto buscado por ID de la DB
router.get('/:pid', async (req, resp)=>{
    try{
        const id_prod = req.params.pid
        const producto = await productModel.findById(id_prod).lean().exec()

        if (!producto) {
            return resp.status(404).send('NO SE ENCONTRO NINGUN PRODUCTO CON EL ID SOLICITADO')

        }else{
            resp.json(producto) //trae un objeto del array de objetos.
        }

    }catch(error){
        console.log(error)
        resp.status(500).send('ERROR AL ACCEDER A LA BASE DE DATOS')
    }
})

//agregar un producto en la vista addProduct
router.post('/addProduct', async (req, resp)=>{
    try{
        const {title, description, category, stock, price, code, thumbnail, status} = req.body

        if(!title || !description || !category || !stock || !price || !code || status === undefined){
            return resp.status(400).json({ error: 'Algunos campos no se ingresaron correctamente.' })

        }else{
            const nuevo_producto = new productModel({
                title,
                description,
                category,
                stock,
                price,
                code,
                thumbnail,
                status,
            })

            const producto_guardado = await nuevo_producto.save()
            resp.json(producto_guardado)
        }

    }catch(error){
        console.log(error)
        resp.status(500).send('ERROR AL ACCEDER A LA BASE DE DATOS')
    }
})

export default router