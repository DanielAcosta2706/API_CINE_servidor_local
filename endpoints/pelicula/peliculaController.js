// Requerir consultas de las bases de datos
const {
  getAllPelicula,
  getPeliculaWith,
  getPeliculaById,
  registerPelicula,
  editPeliculaById,
  deletePeliculaById,
} = require("./peliculaModel");

// Requerir funcion de numero entero positivo
const notNumber = require("../../utils/notNumber");

// Requerir clave url_base (.env)
const url = process.env.url_base;

// get all pelicula
const listAll = async (req, res, next) => {
  if (req.query.nombre) {
    dbResponse = await getPeliculaWith(req.query.nombre);
  } else {
    dbResponse = await getAllPelicula();
  }
  if (dbResponse instanceof Error) return next(dbResponse);
  dbResponse.length ? res.status(200).json(dbResponse) : next();
};

// get pelicula by id
const listOne = async function (req, res, next) {
  if (notNumber(req.params.id, res)) return;
  const dbResponse = await getPeliculaById(Number(req.params.id));
  if (dbResponse instanceof Error) return next(dbResponse);
  dbResponse.length ? res.status(200).json(dbResponse) : next();
};

// Register new pelicula
const register = async (req, res, next) => {
  const image = `${url}peliculaImage/${req.file.filename}`;
  const dbResponse = await registerPelicula({ ...req.body, image });
  if (dbResponse instanceof Error) return next(dbResponse);
  res.status(201).json(`Pelicula ${req.body.nombre} created!`);
};

// patch pelicula
const editOne = async (req, res, next) => {
  if (notNumber(req.params.id, res)) return;
  const dbResponse = await editPeliculaById(+req.params.id, req.body);
  if (dbResponse instanceof Error) return next(dbResponse);
  dbResponse.affectedRows ? res.status(200).json(req.body) : next();
};

// delete pelicula by id
const removeOne = async (req, res, next) => {
  if (notNumber(req.params.id, res)) return;
  const dbResponse = await deletePeliculaById(+req.params.id);
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
