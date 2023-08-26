// Requerir consultas de las bases de datos
const {
  getAllPremieres,
  getPremiereById,
  registerPremiere,
  editPremiereById,
  deletePremiereById,
} = require("./premieresModel");

// Requerir funcion de numero entero positivo
const notNumber = require("../../utils/notNumber");

// Requerir clave url_base (.env)
const url = process.env.url_base;

// get all premieres
const listAll = async (req, res, next) => {
  const dbResponse = await getAllPremieres();
  if (dbResponse instanceof Error) return next(dbResponse);
  dbResponse.length ? res.status(200).json(dbResponse) : next();
};

// get premiere by id
const listOne = async function (req, res, next) {
  if (notNumber(req.params.id, res)) return;
  const dbResponse = await getPremiereById(Number(req.params.id));
  if (dbResponse instanceof Error) return next(dbResponse);
  dbResponse.length ? res.status(200).json(dbResponse) : next();
};

// Register new premiere
const register = async (req, res, next) => {
  const image = url + req.file.filename;
  const dbResponse = await registerPremiere({ ...req.body, image });
  if (dbResponse instanceof Error) return next(dbResponse);
  res.status(201).json(`Premiere ${req.body.name} created!`);
};

// patch premiere
const editOne = async (req, res, next) => {
  if (notNumber(req.params.id, res)) return;
  const dbResponse = await editPremiereById(+req.params.id, req.body);
  if (dbResponse instanceof Error) return next(dbResponse);
  dbResponse.affectedRows ? res.status(200).json(req.body) : next();
};

// delete premiere by id
const removeOne = async (req, res, next) => {
  if (notNumber(req.params.id, res)) return;
  const dbResponse = await deletePremiereById(+req.params.id);
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
