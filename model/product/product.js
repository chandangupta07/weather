let _this = (module.exports = {});
const PSchema = require('./schema');

_this.getProducts = function (reqBody) {
    return new Promise(async (resolve, reject) => {
        try {
            let products = reqBody.products;
            products = products.map((el) => {
                return el * 1;
            })
            let data = await PSchema.products
                .aggregate([
                    {
                        $match: {
                            product_id: { $in: products }
                        }
                    },
                    {
                        $lookup: {
                            from: "likes",
                            localField: "product_id",
                            foreignField: "product",
                            as: "likes"
                        }
                    },
                    { $project: { product_id: 1, prodcut_name: 1, status: 1, likes: 1 } },

                ]);
            let returnArr = [];
            if (data) {
                for (let i = 0; i < data.length; i++) {
                    let obj = {};
                    let element = data[i];
                    obj.product_id = element.product_id;
                    obj.prodcut_name = element.prodcut_name;
                    obj.status = element.status;
                    obj.cutomerLikes = [];
                    if (element.likes.length > 0) {
                        let ids = element.likes.map((el) => {
                            return el.customer;
                        });
                        let customers = await PSchema.customers.find({ user_id: { $in: ids } });
                        obj.cutomerLikes = customers;
                    }
                    returnArr.push(obj);
                }
            }
            return resolve(returnArr);
        } catch (e) {
            return reject(e);
        }
    });
};
