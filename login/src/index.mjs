import express from 'express';
const app = express();


app.get('/', (req, res) => {
    console.log(req.cookies);
    return res.status(200).send({msg: "hi"});
});


app.listen(3000, () => {
    console.log(`started server at port 3000`);
});