import {Flavor, Size, SoftDrink, Toppings, getRandomEnumValue} from "./enumStructure.js";
import {Customer, Drink, Order, Pizza} from "./coreStructure.js";

export const randomFloat = (min, max) => {
    return (Math.random() * (max - min) + min).toFixed(2);
}

export const randomInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
}

function generateRandomPizza(){
    let size = getRandomEnumValue(Size);
    let firstFlavor = getRandomEnumValue(Flavor)
    let secondFlavor = getRandomEnumValue(Flavor)
    let toppings = [];
    let numToppings = randomInteger(1, 4);
    for (let i = 0; i < numToppings; i++){
        let randomTopping = getRandomEnumValue(Toppings)
        toppings.push(randomTopping);
    }
    let price = randomFloat(10, 35)
    let quantity = 1
    return new Pizza(size, firstFlavor, secondFlavor, toppings, price, quantity);
}

function generateRandomSoftDrink(){
    let softDrink = getRandomEnumValue(SoftDrink);
    let size = getRandomEnumValue(Size);
    let price = randomFloat(1, 5);
    let quantity = randomInteger(1, 2);
    return new Drink(softDrink, size, price, quantity);
}

function generateRandomItemList(){
    let orderPatterns = [["Pizza", "Pizza", "Drink"], ["Pizza"], ["Drink"], ["Pizza", "Drink"]];
    let randomOrderPattern = orderPatterns[randomInteger(0, orderPatterns.length)];
    let itemList = [];
    for (let i = 0; i < randomOrderPattern.length; i++){
        if (randomOrderPattern[i] === "Pizza"){
            itemList.push(generateRandomPizza());
        } else if (randomOrderPattern[i] === "Drink"){
            itemList.push(generateRandomSoftDrink());
        }
    }
    return itemList;
}

function generateRandomOrder(){
    const randomItemList = generateRandomItemList();
    const dummyCostumer = new Customer("John", "123456789", "123 Fake St.");
    const dummyDate = "2020-01-01 12:00:00";
    const dummyOrder = new Order(dummyCostumer, dummyDate);
    dummyOrder.addItems(randomItemList);
    return dummyOrder;
}

const randomOrder = generateRandomOrder();
const pizza1 = new Pizza(Size.L, Flavor.PEPPERONI, Flavor.HAWAIIAN, [Toppings.OLIVES, Toppings.ONIONS],
        15.00, 2);
const pizza2 = new Pizza(Size.M, Flavor.VEGGIE, Flavor.MARGARITA, [Toppings.HAM, Toppings.PINEAPPLE],
        12.00, 1);
const pizza3 = generateRandomPizza();
const drink1 = new Drink(SoftDrink.COKE, Size.M, 2.00, 1);
const customer1 = new Customer("John", "123456789", "123 Fake St.");
const items = [pizza1, pizza2, drink1];
const order = new Order(customer1, "2020-01-01 12:00:00");
order.addItems(items)
let test = order.jsonify()
console.log(JSON.stringify(orderHashmap, null, 2));
console.log("Order");