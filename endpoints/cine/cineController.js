// Requerir consultas de las bases de datos
const {
  getAllCine,
  getCineWith,
  getCineById,
  registerCine,
  editCineById,
  deleteCineById,
} = require("./cineModel");

// Requerir funcion de numero entero positivo
const notNumber = require("../../utils/notNumber");

// Requerir clave url_base (.env)
const url = process.env.url_base;

// get all cine
const listAll = async (req, res, next) => {
  if (req.query.nombre) {
    dbResponse = await getCineWith(req.query.nombre);
  } else {
    dbResponse = await getAllCine();
  }
  if (dbResponse instanceof Error) return next(dbResponse);
  dbResponse.length ? res.status(200).json(dbResponse) : next();
};

// get cine by id
const listOne = async function (req, res, next) {
  if (notNumber(req.params.id, res)) return;
  const dbResponse = await getCineById(Number(req.params.id));
  if (dbResponse instanceof Error) return next(dbResponse);
  dbResponse.length ? res.status(200).json(dbResponse) : next();
};

// Register new cine
const register = async (req, res, next) => {
  const image = `${url}cineImage/${req.file.filename}`;
  const dbResponse = await registerCine({ ...req.body, image });
  if (dbResponse instanceof Error) return next(dbResponse);
  res.status(201).json(`Cine ${req.body.cinemaName} created!`);
};

// patch cine
const editOne = async (req, res, next) => {
  if (notNumber(req.params.id, res)) return;
  const dbResponse = await editCineById(+req.params.id, req.body);
  if (dbResponse instanceof Error) return next(dbResponse);
  dbResponse.affectedRows ? res.status(200).json(req.body) : next();
};

// delete cine by id
const removeOne = async (req, res, next) => {
  if (notNumber(req.params.id, res)) return;
  const dbResponse = await deleteCineById(+req.params.id);
  if (dbResponse instanceof Error) return next(dbResponse);
  dbResponse.affectedRows ? res.status(204).end() : next();
};

// Exportar controladores
module.exports = {
  listAll,
  listOne,
  register,
  editOne,
  removeOne,
};
