const ordersModel = require('../models/ordersModel');
const checkUserId = require('../utils/commom');

const oneOrder = async (req, res) => {
  const { id } = req.params;
  const userId = checkUserId(req.headers.authorization.split(' ')[1]);
  const orderSelected = await ordersModel.getOneOrder(id, userId);

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
  const userId = checkUserId(req.headers.authorization.split(' ')[1]);
  const orderCreated = await ordersModel.createOrder(req.body, userId);
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
  const userId = checkUserId(req.headers.authorization.split(' ')[1]);
  const deletedOrder = await ordersModel.deleteOrder(id, userId);
  if (deletedOrder.affectedRows === 0) {
    return res.status(404).send({ message: 'order not found' });
  }
  return res.status(202).send({ message: 'Order deleted succesfully!' });
};

const userOrder = async (req, res) => {
  const userId = checkUserId(req.headers.authorization.split(' ')[1]);
  const userOrders = await ordersModel.userOrder(userId);
  if (userOrders.length < 1) {
    return res.status(200).send({ message: 'user has no order to list' });
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
  oneOrder,
  createOrder,
  deleteOrder,
  userOrder
};
