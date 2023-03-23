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

module.exports = {
    Customer
};

if (require.main === module) {
    let c1 = new Customer("John", "1234567890", "123 Main St", 1);
}