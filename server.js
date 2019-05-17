// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Tables (DATA)
// =============================================================
var tables = [
  {
    id: "yoda",
    name: "Yoda",
    email: "jedimaster@aol.com",
    phone: "900-352-3534",
  },
  {
    id: "darthmaul",
    name: "Darth Maul",
    email: "sithlord@aol.com",
    phone: "200-335-3858",
  },
  {
    id: "obiwankenobi",
    name: "Obi Wan Kenobi",
    email: "jedimaster@aol.com",
    phone: "553-463-2467",
  }
];

var waiting = [
    {
      id: "235",
      name: "Fred",
      email: "fred@aol.com",
      phone: "900-352-3534",
    },
    {
      id: "236",
      name: "Wilma",
      email: "wilma@aol.com",
      phone: "200-335-3858",
    },
    {
      id: "237",
      name: "Lucille Ball",
      email: "lucilleball@aol.com",
      phone: "553-463-2467",
    }
  ];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

// Displays all tables
app.get("/api/tables", function(req, res) {
  return res.json(tables);
});

// Displays a single table, or returns false
app.get("/api/tables/:table", function(req, res) {
  var chosen = req.params.table;

  console.log(chosen);

  for (var i = 0; i < tables.length; i++) {
    if (chosen === tables[i].routeName) {
      return res.json(tables[i]);
    }
  }

  return res.json(false);
});


// Displays all waiting tables
app.get("/api/waiting", function(req, res) {
  return res.json(waiting);
});


// Displays a single waiting table, or returns false
app.get("/api/waiting/:waiting", function(req, res) {
  var chosen = req.params.waiting;

  console.log(chosen);

  for (var i = 0; i < waiting.length; i++) {
    if (chosen === waiting[i].routeName) {
      return res.json(waiting[i]);
    }
  }

  return res.json(false);
});

// Create New Tables - takes in JSON input
app.post("/api/tables", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newtable = req.body;

  // Using a RegEx Pattern to remove spaces from newTable
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  newtable.routeName = newtable.name.replace(/\s+/g, "").toLowerCase();

  console.log(newtable);

  // IF TABLES ARE AT MAX (5)
  if (tables.length === 4) {
      // PUSH TO WAITING
      waiting.push(newtable);
  } else {
      tables.push(newtable);
  }
  res.json(newtable);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
