var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var methodOverride = require("method-override");
var app = express();

// Middlewares
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json()); 
//permite q nos podamos conectar a distintas metodos http
app.use(methodOverride());



// Import Models and Controllers
var models = require('./models/client')(app, mongoose);
var ClientCtrl = require('./controllers/controller');/*/

/*es una variable q me permite manejar las peticiones de entrada,
 nos permite conectarnos a bas de mong DB e inicializar alguons metodos*/
var router = express.Router();


// Index - Route
router.get('/', function(req, res) { 
 res.send("Hola Mundo - www.programacion.com.py");
});

app.use(router);

// API routes: nos permite tomar too lo q venga de localhost:3000/clients
//y si es u post lo lleva al controlador
var api = express.Router();

api.route('/clients') 
 .get(ClientCtrl.findAll)
 .post(ClientCtrl.add);

api.route('/clients/:id') 
 .get(ClientCtrl.findById)
 .put(ClientCtrl.update)
 .delete(ClientCtrl.delete);

app.use('/api', api);
// Start server
app.listen(3000, function() {
 console.log("Node server running on http://localhost:3000");
});

mongoose.connect('mongodb://localhost/clients', function(err, res) {
 if(err) throw err;
 console.log('Connected to Database');
});