const express = require('express');
const app = express();
const path = require('path');
const db = require('./db.js');
const bodyparser = require('body-parser');
var ping = require('ping');
const router = express.Router();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

app.use('/', router);
app.use('/',express.static(__dirname + '/public'));


router.get('/', function (req, res) {
    res.render('image',{

    });
});

app.post('/check_availability',function (req,res) {
    console.log((req.body.r));
    var host = req.body.r;
    var msg;
    ping.sys.probe(host, function(isAlive){
        msg = isAlive ? 'host ' + host + ' is alive' : 'host ' + host + ' is dead';
        console.log(msg);
        if(isAlive){
            console.log('online');
            db.addip({a : host},function (data) {
                console.log(data)
            })
        }
        else {
            console.log('offline')
        }
        res.send(msg);
    });

})



app.listen(4000, () => {
    console.log("server is running on port 4000");
});
