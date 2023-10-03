const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json()); // Parse JSON request bodies

//connect to db first

// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "restaurant_schema",
// });

app.get("/api", (req, res) => {
  res.json({ users: ["userOne", "userTwo", "userThree"] });
});

app.get("/restaurant", (req, res) => {
  const query = "SELECT * FROM restaurants";
  db.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/postrestaurant", (req, res) => {
  const { name, description, location, cuisine, rating } = req.body;

  // Insert the data into your MySQL database
  const query =
    "INSERT INTO restaurants (name, description, location, cuisine, rating) VALUES (?, ?, ?, ?, ?)";
  const values = [name, description, location, cuisine, rating];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "Failed to insert data into the database." });
    } else {
      console.log("Data inserted successfully.");
      res.status(201).json({ message: "Data inserted successfully." });
    }
  });
});

app.delete("/delete-restaurant", (req, res) => {
  const restaurantId = req.body.id;

  // Delete the restaurant with the specified ID from your MySQL database
  const query = "DELETE FROM restaurants WHERE id = ?";
  const values = restaurantId;
  console.log(restaurantId, "id");
  db.query(query, values, (err, result) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "Failed to delete data from the database." });
    } else {
      console.log(query);
      console.log("Data deleted successfully.");
      res.status(200).json({ message: "Data deleted successfully." });
    }
  });
});

app.listen(5000, () => {
  console.log("server started on port 5000");
});
