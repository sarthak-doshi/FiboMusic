const express = require('express')
const app = express();
var path = require('path');

app.use(express.static(__dirname + '/assets'));

app.get('/',function(req,res){
    res.sendFile(path.join(__dirname + '/index.html'));
});


var port = app.listen(process.env.PORT||5000, () => console.log('Stared!',port.address().port))
