const Cloudant = require ('@cloudant/cloudant');
const cloudant = new Cloudant({ url: 'https://bea71373-d565-4b0b-ab47-6515c547e275-bluemix.cloudantnosqldb.appdomain.cloud', plugins: { iamauth: { iamApiKey: 'Ey8APeuAhTzYqDLYdqjC9AYBbhosH9yH5RsF8mt4Kdri' } } });

module.exports = cloudant;
