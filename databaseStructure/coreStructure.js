import {Flavor, Size, Toppings} from "./enumStructure.js";
export class Order{
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
            "customer_name": this.client.name,
            "customer_phone": this.client.phone,
            "customer_address": this.client.address,
            "timestamp": this.timeStamp,
            "total_items": this.items.length,
            "items": this.items.map(item => item.jsonify())
        }
    }
}

export class Customer{
    constructor(name, phone, address) {
        this.name = name;
        this.phone = phone;
        this.address = address;
    }

    jsonify() {
        return {
            "name": this.name,
            "phone": this.phone,
            "address": this.address
        }
    }
}

export class Pizza{
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

export class Drink{
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