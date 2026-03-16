import { response, Router } from 'express';
import { mock_products } from '../../utils/constants.mjs';


const router = Router();


router.get('/api/products', (req, res) => {
    console.log(req.headers.cookie);
    console.log(`unsigned: ${req.cookie}`);
    console.log(`signed: ${req.signedCookies.hello}`);

    if(req.cookies && req.cookies.hello === 'world' || req.signedCookies.hello === 'world')
        return res.send(mock_products);

    return res.status(400).send({ msg: "u cant be here" });
} );


export default router;