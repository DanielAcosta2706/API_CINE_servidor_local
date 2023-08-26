// Requerir a multer (dependencia)
const multer = require("multer");

// Definie el middleware donde se guardaran los archivos
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    const pathStorage = `${__dirname}/../../public/cineImage`;
    callback(null, pathStorage);
  },
  filename: (req, file, callback) => {
    const ext = file.originalname.split(".").pop();
    const filename = `img-${Date.now()}.${ext}`;
    callback(null, filename);
  },
});

// Creamos el middleware
const fileUploadCine = multer({ storage });

// Exportar carga de archivos
module.exports = fileUploadCine;
