var express = require("express");
var path = require("path");
var fs = require("fs");

// Set up Express App
var app = express();
var PORT = process.env.PORT || 3000;

// Set up Express to do data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// HTML Routes

// AJAX 
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.post("api/notes", function (req, res) {
    fs.readFile(__dirname + "/db/db.json", 'utf8', function (error, notes) {
        if (error) {
            return console.log(error)
        }
        notes = JSON.parse(notes)

        var id = notes[notes.length - 1].id + 1
        var newNote = { title: req.body.title, text: req.body.text, id: id }
        var activeNote = notes.concat(newNote)

        fs.writeFile(__dirname + "/db/db.json", JSON.stringify(activeNote), function (error, data) {
            if (error) {
                return error
            }
            console.log(activeNote);
            res.json(activeNote);
        });
    });
});

// Need to pull from db.json
app.get("/api/notes", function (req, res) {
    fs.readFile(__dirname + "/db/db.json", 'utf8', function (error, data) {
        if (error) {
            return console.log(error)
        }
        console.log("Notes", data);
        res.json(JSON.parse(data));
    });
});

app.delete("/api/notes/:id", function (req, res) {
    const noteID = JSON.parse(req.params.id)
    console.log(noteID)
    fs.readFile(__dirname + "/db/db.json", 'utf8', function (error, notes) {
        if (error) {
            return console.log(error)
        }
        notes = JSON.parse(notes)
        notes = notes.filter(val => val.id !== noteID)
        fs.writeFile(__dirname + "/db/db.json", JSON.stringify(notes), function (error, data) {
            if (error) {
                return error
            }
            res.json(notes)
        });
    });
});

app.put("/api/notes/:id", function (req, res) {
    const noteID = JSON.parse(req.params.id)
    console.log(noteID)
    fs.readFile(__dirname + "/db/db.json", 'utf8', function (error, notes) {
        if (error) {
            return console.log(error)
        }
        notes.JSON.parse(notes)
        notes = notes.filter(val => val.id !== noteID)
        fs.writeFile(__dirname + "/db/db.json", JSON.stringify(notes), function (error, data) {
            if (error) {
                return error
            }
            res.json(notes)
        });
    });
});

// Starter listening
app.listen(PORT, function () {
    console.log(`Now listening on PORT${PORT}`);
})