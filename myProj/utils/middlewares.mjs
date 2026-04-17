import { mock_products } from "./constants.mjs";
import { validationResult } from "express-validator"; 

// =============== DEPRECATED: used express-validator schema instead
// export function newDataValidator(req, res, next){
//     let { body: {name, price} } = req;
    
//     // name must be string
//     if(typeof name !== "string"){
//         return res.status(400).send({
//             message: "Please input a valid name"
//         });
//     }

//     // price must be integer/double
//     if(isNaN(price)){
//         return res.status(400).send({
//             message: "Price must be a number"
//         });
//     }
//     req.body.price = Number(price);

//     next();
// }


export function doesIdExist(req, res, next){
    let { body : { id } } = req;

    // id input requirement
    if(!id) return res.status(400).send({
        message:"Where's the id tho?"
    });

    // does id exist + assignment of index
    let index_of_id = mock_products.findIndex(mock_product => id == mock_product.id);
    if(index_of_id == -1) return res.status(400).send({
        message:"Product ID doesn't exist."
    });

    req.context = {
        foundIndex: index_of_id
    }
    next();
}


export const updateDataValidator = (req, res, next) => {
    let { name, price } = req.body;
    
    // price number
    if(price && isNaN(price)){
        return res.status(400).send({
            message: "Price must be a number."
        });
    }

    // name string
    if(name && typeof name !== "string"){
        return res.status(400).send({
            message: "Please input a valid name"
        });
    }
    next();
}


export function handleValidationErrors(req, res, next){
    const result = validationResult(req);
    if(!result.isEmpty()){
        return res.status(400).send(result.array());
    };

    next();
} 


export function transformDataProperly(req, res, next){
    const { id, name, price } = req.body;

    // format id properly
    if(id) req.body.id = Number(id);
    
    // format price properly
    if(price) req.body.price = Number(price);
    next();
}


export function cookieValidator(req, res, next){
    const { cookies, signedCookies } = req;

    //console.log(cookies);
    //  console.log(signedCookies);

    if(signedCookies.logged_in != "yes"){
        return res.status(403).send({
            message: "You have not logged in yet"
        });
    }

    next();
}   