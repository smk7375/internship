const express = require('express');

const cookieparser = require('cookie-parser');

const app = express();

app.use(express.json());

app.use(cookieparser());

const userRouter = require('./routers/userRouter');

app.use('/user' , userRouter);


app.listen(3000 , ()=>{
    console.log('server is listening to port 3000')
});