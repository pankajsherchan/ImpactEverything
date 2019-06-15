const Sale = require('../models/sale');


module.exports = {
    sales: () => {
        return Sale.find()
            .then(sales => {
                return sales.map(sale => {
                    return { ...sale._doc };
                });
            })
    },
    createSale: (args) => {
        const sale = new Sale({
            product: args.saleInput.product,
            customer: args.saleInput.customer,
            total: +args.saleInput.total
        });

        sale.save()
            .then(result => {
                console.log(result);
                return { ...result._doc };
            })
            .catch(err => {
                console.log(err);
                throw err;
            });
        return sale;
    },

    createSales: async args => {
        const data = args.saleInputs.map(s => {
            return new Sale({
                product: s.product,
                customer: s.customer,
                total: s.total
            });
        });

        return await Sale.insertMany(data);
    }
}