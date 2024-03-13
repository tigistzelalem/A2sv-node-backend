const Item = require('../model/items')

exports.createItem = async (req, res) => {
    try {
        const { name, price, quantity } = req.body;
        const newItem = new Item({
            name, price, quantity
        });
        res.status(201).json({ message: 'item created' });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}