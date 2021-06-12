const mongoose = require('mongoose');

let productSchema = new mongoose.Schema(
    {
        product_id: {
            type: Number,
            unique: true,
            required: true
        },
        prodcut_name: { type: String },
        status: { type: String },
    },
    { timestamps: true }
);
const products = mongoose.model('products', productSchema);

let customerSchema = new mongoose.Schema(
    {
        user_id: {
            type: Number,
            unique: true,
            required: true
        },
        name: { type: String },
        email: { type: String },
        mobile: { type: String },
    },
    { timestamps: true }
);

const customers = mongoose.model('customers', customerSchema);

let likesSchema = new mongoose.Schema(
    {
        product: { type: Number },
        customer: { type: Number }
    },
    { timestamps: true }
);

const likes = mongoose.model('likes', likesSchema);

module.exports = { products, customers, likes };
