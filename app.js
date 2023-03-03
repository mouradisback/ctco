const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose')
const cors = require('cors')
const AuthJwt = require('./helpers/jwt')
const errorHandler = require('./helpers/error-handler')
const compression = require('compression')
app.use(cors());
app.options('*', cors())

require('dotenv/config');
const api = process.env.API_URL;
const supplierRoute = require('./routers/suppliers.route')
const usersRoute = require('./routers/users.route')
const employeesRoute = require('./routers/employees.route')
const contractsRoute = require('./routers/contracts.route')
const fonctionsRoute = require('./routers/fonctions.route')
const schoolsRoute = require('./routers/school.route')
const departementRoute = require('./routers/departements.route')
const contactsRoute = require('./routers/contacts.route')
const purchasesRoute = require('./routers/purchases.route')
const priceListRoute = require('./routers/priceList.route')
const payementsRoute = require('./routers/payements.route')
const productsRoute = require('./routers/products.route')
const categoriesRoute = require('./routers/categories.route')
const caissesRoute = require('./routers/caisses.route')
const mouvementsRoute = require('./routers/mouvements.route')
const g50sRoute = require('./routers/g50s.route')
const receptionsRoute = require('./routers/receptions.route')
const releasesRoute = require('./routers/releases.route')
const returnsRoute = require('./routers/returns.route')
const lostsRoute = require('./routers/losts.route')

const depotRoute  = require('./routers/depots.route')
const emplacementRoute  = require('./routers/emplacements.route')
const unitRoute  = require('./routers/unit.route')
const taxeRoute  = require('./routers/taxe.route')
const payementmethodeRoute  = require('./routers/payementMethode.route')

/// morgan logger///


//// middleware
app.use(express.json());
app.use(compression())
//app.use(morgan('combined'));
app.use(AuthJwt());
app.use(errorHandler)


//// STATIC ROUTE ////

const path = require('path')
var fileSep = path.sep;



//// API routes //////
app.use(api+'/suppliers', supplierRoute)
app.use(api+'/users', usersRoute)
app.use(api+'/employees', employeesRoute)
app.use(api+'/contracts', contractsRoute)
app.use(api+'/fonctions', fonctionsRoute)
app.use(api+'/departements', departementRoute)
app.use(api+'/schools', schoolsRoute)
app.use(api+'/contacts', contactsRoute)
app.use(api+'/purchases', purchasesRoute)
app.use(api+'/price-lists', priceListRoute)
app.use(api+'/payements', payementsRoute)
app.use(api+'/products', productsRoute)
app.use(api+'/categories', categoriesRoute)
app.use(api+'/caisses', caissesRoute)
app.use(api+'/mouvements', mouvementsRoute)
app.use(api+'/g50s', g50sRoute)
app.use(api+'/receptions', receptionsRoute)
app.use(api+'/releases', releasesRoute)
app.use(api+'/returns', returnsRoute)
app.use(api+'/losts', lostsRoute)

app.use(api+'/depots', depotRoute)
app.use(api+'/emplacements', emplacementRoute)
app.use(api+'/taxes', taxeRoute)
app.use(api+'/units', unitRoute)
app.use(api+'/payementmethodes', payementmethodeRoute)



mongoose.connect(process.env.DB_URI, 
    {useNewUrlParser: true}
    )
.then(()=>{
    console.log('database connection successful ... ')
}).catch((err)=>{
    console.log(err)
})

const fs = require('fs');

const root = path.join(__dirname, 'public');

app.use('/public', express.static(root)); 


app.get('*' ,function(req, res) {
    fs.stat(root + req.path, function(err){
      if(err){
          res.sendFile("index.html", { root });
      }else{
          res.sendFile(req.path, { root });
      }
    })
});





app.listen(process.env.PORT, ()=>{
    console.log("server running on port: " + process.env.PORT)
})
