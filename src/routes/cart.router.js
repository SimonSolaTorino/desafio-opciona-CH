import { Router } from "express";
import cartModel from "../models/cart.models.js";

const router = Router()
/*RUTAS*/
//traer el carrito de la DB
router.get('/carrito/:cid', async (req, resp)=>{
    try{
        const id_carrito = req.params.cid
        const carrito = await cartModel.findById(id_carrito).lean().exec()

        if(!carrito){
            return resp.status(404).send('NO SE ENCONTRO NINGUN PRODUCTO CON EL ID SELECCIONADO.')

        }else{
            resp.json(carrito)
        }
    }catch(error){
        resp.status(500).send('ERROR AL ACCEDER A LA BASE DE DATOS')
    }
})


export default router