require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const pool = require("./db");
const { v4: uuidv4 } = require("uuid");
const { signup, login } = require("./routes/auth-routes");

const PORT = process.env.PORT || 5000;
// const corsOptions = {credentials:true, origin: process.env.URL || '*'};

app.use(cors());
app.use(express.json());

// get all todos
app.get("/todos/:userEmail", async (req, res) => {
  const { userEmail } = req.params;
  try {
    const todos = await pool.query(
      "SELECT * FROM todos WHERE user_email = $1",
      [userEmail]
    );
    res.json(todos.rows);
  } catch (error) {
    console.log(error);
  }
});

app.post("/signup", signup);

app.post("/login", login);

// create a todo
app.post("/todos", async (req, res) => {
  const { user_email, title, date, isCompleted } = req.body;

  // Check if required fields are empty
  if (!user_email || !title || !date) {
    return res
      .status(400)
      .json({ error: "user_email, title, and date are required fields" });
  }
  const id = uuidv4();
  try {
    const newTodo = await pool.query(
      "INSERT INTO todos (id, user_email, title, date, isCompleted) VALUES ($1, $2, $3, $4, $5)",
      [id, user_email, title, date, isCompleted]
    );
    res.json(newTodo.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const { user_email, title, date, isCompleted } = req.body;

  try {
    const updatedTodo = await pool.query(
      "UPDATE todos SET user_email = $1, title = $2, date = $3, isCompleted = $4 WHERE id = $5",
      [user_email, title, date, isCompleted, id]
    );
    res.json(updatedTodo.rows[0]); // Assuming you want to return the updated todo
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});


// delete todo
app.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTodo = await pool.query("DELETE FROM todos WHERE id = $1", [
      id,
    ]);
    res.json(deletedTodo.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;

// sH2z9@example.com
