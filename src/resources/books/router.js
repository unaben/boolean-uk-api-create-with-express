const express = require("express");

const {createOne, getAll, getOneById, getBooksByTypeFiction} = require("./controller");

const router = express.Router();

router.post("/",createOne);

router.get("/", getAll);

router.get("/:id", getOneById);

router.get("/fiction/:fiction", getBooksByTypeFiction);

module.exports = router;