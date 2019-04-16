const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');
const router = require('./routes');

const port = process.env.PORT || 3004;

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}))

app.use(compression());

app.use(`/rooms/:id`, express.static('public'));

app.use('/api', router);

app.listen(port, function() {
    console.log(`Listening on port: ${port}`);
})