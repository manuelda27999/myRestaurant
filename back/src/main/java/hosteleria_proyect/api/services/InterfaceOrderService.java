package hosteleria_proyect.api.services;

import hosteleria_proyect.api.entitys.Order;

import java.util.List;

public interface InterfaceOrderService {
    public Order getOrderById(Integer user_id, Integer product_id);

    public List<Order> getOrders(Integer user_id);

    public void createOrder(Integer user_id, Order order);

    public void editOrder(Integer user_id, Integer order_id, Order order);

    public void deleteOrder(Integer user_id, Integer order_id);
}
