import {Flavor, Size, SoftDrink, Toppings} from "./enumStructure.js";
import {Customer, Drink, Order, Pizza} from "./coreStructure.js";

const pizza1 = new Pizza(Size.L, Flavor.PEPPERONI, Flavor.HAWAIIAN, [Toppings.OLIVES, Toppings.ONIONS],
        15.00, 2);
const pizza2 = new Pizza(Size.M, Flavor.VEGGIE, Flavor.MARGARITA, [Toppings.HAM, Toppings.PINEAPPLE],
        12.00, 1);
const drink1 = new Drink(SoftDrink.COKE, Size.M, 2.00, 1);
const customer1 = new Customer("John", "123456789", "123 Fake St.");
const items = [pizza1, pizza2, drink1];
const order = new Order(customer1, "2020-01-01 12:00:00");
order.addItems(items)
let test = order.jsonify()
console.log(JSON.stringify(orderHashmap, null, 2));
console.log("Order");