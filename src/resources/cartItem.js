class CartItem {
    constructor(_id, quantity, amount, price, title, image) {

        this._id = _id;
        this.quantity = quantity;
        this.amount = amount;
        this.price = price;
        this.title = title;
        this.image = image;

    }
}

export default CartItem;