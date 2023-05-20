const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

// Connection to DB
const db = mysql.createPool({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "Pass@123",
  database: "new",
});

// ************  Creation ---> /create  ************
// Student
app.post("/create/student", (req, res) => {
  const prn = req.body.prn;
  const name = req.body.name;
  const pass = req.body.pass;
  const branch = req.body.branch;

  db.query(
    "INSERT INTO student (prn, name, pass, branch) VALUES (?,?,?,?)",
    [prn, name, pass, branch],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values inserted successfully!");
      }
    }
  );
});

// Teacher
app.post("/create/teacher", (req, res) => {
  const name = req.body.name;
  const pass = req.body.pass;
  const dept = req.body.dept;

  db.query(
    "INSERT INTO teacher (name, pass, dept) VALUES (?,?,?)",
    [name, pass, dept],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

// ************  Login Verification ---> /auth  ************
// Student
app.post("/auth/student", (req, res) => {
  const prn = req.body.prn;
  const pass = req.body.pass;

  db.query(
    "SELECT prn FROM student WHERE prn=? and pass=?",
    [prn, pass],
    (err, result) => {
      if (err) {
        console.log(err);
      }

      if (result.length > 0) {
        res.send(result);
      } else {
        res.send({ message: "Invalid Credentials!" });
      }
    }
  );
});

// Teacher
app.post("/auth/teacher", (req, res) => {
  const t_id = req.body.t_id;
  const pass = req.body.pass;

  db.query(
    "SELECT t_id FROM teacher WHERE t_id=? and pass=?",
    [t_id, pass],
    (err, result) => {
      if (err) {
        console.log(err);
      }

      if (result.length > 0) {
        res.send(result);
      } else {
        res.send({ message: "Invalid Credentials!" });
      }
    }
  );
});

app.get("/api/get", (req, res) => {
  const sqlGet = "SELECT *FROM student_db";
  db.query(sqlGet, (error, result) => {
    res.send(result);
  });
});
app.post("/api/post", (req, res) => {
  const { name, dept_name, total_cred } = req.body;
  const sqlInsert =
    "INSERT INTO student_db (name,dept_name,total_cred) VALUES(?,?,?)";
  db.query(sqlInsert, [name, dept_name, total_cred], (error, result) => {
    if (error) {
      console.log(error);
    }
  });
});

app.delete("/api/remove/:id", (req, res) => {
  const { id } = req.params;
  const sqlRemove = "DELETE FROM student_db WHERE id = ? ";
  db.query(sqlRemove, [id], (error, result) => {
    if (error) {
      console.log(error);
    }
  });
});
app.get("/api/get/:id", (req, res) => {
  const { id } = req.params;
  const sqlGet = "SELECT *FROM student_db where id = ?";
  db.query(sqlGet, id, (error, result) => {
    if (error) {
      console.log(error);
    }
    res.send(result);
  });
});

app.put("/api/update/:id", (req, res) => {
  const { id } = req.params;
  const { name, dept_name, total_cred } = req.body;
  const sqlUpdate =
    "UPDATE student_db SET  name = ?, dept_name = ?, total_cred = ? WHERE id = ?";

  db.query(sqlUpdate, [name, dept_name, total_cred, id], (error, result) => {
    if (error) {
      console.log(error);
    }
    res.send(result);
  });
});

// Configuring server to listem on port 3001
app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
 