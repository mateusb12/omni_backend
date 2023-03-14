function getRandomEnumValue(enumObj) {
    const values = Object.values(enumObj);
    return values[Math.floor(Math.random() * values.length)];
}

const Size = Object.freeze({
    S: "Small",
    M: "Medium",
    L: "Large"
});

const Flavor = Object.freeze({
    MARGARITA: "Margarita",
    PEPPERONI: "Pepperoni",
    HAWAIIAN: "Hawaiian",
    VEGGIE: "Veggie"
});

const Toppings = Object.freeze({
    MUSHROOMS: "Mushrooms",
    OLIVES: "Olives",
    ONIONS: "Onions",
    HAM: "Ham",
    PINEAPPLE: "Pineapple"
});

const SoftDrink = Object.freeze({
    COKE: "Coke",
    SPRITE: "Sprite",
    FANTA: "Fanta"
});

module.exports = { Size, Flavor, Toppings, getRandomEnumValue };

if (require.main === module) {
    console.log(getRandomEnumValue(Size));
    console.log(getRandomEnumValue(Flavor));
    console.log(getRandomEnumValue(Toppings));
    console.log(getRandomEnumValue(SoftDrink));
}