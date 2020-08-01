const express = require('express');
const cloudant = require('./configuration_db/cloudant');

const routes = express.Router();

routes.get('/viewforms', (req, res) => {
	cloudant.db.list (function (err, body) {
		body.forEach (function (db) {
		 	return res.json(db);
		});
	});
});


module.exports = routes;