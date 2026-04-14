import { mock_products } from "./constants.mjs";

export function iceCreamDataValidator(req, res, next){
    let { body: {name, price} } = req;
    
    // name must be string
    if(!typeof name == "string"){
        return res.status(400).send({
            message: "Please input a valid name"
        });
    }
    // price must be integer/double
    if(isNaN(price)){
        return res.status(400).send({
            message: "Price must be a number"
        });
    }
    req.body.price = Number(price);

    next();
}


export function doesIdExist(req, res, next){
    let { body : { id } } = req;

    // id input requirement
    if(!id) return res.status(400).send({
        message:"Where's the id tho?"
    });

    // does id exist + assignment of index
    let index_of_id = mock_products.findIndex(mock_product => id == mock_product.id);
    if(index_of_id == -1) return res.status(400).send({
        message:"User with that id doesnt exist."
    });

    req.body.foundIndex = index_of_id;
    next();
}