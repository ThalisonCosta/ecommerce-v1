const ordersModel = require('../models/ordersModel');

const allOrders = async (req, res) => {
  const orders = await ordersModel.allOrders();
  if (await orders.length === 0) {
    return res.status(204).send();
  }
  const response = {
    total: orders.length,
    orders: orders.map(order => {
      return {
        orderId: order.orderId,
        productId: order.productId,
        quantity: order.quantity,
        url: 'http://localhost:8080/orders/' + order.productId
      };
    })
  };
  return res.status(200).send(response);
};

const oneOrder = async (req, res) => {
  const { id } = req.params;
  const orderSelected = await ordersModel.getOneOrder(id);

  if (await orderSelected.length === 0) {
    return res.status(404).send({ message: 'order not exists' });
  }
  const response = {
    id: orderSelected[0].orderId,
    productId: orderSelected[0].productId,
    quantity: orderSelected[0].quantity,
    url: 'http://localhost:8080/orders/'
  };

  return res.status(200).send(response);

};

const createOrder = async (req, res) => {
  const orderCreated = await ordersModel.createOrder(req.body);
  const response = {
    message: 'Order insert succesfully!',
    newOrder: {
      id: orderCreated.id,
      productId: req.body.productId,
      quantity: req.body.quantity,
      url: 'http://localhost:8080/orders/'
    }
  };
  return res.status(201).send(response);
};

const deleteOrder = async (req, res) => {
  const { id } = req.params;
  const deletedOrder = await ordersModel.deleteOrder(id);
  if (deletedOrder.length === 0) {
    return res.status(404).send({ message: 'Cant delete because order not exists' });
  }
  return res.status(202).send({ message: 'Order deleted succesfully!' });
};

module.exports = {
  allOrders,
  oneOrder,
  createOrder,
  deleteOrder
};
