package hosteleria_proyect.api.services;

import hosteleria_proyect.api.customEntitys.CustomOrder;
import hosteleria_proyect.api.entitys.Order;

import java.util.List;

public interface InterfaceOrderService {
    public CustomOrder getOrderById(Integer user_id, Integer product_id);

    public List<CustomOrder> getOrders(Integer user_id);

    public void createOrder(Integer user_id, Order order);

    public void editOrder(Integer user_id, Integer order_id, Order order);

    public void changeStatus(Integer user_id, Integer order_id);

    public void deleteOrder(Integer user_id, Integer order_id);
}
