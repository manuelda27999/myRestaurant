package hosteleria_proyect.api.services;

import hosteleria_proyect.api.entitys.Invoice;
import hosteleria_proyect.api.entitys.Order;
import hosteleria_proyect.api.entitys.Product;
import hosteleria_proyect.api.error.CustomException;
import hosteleria_proyect.api.interfaces.InvoiceInterface;
import hosteleria_proyect.api.interfaces.OrderInterface;
import hosteleria_proyect.api.interfaces.ProductInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;

@Service
public class OrderService implements InterfaceOrderService {

    @Autowired
    private OrderInterface orderInterface;

    @Autowired
    private InvoiceInterface invoiceInterface;

    @Autowired
    private ProductInterface productInterface;

    @Override
    public Order getOrderById(Integer user_id, Integer order_id) {
        Order order = orderInterface.findById(order_id).orElse(null);

        if (order == null) throw new CustomException(HttpStatus.NOT_FOUND, "Pedido no encontrado");
        if (!order.getUser_id().equals(user_id)) throw new CustomException(HttpStatus.UNPROCESSABLE_ENTITY, "Este pedido no pertenece a este usuario");

        order.setUser_id(null);

        return order;
    }

    @Override
    public List<Order> getOrders(Integer user_id) {
        List<Order> orders = orderInterface.getOrdersByUserId(user_id);

        orders.forEach(order -> order.setUser_id(null));

        return orders;
    }

    @Override
    public void createOrder(Integer user_id, Order order) {
        Invoice invoice = invoiceInterface.findInvoiceByTableIdAndPaidFalse(order.getTable_id()).orElse(null);
        Product product = productInterface.findById(order.getProduct_id()).orElse(null);

        if (invoice == null) {
            Invoice newInvoice = new Invoice();
            newInvoice.setTotal(product.getPrice() * order.getQuantity());
            newInvoice.setPaid(false);
            newInvoice.setTable_id(order.getTable_id());
            newInvoice.setUser_id(user_id);
            newInvoice.setInvoice_date(new Timestamp(System.currentTimeMillis()));

            invoiceInterface.save(newInvoice);

            invoice = invoiceInterface.findInvoiceByTableIdAndPaidFalse(order.getTable_id()).orElse(null);
            order.setInvoice_id(invoice.getInvoice_id());
        } else {
            invoice.setTotal(invoice.getTotal() + (product.getPrice() * order.getQuantity()));
            invoiceInterface.save(invoice);

            order.setInvoice_id(invoice.getInvoice_id());
        }

        order.setUser_id(user_id);
        order.setOrder_date(new Timestamp(System.currentTimeMillis()));

        orderInterface.save(order);
    }

    @Override
    public void editOrder(Integer user_id, Integer order_id, Order order) {

    }

    @Override
    public void deleteOrder(Integer user_id, Integer order_id) {

    }
}
