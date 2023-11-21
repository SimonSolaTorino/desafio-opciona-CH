import mongoose from "mongoose";

const productsCollection = 'products'
const productsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    stock: { type: Number, required: true },
    price: { type: Number, required: true },
    code: { type: String, required: true, unique: true },
    thumbnail: { type: Array },
    status: { type: Boolean, default: true },
})

const productModel = mongoose.model(productsCollection, productsSchema)
export default productModel