const Pet = require("./model");
const db = require("../../utils/database");

Pet();

function createOne(req, res) {
  const petToCreate = {
    ...req.body,
  };
  console.log("Inside petToCreate: ", petToCreate);

  const createOne = `
 INSERT INTO pets (name, age, type, breed, microchip)
 VALUES($1, $2, $3, $4, $5)
 RETURNING *;
 `;

  const { name, age, type, breed, microchip } = petToCreate;

  db.query(createOne, [name, age, type, breed, microchip])
    .then((result) => res.json({ data: result.rows[0] }))
    .catch(console.error);
}

function getAll(req, res) {
  const getAllSql = `
    SELECT *
    FROM pets;
    `;

  console.log("here");

  db.query(getAllSql)
    .then((result) => res.json({ data: result.rows }))
    .catch(console.error);
}

function getOneById(req, res) {
  const idToGet = req.params.id;

  const getOneByIdSql = `
    SELECT *
    FROM pets
    WHERE id = $1
    `;

  db.query(getOneByIdSql, [idToGet])
    .then((result) => res.json({ data: result.rows[0] }))
    .catch(console.error);
}

module.exports = {
  createOne,
  getAll,
  getOneById,
};
