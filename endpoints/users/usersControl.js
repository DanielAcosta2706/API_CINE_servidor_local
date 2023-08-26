// Requerir consultas de las bases de datos
const {
  getAllUsers,
  getUserById,
  registerUser,
  loginUser,
  editUserById,
  deleteUserById,
} = require("./usersModel");

// Requerir funcion de numero entero positivo
const notNumber = require("../../utils/notNumber");

// Requerir encriptacion y chequeo de contraseña
const { hashPassword, checkPassword } = require("../../utils/handlePassword");

// Requerir firma y verificacion de token
const { tokenSign, tokenVerify } = require("../../utils/handleJWT");

// Requerir configuracion de nodemailer
const transport = require("../../nodmailerConfig/nodmailerConfig.js");

// Requerir matchData (dependencia)
const { matchedData } = require("express-validator");

// Requerir clave url_base (.env)
const url = process.env.url_base;

// get all users
const listAll = async (req, res, next) => {
  const dbResponse = await getAllUsers();
  if (dbResponse instanceof Error) return next(dbResponse);
  dbResponse.length ? res.status(200).json(dbResponse) : next();
};

// get user by id
const listOne = async function (req, res, next) {
  if (notNumber(req.params.id, res)) return;
  const dbResponse = await getUserById(Number(req.params.id));
  if (dbResponse instanceof Error) return next(dbResponse);
  dbResponse.length ? res.status(200).json(dbResponse) : next();
};

// Register new user
const register = async (req, res, next) => {
  const cleanBody = matchedData(req);
  // const image = url + req.file.filename;
  const image = `${url}userImage/${req.file.filename}`;
  // console.log(image);
  const password = await hashPassword(req.body.password);
  const dbResponse = await registerUser({ ...cleanBody, password, image });
  // console.log(image);
  if (dbResponse instanceof Error) return next(dbResponse);
  const user = {
    name: cleanBody.name,
    surname: cleanBody.surname,
    email: cleanBody.email,
  };

  const tokenData = {
    token: await tokenSign(user, "2h"),
    user,
  };
  res.status(201).json({
    user: `${req.body.name} ${req.body.surname}`,
    Token_Info: tokenData,
  });
};

// Login user
const login = async (req, res, next) => {
  // console.log(req.body);
  const cleanBody = matchedData(req);
  // console.log(cleanBody);
  const dbResponse = await loginUser(req.body.email);
  if (!dbResponse.length) return next(dbResponse);
  if (await checkPassword(req.body.password, dbResponse[0].password)) {
    const user = {
      id: dbResponse[0].id,
      name: dbResponse[0].name,
      surname: dbResponse[0].surname,
      dateBirth: dbResponse[0].dateBirth,
      gender: dbResponse[0].gender,
      phone: dbResponse[0].phone,
      email: dbResponse[0].email,
      image: dbResponse[0].image,
    };
    const tokenData = {
      token: await tokenSign(user, "60s"),
      user,
    };
    res.status(200).json({
      message: `User ${user.name} ${user.surname} Logged in!`,
      Token_info: tokenData,
    });
  } else {
    let error = new Error();
    error.status = 401;
    error.message = "Unauthorized";
    next(error);
  }
};

// Forgot password
const forgot = async (req, res, next) => {
  const dbResponse = await loginUser(req.body.email);
  if (!dbResponse.length) return next();
  const user = {
    id: dbResponse[0].id,
    name: dbResponse[0].name,
    email: dbResponse[0].email,
  };
  const token = await tokenSign(user, "15m");
  const link = `${process.env.url_base}users/reset/${token}`;

  const mailDetails = {
    from: "cine-support@mydomain.com",
    to: user.email,
    subject: "Password recovery",
    html: `
    <h2>Password Recovery Service</h2>
    <p>To reset your password please click on the link and follow instructions</p>
    <a href=${link}>Click to recover your password</a>
    `,
  };

  transport.sendMail(mailDetails, (error, data) => {
    if (error) return next(error);
    console.log(data);
    res.status(200).json({
      message: `Hi ${user.name}, we've sent an email with instructions to ${user.email}. You've got 15 minutes to reset your password. Hurry up!`,
    });
  });
};

// RESET PASSWORD (GET)
// Mostramos el formulario de recuperación de contraseña
const reset = async (req, res, next) => {
  const token = req.params.token;
  const tokenStatus = await tokenVerify(req.params.token);
  console.log(tokenStatus);
  if (tokenStatus instanceof Error) {
    res.status(403).json({ message: "Invalid or Expired Token" });
  } else {
    res.render("reset", { token, tokenStatus });
  }
};

// RESET PASSWORD (POST)
// Recibe la nueva contraseña desde el formulario de recuperación de contraseña
const saveNewPass = async (req, res, next) => {
  const { token } = req.params;
  const tokenStatus = await tokenVerify(token);
  if (tokenStatus instanceof Error) return next(tokenStatus);
  const password = await hashPassword(req.body.password_1);
  const dbResponse = await editUserById(tokenStatus.id, { password });
  dbResponse instanceof Error
    ? next(dbResponse)
    : res
        .status(200)
        .json({ message: `Password changed for user ${tokenStatus.name}` });
};

// patch user
const editOne = async (req, res, next) => {
  if (notNumber(req.params.id, res)) return;
  const dbResponse = await editUserById(+req.params.id, req.body);
  if (dbResponse instanceof Error) return next(dbResponse);
  dbResponse.affectedRows ? res.status(200).json(req.body) : next();
};

// delete user by id
const removeOne = async (req, res, next) => {
  if (notNumber(req.params.id, res)) return;
  const dbResponse = await deleteUserById(+req.params.id);
  if (dbResponse instanceof Error) return next(dbResponse);
  dbResponse.affectedRows ? res.status(204).end() : next();
};

// Exportar controladores
module.exports = {
  listAll,
  listOne,
  register,
  login,
  forgot,
  reset,
  saveNewPass,
  editOne,
  removeOne,
};
