const { Size, Flavor, Toppings } = require('./enumStructure');

class Order{
    constructor(client, timeStamp) {
        this.client = client;
        this.timeStamp = timeStamp;
        this.items = [];
    }

    addItems(items) {
        this.items = this.items.concat(items);
    }

    jsonify() {
        return {
            "customerId": this.client.customerId,
            "timestamp": this.timeStamp,
            "total_items": this.items.length,
            "items": this.items.map(item => item.jsonify())
        }
    }
}

class Customer{
    constructor(name, phone, address, customerId) {
        this.name = name;
        this.phone = phone;
        this.address = address;
        this.id = customerId;
    }

    jsonify() {
        return {
            "name": this.name,
            "phone": this.phone,
            "address": this.address,
            "customerId": this.id
        }
    }
}

class Pizza{
    constructor(size = Size.S, firstFlavor = Flavor.MARGARITA, secondFlavor = Flavor.VEGGIE,
                toppings = [Toppings.MUSHROOMS, Toppings.OLIVES],
                price = 10.00, quantity = 1) {
        this.firstFlavor = firstFlavor;
        this.secondFlavor = secondFlavor;
        this.size = size;
        this.toppings = toppings;
        this.price = price;
        this.quantity = quantity;
    }

    jsonify() {
        return {
            "item_type": "Pizza",
            "size": this.size,
            "flavors": [this.firstFlavor, this.secondFlavor],
            "toppings": this.toppings,
            "price": this.price,
            "quantity": this.quantity
        }
    }
}

class Drink{
    constructor(type = "Coke", size = Size.S, price = 2.00, quantity = 1) {
        this.type = type;
        this.size = size;
        this.price = price;
        this.quantity = quantity;
    }

    jsonify() {
        return {
            "item_type": "Drink",
            "drink_type": this.type,
            "size": this.size,
            "price": this.price,
            "quantity": this.quantity
        }
    }
}

module.exports = {
    Order,
    Customer,
    Pizza,
    Drink
};

if (require.main === module) {
    let d1 = new Drink("Coke", Size.S, 2.00, 1);
    let p1 = new Pizza(Size.S, Flavor.MARGARITA, Flavor.VEGGIE, [Toppings.MUSHROOMS, Toppings.OLIVES],
        10.00, 1);
    console.log(d1);
}