var express = require('express');
var app = express();
app.use(express.static(__dirname + '/public'));

app.listen(process.env.PORT || 8080);
console.log("running on 8080");
