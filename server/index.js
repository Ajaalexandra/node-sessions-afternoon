const express = require('express');
const { json }= require ('body-parser')
// const bodyParser = require ('body-parser');
const session = require ('express-session');

// My Middleware!!!!!
const checkForSessions = require ('./middlewares/checkForSession');

//My Controllers!!!!!
const swag_controller = require('./controllers/swag_controller');
const auth_controller = require('./controllers/auth_controller');
const cart_controller = require('./controllers/cart_controller');
const search_controller = require('./controllers/search_controller');


const app = express();

// other way: app.use(bodyParser.json());
app.use(json());
app.use(session({
  secret: 'My Awesome Secret',
  resave: false,
  saveUninitialized: false
}));

app.use(checkForSessions);
app.use(express.static(`${__dirname}/../public/build`));

//my swag stuff:
app.get( '/api/swag', swag_controller.read ); //read ( a method: a function on an object )is coming from swag_controller file

// My Authorization requests:
app.post('/api/login', auth_controller.login);
app.post('/api/register', auth_controller.register);
app.post('/api/signout', auth_controller.signout);
app.get('/api/user', auth_controller.getUser);

//My Cart stuff:
app.post('/api/cart', cart_controller.add);
app.post('/api/cart/checkout', cart_controller.checkout);
app.delete('/api/cart', cart_controller.delete);


//My Search:
app.get('/api/search', search_controller.search);

const port = 3000;
app.listen(port, () => { console.log(`Server listening to Aja on port ${port}.`);

});
