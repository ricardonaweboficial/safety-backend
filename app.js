const express = require('express');
const routes = require('./src/routes');
const cloudant = require('./src/configuration_db/cloudant');
const cfenv = require('cfenv');
const fs = require("fs");
const { google } = require("googleapis");
const service = google.sheets("v4");
const credentials = require("./credentials.json");

const app = express();

app.use(express.json());
app.use(routes);

// Configure auth client
const authClient = new google.auth.JWT(
    credentials.client_email,
    null,
    credentials.private_key.replace(/\\n/g, "\n"),
    ["https://www.googleapis.com/auth/spreadsheets"]
);

(async function () {
    try {

        // Authorize the client
        const token = await authClient.authorize();

        // Set the client credentials
        authClient.setCredentials(token);

        // Get the rows
        const res = await service.spreadsheets.values.get({
            auth: authClient,
            spreadsheetId: "Your spreadsheet ID goes here",
            range: "A:B",
        });

        // Set rows to equal the rows
        const rows = res.data.values;

        // Check if we have any data and if we do add it to our answers array
        if (rows.length) {

            // Remove the headers
            rows.shift()

            for (const row of rows) {
	            const createDocument = function (callback) {
	              // specify the id of the document so you can update and delete it later
	              db.insert({ _id: 'id_safety_tracing=1',timeStamp: row[0], b: row[1] }, function(err, data) {
	                callback(err, data);
	              });
	            };
        	}

        } else {
            console.log("No data found.");  
        }

        // Saved the answers
        fs.writeFileSync("answers.json", JSON.stringify(answers), function (err, file) {
            if (err) throw err;
            console.log("Saved!");
        });

    } catch (error) {
        // Log the error
        console.log(error);

        // Exit the process with error
        process.exit(1);
    }

})();

const appEnv = cfenv.getAppEnv();

app.listen(3333);
