// Requerir consultas de las bases de datos
const { buyNewTicket, getAllTickets } = require("./ticketsModel");

// get all tickets
const getAll = async (req, res, next) => {
  const dbResponse = await getAllTickets();
  if (dbResponse instanceof Error) return next(dbResponse);
  dbResponse.length ? res.status(200).json(dbResponse) : next();
};

// buy new ticket
const buyOne = async (req, res, next) => {
  const dbResponse = await buyNewTicket({ userid: req.token.id, ...req.body });
  dbResponse instanceof Error
    ? next(dbResponse)
    : res.status(201).json({
        message: `Ticket bought by ${req.token.name} ${req.token.surname}`,
      });
};

module.exports = { getAll, buyOne };
