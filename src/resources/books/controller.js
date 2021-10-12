const Book = require("./model");
const db = require("../../utils/database");

Book();

function createOne(req, res) {
  const bookToCreate = {
    ...req.body,
  };
  console.log("Inside bookToCreate: ", bookToCreate);

  const createOne = `
    INSERT INTO books(title, type, author, topic, publicationDate)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
    `;

  const { title, type, author, topic, publicationData } = bookToCreate;

  db.query(createOne, [title, type, author, topic, publicationData])
    .then((result) => res.json({ data: result.rows[0] }))
    .catch(console.error);
}

function getAll(req, res) {
  console.log("getall");
  const getAllSql = `
    SELECT *
    FROM books;
    `;

  db.query(getAllSql)
    .then((result) => res.json({ data: result.rows }))
    .catch(console.error);
}

function getOneById(req, res) {
  console.log("getOneById");
  const idToGet = req.params.id;

  const getOneByIdSQL = `
    SELECT *
    FROM books
    WHERE id = $1
    `;

  db.query(getOneByIdSQL, [idToGet])
    .then((result) => res.json({ data: result.rows[0] }))
    .catch(console.error);
}

const getBooksByTypeFiction = async (req, res) => {
  console.log(
    "getBooksByTypeFiction",
    { params: req.params }
  );

  const { type } = req.params;

  const Sql = `
SELECT * FROM books
WHERE
type = 'Fiction';
`;

//   const capitalizedType = type
//   .split("-")
//   .map(word => capitalizedType(word))
//   .join("-")

//   console.log(capitalizedType);

  try {
   
      const result = await db.query(Sql, [type]);  
    // console.log(result.rows)
    res.json({ data: result.rows[0]});
  } catch (error) {
    console.error("[ERROR] getBookByType: ", { error: error.message });

    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  createOne,
  getAll,
  getOneById,
  getBooksByTypeFiction,
};
