const { Size, Flavor, Toppings, getRandomEnumValue} = require('./enumStructure');
const { Drink, Pizza, Order } = require('./corePizzaStructure');
const { Customer } = require('./customerStructure');

const randomFloat = (min, max) => {
    return (Math.random() * (max - min) + min).toFixed(2);
}

const randomInteger = (min, max) => {
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
    let softDrink = getRandomEnumValue(Drink);
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
    const dummyCostumer = new Customer("John", "123456789", "123 Fake St.", "12345");
    const dummyDate = "2020-01-01 12:00:00";
    const dummyOrder = new Order(dummyCostumer, dummyDate);
    dummyOrder.addItems(randomItemList);
    return dummyOrder;
}

if (require.main === module) {
    const randomOrder = generateRandomOrder();
    console.log(randomOrder);
}

module.exports = {
    generateRandomOrder
}

