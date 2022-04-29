const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(express.json());
app.use(bodyParser.urlencoded( {extended:true} ))
// const cors = require('cors');

 

var corsOptions = {
    origin: "https://localhost:8081"
}

// Router
const router = require('./routes/productRoute');
app.use('/api/products',router);

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