const cors = require('cors')
const express = require('express')
require('dotenv').config();
const { auth } = require('express-oauth2-jwt-bearer');

const PORT = process.env.PORT;
const app = express();

// Enable CORS access to this server
app.use(cors());

// Enable reading JSON request bodies
app.use(express.json());

const checkJwt = auth({
  audience: 'https://carousell/api',
  issuerBaseURL: 'https://dev-rvh6etjasc44138t.us.auth0.com/',
  tokenSigningAlg: 'RS256'
});


// importing Routers
const ListingsRouter = require('./routers/listingsRouter')

// importing Controllers
const ListingsController = require('./controllers/listingsController')

// importing DB
const db = require('./db/models/index')
const { listing, user } = db;

// initializing Controllers -> note the lowercase for the first word
const listingsController = new ListingsController(listing, user)

// inittializing Routers
const listingsRouter = new ListingsRouter(listingsController).routes()




// enable and use router
app.use('/listings', listingsRouter)

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
