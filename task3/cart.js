const initialItems = require('./data')
const availableItems = [...initialItems];
// console.log(availableItems);

let cart = []
function addItemToCart(item, quantity) {
    // console.log('item', item)

    const availableItem = availableItems.find(availItem => availItem.name === item);
    console.log(availableItem);
    if (!availableItem) {
        console.log('Item not found');
        return;
    }

    if (availableItem.quantity < quantity) {
        console.log("Not enough quantity available");
        return;
    }
    // console.log('first', cart);
    const currItemIndex = cart.findIndex(cartItem => cartItem.name === item);
    if (currItemIndex !== -1) {
        cart[currItemIndex].quantity += quantity;
    } else {
        const newItem = { ...availableItem, quantity };
        cart.push(newItem);
        // console.log('cart', cart);
    }
    console.log('last', cart);
}

function viewCart() {
    return cart;
}

module.exports = {
    addItemToCart,
    viewCart
}