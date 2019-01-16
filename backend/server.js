var bodyParser = require('body-parser');
var express = require('express');
var cors = require('cors');
var app = express();

app.use(bodyParser.json());

var Mongo = require('mongodb');

var MongoClient = Mongo.MongoClient,
    assert = require('assert');

// Connection URL
var url = 'mongodb://Michael:Mic@12345@ds137643.mlab.com:37643/user-experience_course-work/railpara';
//var url = 'mongodb://<Michael>:<Mic@12345>@ds137643.mlab.com:37643/user-experience_course-work/railpara';

// Use connect method to connect to the server
MongoClient.connect(url, function (err, db) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    db.close();
});

var insertItems = function (db, collectionName, items, callback, error) {
    // Get the documents collection
    var collection = db.collection(collectionName);
    // Insert some documents
    collection.insertMany(items, function (err, result) {
        if (!err) {
            assert.equal(err, null);
            assert.equal(items.length, result.result.n);
            assert.equal(items.length, result.ops.length);
            console.log("Inserted " + items.length + " items into the collection");
            callback(result);
        }
        else {
            error(err);
        }
    });
};

var findItems = function (db, collection, filter, callback, error) {
    // Get the documents collection
    var collection = db.collection(collection);
    // Find some documents
    collection.find(filter).toArray(function (err, docs) {
        if (!err) {
            assert.equal(err, null);
            console.log("Found the following records");
            console.log(docs);
            callback(docs);
        }
        else error(err);
    });
}

// This responds with "Hello World" on the homepage

// app.get('/', function (req, res) {
//    console.log("Got a GET request for the homepage");
//    res.send('Hello GET');
// })

// This responds a POST request for the homepage

app.options('*', cors())

app.post('/', cors(), function (req, res) {
    console.log("Got a POST request for the homepage");
    res.send('Hello POST');

})

app.post('/signup', cors(), function (req, res) {

    console.log("Got a POST request for signup");

    req.body.email = req.body.email.toLowerCase();

    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        console.log("Connected successfully to server");

        insertItems(db, "users", [req.body], function (result) {
            console.log(result);
            db.close();
            res.json(result.result);

        }, function (result) {
            res.json({ error: true, message: 'user already exists' });
        });
    });
})

app.post('/login', cors(), function (req, res) {
    console.log("Got a POST request for the homepage");

    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        console.log("Connected correctly to server");

        var filter = { email: req.body.email.toLowerCase() };

        findItems(db, 'users', filter, function (docs) {

            db.close();

            if (docs.length == 1) {
                if (docs[0].password === req.body.password) {
                    docs[0].password = undefined;
                    res.json(docs[0]);
                }
                else {
                    res.json({ error: true, message: 'Invalid Password' });
                }
            }
            else {
                res.json({ error: true, message: 'Invalid Email' });
            }

        }, function (err) {
            res.json(err);
        });
    });

})

app.post('/getFavorites', cors(), function (req, res) {

    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);

        var filter = { email: { $in: req.body} };

        findItems(db, 'users', filter, function (docs) {

            db.close();
            res.json(docs);

        }, function (err) {
            res.json(err);
        });
    });

})

app.get('/getAllPlaces', cors(), function (req, res) {

    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);

        var filter = {};

        findItems(db, 'place', filter, function (docs) {

            db.close();
            res.json(docs);

        }, function (err) {
            res.json(err);
        });
    });

})

app.get('/place/:id', cors(), function (req, res) {

    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);

        console.log(req.params.id);

        var filter = {_id: new Mongo.ObjectID(req.params.id)};
        // var filter = {};

        findItems(db, 'place', filter, function (docs) {

            db.close();
            if(docs.length > 0) {
                res.json(docs[0]);
            }
            else {
                res.json({ error: true, message: 'Invalid place_Id' });
            }
            

        }, function (err) {
            res.json(err);
        });
    });

})

app.get('/test', cors(), function (req, res) {

    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);

        var filter = {_id: req.params.id};

        findItems(db, 'location', filter, function (docs) {

            db.close();
            res.json(docs);

        }, function (err) {
            res.json(err);
        });
    });

})

var server = app.listen(80, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
})