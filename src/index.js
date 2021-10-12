require('dotenv').config();
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const db = require("./utils/database");
const Book = require("./resources/books/model");
const Pet = require("./resources/pets/model");

/* IMPORT ROUTERS */

const app = express();

/* SETUP MIDDLEWARE */

app.use(morgan("dev"));
app.use(express.json());


/* SETUP ROUTES */
const petsRouter = require("./resources/pets/router");
const bookRouter = require("./resources/books/router");
/* CATCH-ALL TO TEST ROUTES */
app.use("/pets", petsRouter);

app.use("/books", bookRouter);

app.get("*", (req, res) => {
  res.json({ ok: true });
});

/* START SERVER */

const port = 3030;

app.listen(port, () => {
  db.connect((error) => {
    if (error) {
      console.error("[ERROR] Connection error: ", error.stack);
    } else {
      console.log("\n[DB] Connected...\n");

      Book();
      Pet();
    }
  });

  console.log(`[SERVER] Running on http://localhost:${port}/`);
});
