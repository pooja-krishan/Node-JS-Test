const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const jwt = require('jsonwebtoken');

app.use(express.json());
app.use(bodyParser.urlencoded( {extended:true} ))
// const cors = require('cors');

 

var corsOptions = {
    origin: "https://localhost:8081"
}

// Router
const product_router = require('./routes/productRoute');
app.use('/api/products',product_router);

const user_router = require('./routes/userRoute');
app.use('/api/users',user_router);

const cart_router = require('./routes/cartRoute');
app.use('/api/cart',cart_router);

// Middlewares 
// app.use(cors(corsOptions));



// app.get('/', (req,res) => {
//     res.json({message : "Hello!!!!"})
// });

require("./middlewares/swaggerDoc")(app);

const PORT = process.env.PORT || 8080;

//Run server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});