class Order {
    constructor(client, timeStamp) {
        this.client = client;
        this.timeStamp = timeStamp;
        this.items = [];
    }
}

class Customer {
    constructor(name, phone, address) {
        this.name = name;
        this.phone = phone;
        this.address = address;
    }
}

class Pizza {
    constructor(size = "S", firstFlavor = "Margarita", secondFlavor = "Margarita", toppings = ["Mushrooms", "Olives"],
                price = 10.00, quantity = 1) {
        this.size = size;
        this.toppings = toppings;
        this.price = price;
        this.quantity = quantity;
    }
}

class Drink {
    constructor(type= "Coke", size = "S", price = 2.00, quantity = 1) {
        this.type = type;
        this.size = size;
        this.price = price;
        this.quantity = quantity;
    }
}

if (require.main === module) {
    const pizza1 = new Pizza("L", "Pepperoni", "Mushrooms", ["Olives", "Onions"],
        15.00, 2);
    const pizza2 = new Pizza("M", "Margarita", "Margarita", ["Mushrooms", "Olives"],
        10.00, 1);
    const drink1 = new Drink("Sprite", "M", 3.00, 1);
    const customer1 = new Customer("John", "123456789", "123 Fake St.");
    const order = new Order(customer1, "2020-01-01 12:00:00");
}