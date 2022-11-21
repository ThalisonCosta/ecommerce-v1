const connection = require('./connection');

const allOrders = async () => {
  const [orders] = await connection.execute('SELECT * FROM orders');
  return orders;
};

const createOrder = async (order) => {
  const { productId, quantity } = order;
  const query = 'INSERT INTO orders (productId, quantity) VALUES (?,?)';
  const [orderCreated] = await connection.execute(query, [productId, quantity]);
  return orderCreated;
};

const getOneOrder = async (id) => {
  const query = 'SELECT * FROM orders WHERE orderId = ?';
  const [orderSelected] = await connection.execute(query, [id]);
  return orderSelected;
};

const deleteOrder = async (id) => {
  const query = 'DELETE FROM orders WHERE orderId = ?';
  const [orderDeleted] = await connection.execute(query, [id]);
  return orderDeleted;
};

module.exports = {
  allOrders,
  createOrder,
  getOneOrder,
  deleteOrder
};
