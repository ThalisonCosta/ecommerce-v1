const allOrders = (req, res) => {
  return res.status(200).send({ message: 'tá ok' });
};

const oneOrder = (req, res) => {
  const { id } = req.params;
  return res.status(200).send({
    message: 'unique Order',
    id: id
  });
};

const createOrder = (req, res) => {
  const body = req.body;
  return res.status(201).send({ message: 'created', order: body });
};

const editOrder = (req, res) => {
  const { id } = req.params;
  return res.status(202).send({ message: `the ${id} was edited` });
};

const deleteOrder = (req, res) => {
  const { id } = req.params;
  return res.status(204).send({ message: `the ${id} was deleted` });
};

module.exports = {
  allOrders,
  oneOrder,
  createOrder,
  editOrder,
  deleteOrder
};
