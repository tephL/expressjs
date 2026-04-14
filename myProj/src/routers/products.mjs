import Router from 'express';
import { mock_products } from '../../utils/constants.mjs';
import { doesIdExist, iceCreamDataValidator } from '../../utils/middlewares.mjs';

const router = Router();


router.post('/api/products', iceCreamDataValidator, (req, res) => {
    let { body: {name, price} } = req;

    // append to 
    let generated_id = mock_products.length + 1;
    let new_data = {
        id: generated_id,
        name: name,
        price: price
    };
    mock_products.push(new_data);

    return res.status(200).send({
        message: "Successfully added.",
        newData: new_data
    });
});


router.get('/api/products', (req, res) => {
    let { sort, order } = req.query;

    if(sort){
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
                return res.status(200).send(`cant sort with ${sort}`);
                break;
        }
    }

    return res.status(200).send(mock_products);
});


router.get('/api/products/:id', (req, res) => {
    console.log(`requesting: ${req.params.id}`);
    let search_id = req.params.id;

    let found_product = mock_products.filter((product) => {
        return product.id == search_id;
    });

    return res.status(200).send(found_product);
});


router.put('/api/products', doesIdExist, iceCreamDataValidator, (req, res) => {
    let { body } = req;
    let { foundIndex, ...rest } = body;
    
    mock_products[foundIndex] = {
        ...rest
    }
    return res.status(200).send({
        message: "Successfully updated.",
        updatedData: mock_products[foundIndex]
    });
});


export default router;