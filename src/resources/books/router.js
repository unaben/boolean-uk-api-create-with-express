const express = require("express");

const {createOne, getAll, getOneById, getFictionBooks, getNonFictionBooks} = require("./controller");

const router = express.Router();

router.post("/",createOne);

router.get("/", getAll);

router.get("/fiction", getFictionBooks);

router.get("/non-fiction", getNonFictionBooks);

router.get("/:id", getOneById);

// router.get("/fiction/:fiction", getBooksByTypeFiction);



module.exports = router;