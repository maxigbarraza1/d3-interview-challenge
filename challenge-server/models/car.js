const { Schema, model } = require('mongoose');

const CarSchema = Schema({
    brand: {
        type: String,
        required: [true, 'The brand is required']
    },
    model:{
        type: String,
        required: [true, 'The model is required']
    },
    color:{
        type: String,
        required: [true, 'The color is required']
    },
    patent:{
        type: String,
        required: [true, 'The patent is required'],
    },
    state:{
        type: Boolean,
        default:true
    }
});

CarSchema.methods.toJSON = function () {
    const { __v, ...car } = this.toObject();
    return car;
}

module.exports = model( 'Car', CarSchema );