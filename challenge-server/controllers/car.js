const { response,request } = require('express');
const { validateFields } = require('../middlewares/validate-fields');

const Car = require('../models/car')

const getCars = async (req = request, res = response) => {

    const activeCars = {state:true};

    const cars = await Car.find(activeCars);

    res.json({
        cars
    });
}

const postCars = async (req, res = response) => {

    const {brand, model, color, patent} = req.body;

    const car = new Car({ brand, model, color, patent });

    await car.save()
    
    res.json({
        car
    });
}

const putCars = async (req, res = response) => {
    const { id } = req.params
    const {_id, ...rest} = req.body;

    const carWithEqualPatent = await Car.findOne({patent:rest.patent});
    if(carWithEqualPatent){
        if(carWithEqualPatent._id.toString() !== id){
            res.status(400).json({
                msg: 'Car with this patent already exists'
            });
            return;
        }
    }
    
    const car = await Car.findByIdAndUpdate(id, rest, {new: true} );
    res.json({
        msg: 'Car information updated',
        car
    });
}

const deleteCars = async (req, res = response) => {
    const { id } = req.params;

    const car = await Car.findByIdAndDelete(id);
    res.json({
        msg: 'Car deleted',
        id,
        car
    });
}


module.exports = {
    getCars: getCars,
    postCars: postCars,
    putCars: putCars,
    deleteCars: deleteCars,
}