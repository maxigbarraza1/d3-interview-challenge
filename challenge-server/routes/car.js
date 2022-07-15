const { Router } = require('express');
const { check } = require('express-validator');
const { isValidCar, isValidPatent, isValidPatentForModify } = require('../helpers/db-validators');
const { validateFields } = require('../middlewares/validate-fields')
const { getCars, putCars, postCars, deleteCars} = require('../controllers/car');


const router = Router();

router.get('/',getCars);

router.put('/:id',[
        check('id', 'The id is invalid').isMongoId(),
        check('id').custom(isValidCar),
        check('brand', 'The brand is required').not().isEmpty(),
        check('model', 'The model is required').not().isEmpty(),
        check('color', 'The color is required').not().isEmpty(),
        check('patent', 'The patent is required').not().isEmpty(),
        // check('patent').custom(isValidPatent),
        validateFields
        ], putCars);

router.post('/',[
        check('brand', 'The brand is required').not().isEmpty(),
        check('model', 'The model is required').not().isEmpty(),
        check('color', 'The color is required').not().isEmpty(),
        check('patent', 'The patent is required').not().isEmpty(),
        check('patent').custom(isValidPatent),

        validateFields
        ],postCars);

router.delete('/:id',[
        check('id', 'The id is invalid').isMongoId(),
        check('id').custom(isValidCar),
        validateFields
        ], deleteCars);


module.exports = router;