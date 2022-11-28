const ordersModel = require('../models/ordersModel');
const jwt = require('jsonwebtoken');

const allOrders = async (req, res) => {
  const orders = await ordersModel.allOrders();
  if (await orders.length === 0) {
    return res.status(200).send({ message: 'no orders registreted' });
  }
  const response = {
    total: orders.length,
    orders: orders.map(order => {
      return {
        orderId: order.orderId,
        quantity: order.quantity,
        product: {
          productId: order.productId,
          name: order.productName,
          price: order.price,
          url: process.env.BASE_URL + 'products/' + order.productId
        },
      };
    })
  };
  return res.status(200).send(response);
};

const oneOrder = async (req, res) => {
  const { id } = req.params;
  const orderSelected = await ordersModel.getOneOrder(id);

  if (await orderSelected.length === 0) {
    return res.status(404).send({ message: 'order not found' });
  }
  const response = {
    id: orderSelected[0].orderId,
    quantity: orderSelected[0].quantity,
    product: {
      productId: orderSelected[0].productId,
      name: orderSelected[0].productName,
      price: orderSelected[0].price,
      url: process.env.BASE_URL + 'products/' + orderSelected[0].productId
    }
  };

  return res.status(200).send(response);

};

const createOrder = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const { refreshToken } = jwt.decode(token);
  const { userEmail } = jwt.decode(refreshToken);
  const orderCreated = await ordersModel.createOrder(req.body, userEmail);
  const response = {
    message: 'Order insert succesfully!',
    newOrder: {
      id: orderCreated.id,
      productId: req.body.productId,
      quantity: req.body.quantity,
      url: process.env.BASE_URL + 'orders/'
    }
  };
  return res.status(201).send(response);
};

const deleteOrder = async (req, res) => {
  const { id } = req.params;
  const deletedOrder = await ordersModel.deleteOrder(id);
  if (deletedOrder.affectedRows === 0) {
    return res.status(404).send({ message: 'order not found' });
  }
  return res.status(202).send({ message: 'Order deleted succesfully!' });
};

const userOrder = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const { refreshToken } = jwt.decode(token);
  const { userEmail } = jwt.decode(refreshToken);
  const userOrders = await ordersModel.userOrder(userEmail);
  if (userOrders.length < 1) {
    return res.status(404).send({ message: 'user has no order to list' });
  }
  const response = {
    total: userOrders.length,
    orders: userOrders.map(order => {
      return {
        orderId: order.orderId,
        quantity: order.quantity,
        product: {
          productId: order.productId,
          name: order.productName,
          price: order.price,
          url: process.env.BASE_URL + 'products/' + order.productId
        },
      };
    })
  };

  res.status(200).send(response);
};

module.exports = {
  allOrders,
  oneOrder,
  createOrder,
  deleteOrder,
  userOrder
};
