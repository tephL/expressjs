import Router from 'express';
import { mock_products } from '../../utils/constants.mjs';
import { doesIdExist, handleValidationErrors, transformDataProperly, updateDataValidator } from '../../utils/middlewares.mjs';
import { query, body, checkSchema, check } from 'express-validator';
import { sortValidator } from '../../utils/queryValidator.mjs'
import { newDataValidator, patchDataValidator } from '../../utils/bodyValidators.mjs'; 

const router = Router();


router.post('/api/products', 
    checkSchema(newDataValidator), 
    handleValidationErrors, 
    transformDataProperly,
(req, res) => {
    let { body: {name, price} } = req;

    // append to 
    let generated_id = mock_products.length + 1;
    let new_data = {
        id: generated_id,
        name: name,
        price: Number(price)
    };
    mock_products.push(new_data);

    return res.status(200).send({
        message: "Successfully added.",
        newData: new_data
    });
});


router.get('/api/products', 
    checkSchema(sortValidator), 
    handleValidationErrors, 
(req, res) => {
    let { sort, order } = req.query;

    switch(sort){
        case 'price':
            let priceSorted;
            if (order == 'asc'){
                priceSorted = mock_products.sort((a, b) => {
                    return a.price - b.price;
                });
            } else{ // descending order
                priceSorted = mock_products.sort((a, b) => {
                    return b.price - a.price;
                });
            }
            return res.status(200).send(priceSorted);
            break;
        default:
            return res.status(200).send(mock_products);
            break;
    }

});


router.get('/api/products/:id', (req, res) => {
    console.log(`requesting: ${req.params.id}`);
    let search_id = req.params.id;

    let found_product = mock_products.filter((product) => {
        return product.id == search_id;
    });

    return res.status(200).send(found_product);
});


router.patch('/api/products', 
    checkSchema(patchDataValidator),
    handleValidationErrors,
    doesIdExist,
    transformDataProperly,
(req, res) => {
    let { foundIndex } = req.context;
    let { body } = req;

    let updated_data = mock_products[foundIndex] = {
        ...mock_products[foundIndex],
        ...body
    }

    return res.status(200).send({
        message: "Successfully patched",
        data: updated_data
    });
});


router.put('/api/products', 
    checkSchema(patchDataValidator), 
    handleValidationErrors, 
    doesIdExist, 
    transformDataProperly,
(req, res) => {
    let { foundIndex } = req.context;
    let { ...rest } = req.body;
    
    mock_products[foundIndex] = {
        ...rest
    }
    return res.status(200).send({
        message: "Successfully updated.",
        updatedData: mock_products[foundIndex]
    });
});


export default router;