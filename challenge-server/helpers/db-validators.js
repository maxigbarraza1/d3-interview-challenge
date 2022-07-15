const Car = require('../models/car')

const isValidCar = async (id='') => {
    const carExists = await Car.findById(id);
    if(!carExists || carExists.state === false) {
        throw new Error(`Car with id ${id} does not exist`);
    }
}

const isValidPatent = async(patent='') =>{
    const carExists = await Car.findOne({patent})
    if(carExists && carExists.state === true) {
        throw new Error(`Car with patent ${patent} already exists`);
    }
}

module.exports = {
    isValidCar,
    isValidPatent,
}