const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

// Secret key for JWT
const JWT_SECRET = "your_secret_key"; // Replace 'your_secret_key' with your actual secret key

const app = express();
const port = 8080;

// Database credentials
const db = mysql.createConnection({
  host: "sql6.freesqldatabase.com",
  user: "sql6696800",
  password: "QMfiITfC1C",
  database: "sql6696800",
  port: 3306,
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  console.log("Connected to the database.");
});

// Middleware
app.use(bodyParser.json());

app.get("/Users", (req, res) => {
  const sql = "SELECT * FROM Users";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// Login endpoint
app.post("/Users", (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required." });
  }

  // Query to check if the username and password match
  db.query(
    "SELECT * FROM Users WHERE BINARY name = ? AND password = ?",
    [name, password], // Use BINARY to make the comparison case-sensitive
    (err, results) => {
      if (err) {
        console.error("Error executing query:", err);
        return res.status(500).json({ error: "Internal server error" });
      }

      if (results.length === 0) {
        return res.status(401).json({ error: "Invalid username or password" });
      }

      // Assuming authentication successful
      const user = results[0];
      let isAdmin = false;
      if (user.name === "admin") {
        isAdmin = true;
      }

      // Generate JWT token
      const token = jwt.sign({ name: user.name }, JWT_SECRET, {
        expiresIn: "1h",
      });

      // Include boolean value indicating if user is admin along with token
      res.json({ message: "Login successful", isAdmin, token });
    }
  );
});

// app.post("/Users", (req, res) => {
//   const { name, password } = req.body;

//   if (!name || !password) {
//     return res
//       .status(400)
//       .json({ error: "Username and password are required." });
//   }

//   // Query to check if the username and password match
//   db.query(
//     "SELECT * FROM Users WHERE name = ? AND password = ?",
//     [name, password],
//     (err, results) => {
//       if (err) {
//         console.error("Error executing query:", err);
//         return res.status(500).json({ error: "Internal server error" });
//       }

//       if (results.length === 0) {
//         return res.status(401).json({ error: "Invalid username or password" });
//       }

//       // Assuming authentication successful
//       const user = results[0];
//       let isAdmin = false;
//       if (user.name === "admin") {
//         isAdmin = true;
//       }

//       // Generate JWT token
//       const token = jwt.sign({ name: user.name }, JWT_SECRET, { expiresIn: "1h" });

//       // Include boolean value indicating if user is admin along with token
//       res.json({ message: "Login successful", isAdmin, token });
//     }
//   );
// });

// Register
app.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ error: "Name, email, and password are required." });
  }

  // Check if the email is already registered
  db.query("SELECT * FROM Users WHERE email = ?", [email], (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    if (results.length > 0) {
      return res.status(409).json({ message: "Email already exists" });
    }

    // Insert new user into the database
    db.query(
      "INSERT INTO Users (name, email, password) VALUES (?, ?, ?)",
      [name, email, password],
      (err, results) => {
        if (err) {
          console.error("Error executing query:", err);
          return res.status(500).json({ error: "Internal server error" });
        }

        res.status(201).json({ message: "User created successfully" });
      }
    );
  });
});

// app.post("/register", (req, res) => {
//   const { name, email, password } = req.body;

//   if (!name || !email || !password) {
//     return res.status(400).json({ error: "Name, email, and password are required." });
//   }

//   // Check if the email is already registered
//   db.query(
//     "SELECT * FROM Users WHERE email = ?",
//     [email],
//     (err, results) => {
//       if (err) {
//         console.error("Error executing query:", err);
//         return res.status(500).json({ error: "Internal server error" });
//       }

//       if (results.length > 0) {
//         return res.status(409).json({ error: "Email already exists" });
//       }

//       // Insert new user into the database
//       db.query(
//         "INSERT INTO Users (name, email, password) VALUES (?, ?, ?)",
//         [name, email, password],
//         (err, results) => {
//           if (err) {
//             console.error("Error executing query:", err);
//             return res.status(500).json({ error: "Internal server error" });
//           }

//           res.status(201).json({ message: "User created successfully" });
//         }
//       );
//     }
//   );
// });

// app.post("/Users", (req, res) => {
//   const { name, password } = req.body;

//   if (!name || !password) {
//     return res
//       .status(400)
//       .json({ error: "Username and password are required." });
//   }

//   // Query to check if the username and password match
//   db.query(
//     "SELECT * FROM Users WHERE name = ? AND password = ?",
//     [name, password],
//     (err, results) => {
//       if (err) {
//         console.error("Error executing query:", err);
//         return res.status(500).json({ error: "Internal server error" });
//       }

//       if (results.length === 0) {
//         return res.status(401).json({ error: "Invalid username or password" });
//       }

//       // Assuming authentication successful, generate JWT token
//       const token = jwt.sign({ name }, JWT_SECRET, { expiresIn: "1h" }); // Change '1h' to the desired expiration time

//       // Send token as part of the response
//       res.json({ message: "Login successful", token });
//     }
//   );
// });

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
