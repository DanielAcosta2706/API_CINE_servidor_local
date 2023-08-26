// Requerir a multer (dependencia)
const multer = require("multer");

// Define el middleware donde se guardan los archivos de los usuarios
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    // const pathStorage = `${__dirname}/../../public`;
    const pathStorage = `${__dirname}/../../public/userImage`;
    callback(null, pathStorage);
  },
  filename: (req, file, callback) => {
    const ext = file.originalname.split(".").pop();
    const filename = `img-${Date.now()}.${ext}`;
    callback(null, filename);
  },
});

// Creamos el middleware
const fileUploadUser = multer({ storage });

// Exportar carga de archivos
module.exports = fileUploadUser;
