const connection = require('./connection');

const createOrder = async (order, userId) => {
  const { productId, quantity } = order;
  const query = 'INSERT INTO orders (productId, quantity, userId) VALUES (?,?,?)';
  const [orderCreated] = await connection.execute(query, [productId, quantity, userId]);
  return orderCreated;
};

const getOneOrder = async (id, userId) => {
  const query = 'SELECT orders.orderId, orders.quantity, products.productId, products.productName, products.price FROM orders INNER JOIN products ON products.productId = orders.productId WHERE orderId = ? AND userId = ?';
  const [orderSelected] = await connection.execute(query, [id, userId]);
  return orderSelected;
};

const deleteOrder = async (id, userId) => {
  const query = 'DELETE FROM orders WHERE orderId = ? AND userId = ?';
  const [orderDeleted] = await connection.execute(query, [id, userId]);
  return orderDeleted;
};

const userOrder = async (userId) => {
  const query = 'SELECT orders.orderId, orders.quantity, products.productId, products.productName, products.price FROM orders INNER JOIN products ON products.productId = orders.productId WHERE userId = ?';
  const [userOrders] = await connection.execute(query, [userId]);
  return userOrders;
};

module.exports = {
  createOrder,
  getOneOrder,
  deleteOrder,
  userOrder
};
