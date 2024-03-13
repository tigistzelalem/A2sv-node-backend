const Item = require('../model/items')
const Cart = require('../model/cart');

exports.addItemToCart = async (req, res) => {
    const { userId, itemId, quantity } = req.body;
    try {
        const item = await Item.findById({ itemId });
        if (!item) {
            res.status(404).json({ message: 'item not found' });
        }

        if (item.quantity < quantity) {
            res.status(400).json({ message: 'insufficient quantity' });
        }

        const cart = await Cart.findById({ userId });
        if (!cart) {
            cart = new Cart({ userId, items: [] });
        }

        const itemIndex = cart.items.findIndex(cartItem => cartItem.itemId.toString() === itemId);
        if (itemIndex !== -1) {
            cart.items[itemIndex].quantity += quantity
        } else {
            cart.items.push({ itemId, quantity });
        };

        await cart.save();
        item.quantity -= quantity;
        res.status(200).json({ message: 'item added to cart' })


    } catch (error) {
        res.status(500).json({ message: error.message });

    }

}

exports.getCart = async (req, res) => {
    try {
        const { userId } = req.params.userId;
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            res.status(404).json({ message: "No cart was found" });
        };

        let totalPrice = 0
        const cartItem = cart.items.map((item, index) => {
            const totalPriceForItem = item.price * cart.quantity[index]
            totalPrice += totalPriceForItem
            return {
                name: item.name,
                quantity: cart.quantity[index],
                pricePerItem: item.price,
                totalPrice
            }
        });
        res.status(200).json({ message: 'successful', cartItem })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}

exports.deleteItems = async (req, res) => {

}