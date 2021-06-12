const express = require('express');
const router = express.Router();
var productModel = require('../model/product/product');

router.post('/likes', async (req, res) => {
    try {
        if (!req.body.products) return res.status(200).json({ err: "product ids are missing" });
        if (!Array.isArray(req.body.products)) return res.status(200).json({ err: "invalid type" });
        if (req.body.products.length <= 0) return res.status(200).json({ err: "Empty ids" });
        let products = await productModel.getProducts(req.body);
        return res.status(200).json({ data: products });
    } catch (e) {
        return res.status(200).json({ err: "server error" });
    }
});

module.exports = router;