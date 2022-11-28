const connection = require('./connection');

const allOrders = async () => {
  const query = 'SELECT orders.orderId, orders.quantity, products.productId, products.productName, products.price FROM orders INNER JOIN products ON products.productId = orders.productId';
  const [orders] = await connection.execute(query);
  return orders;
};

const createOrder = async (order, userEmail) => {
  const { productId, quantity } = order;
  const query = 'INSERT INTO orders (productId, quantity, userEmail) VALUES (?,?,?)';
  const [orderCreated] = await connection.execute(query, [productId, quantity, userEmail]);
  return orderCreated;
};

const getOneOrder = async (id) => {
  const query = 'SELECT orders.orderId, orders.quantity, products.productId, products.productName, products.price FROM orders INNER JOIN products ON products.productId = orders.productId WHERE orderId = ?';
  const [orderSelected] = await connection.execute(query, [id]);
  return orderSelected;
};

const deleteOrder = async (id) => {
  const query = 'DELETE FROM orders WHERE orderId = ?';
  const [orderDeleted] = await connection.execute(query, [id]);
  return orderDeleted;
};

const userOrder = async (email) => {
  const query = 'SELECT orders.orderId, orders.quantity, products.productId, products.productName, products.price FROM orders INNER JOIN products ON products.productId = orders.productId WHERE userEmail = ?';
  const [userOrders] = await connection.execute(query, [email]);
  return userOrders;
};

module.exports = {
  allOrders,
  createOrder,
  getOneOrder,
  deleteOrder,
  userOrder
};
