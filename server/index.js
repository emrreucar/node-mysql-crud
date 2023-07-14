const db = require("./db");

const express = require("express");
const cors = require("cors");
const app = express();

//! middleware
app.use(express.json());
app.use(cors());

//! Add Customers
app.post("/create", (req, res) => {
  const {
    customerName,
    customerSurname,
    customerAge,
    customerEmail,
    customerPhoneNumber,
  } = req.body;

  // Gerekli alanların eksik olup olmadığını kontrol edin
  if (
    !customerName ||
    !customerSurname ||
    !customerAge ||
    !customerEmail ||
    !customerPhoneNumber
  ) {
    return res.status(400).send("Missing required fields");
  }

  db.query(
    "INSERT INTO customers (customerName, customerSurname, customerAge, customerEmail, customerPhoneNumber) VALUES (?,?,?,?,?)",
    [
      customerName,
      customerSurname,
      customerAge,
      customerEmail,
      customerPhoneNumber,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error!");
      } else {
        res.status(200).send(result);
      }
    }
  );
});

//! Show Customers
app.get("/customers", (req, res) => {
  db.query("SELECT * FROM customers", (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error!");
    } else {
      res.status(200).send(result);
    }
  });
});

//! Delete Customer
app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM customers WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error!");
    } else {
      res.status(200).send(result);
    }
  });
});

//! Update Customer
app.put("/update/:id", (req, res) => {
  const { id } = req.params;
  const {
    customerName,
    customerSurname,
    customerAge,
    customerEmail,
    customerPhoneNumber,
  } = req.body;

  // Gerekli alanların eksik olup olmadığını kontrol edin
  if (
    !customerName ||
    !customerSurname ||
    !customerAge ||
    !customerEmail ||
    !customerPhoneNumber
  ) {
    return res.status(400).send("Missing required fields");
  }

  db.query(
    "UPDATE customers SET customerName=?, customerSurname=?, customerAge=?, customerEmail=?, customerPhoneNumber=? WHERE id=?",
    [
      customerName,
      customerSurname,
      customerAge,
      customerEmail,
      customerPhoneNumber,
      id,
    ],
    (err, result) => {
        if(err){
            console.log(err);
            res.status(500).send('Error!');
        }
        else{
            res.status(200).send(result);
        }
    }
  );
});

//! server connection
PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}...`);
});

//! mysql connection
db;
