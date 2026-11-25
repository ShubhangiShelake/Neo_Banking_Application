
const crypto = require("crypto");

const generateAccountNumber = () => {
    // Generate a random 12-digit number
    const accountNumber = crypto.randomInt(
        100000000000,
        1000000000000
    );

    return accountNumber.toString();
};

module.exports = generateAccountNumber;
