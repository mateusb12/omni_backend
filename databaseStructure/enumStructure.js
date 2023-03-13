export function getRandomEnumValue(enumObj) {
    const values = Object.values(enumObj);
    return values[Math.floor(Math.random() * values.length)];
}



export const Size = Object.freeze({
    S: "Small",
    M: "Medium",
    L: "Large"
});

export const Flavor = Object.freeze({
    MARGARITA: "Margarita",
    PEPPERONI: "Pepperoni",
    HAWAIIAN: "Hawaiian",
    VEGGIE: "Veggie"
});

export const Toppings = Object.freeze({
    MUSHROOMS: "Mushrooms",
    OLIVES: "Olives",
    ONIONS: "Onions",
    HAM: "Ham",
    PINEAPPLE: "Pineapple"
});

export const SoftDrink = Object.freeze({
    COKE: "Coke",
    SPRITE: "Sprite",
    FANTA: "Fanta"
});