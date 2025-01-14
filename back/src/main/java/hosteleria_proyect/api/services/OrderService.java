package hosteleria_proyect.api.services;

import hosteleria_proyect.api.customEntitys.CustomOrder;
import hosteleria_proyect.api.customEntitys.OrderStatus;
import hosteleria_proyect.api.entitys.Invoice;
import hosteleria_proyect.api.entitys.Order;
import hosteleria_proyect.api.entitys.Product;
import hosteleria_proyect.api.entitys.Table;
import hosteleria_proyect.api.error.CustomException;
import hosteleria_proyect.api.interfaces.InvoiceInterface;
import hosteleria_proyect.api.interfaces.OrderInterface;
import hosteleria_proyect.api.interfaces.ProductInterface;
import hosteleria_proyect.api.interfaces.TableInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class OrderService implements InterfaceOrderService {

    @Autowired
    private OrderInterface orderInterface;

    @Autowired
    private InvoiceInterface invoiceInterface;

    @Autowired
    private ProductInterface productInterface;

    @Autowired
    private TableInterface tableInterface;

    @Override
    public CustomOrder getOrderById(Integer user_id, Integer order_id) {
        CustomOrder customOrder = new CustomOrder();
        Order order = orderInterface.findById(order_id).orElse(null);

        if (order == null) throw new CustomException(HttpStatus.NOT_FOUND, "Pedido no encontrado");
        if (!order.getUser_id().equals(user_id)) throw new CustomException(HttpStatus.UNPROCESSABLE_ENTITY, "Este pedido no pertenece a este usuario");

        Product product = productInterface.findById(order.getProduct_id()).orElse(null);
        Table table = tableInterface.findById(order.getTable_id()).orElse(null);

        customOrder.setOrder_id(order.getOrder_id());
        customOrder.setTable_id(order.getTable_id());
        customOrder.setTable_name(table.getTable_name());
        customOrder.setProduct_id(order.getProduct_id());
        customOrder.setProduct_name(product.getProduct_name());
        customOrder.setQuantity(order.getQuantity());

        LocalDateTime dateTime = order.getOrder_date().toLocalDateTime();
        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        customOrder.setOrder_date(dateTime.format(dateFormatter));

        customOrder.setStatus(order.getStatus());
        customOrder.setInvoice_id(order.getInvoice_id());

        return customOrder;
    }

    @Override
    public List<CustomOrder> getOrders(Integer user_id) {
        List<CustomOrder> customOrders = new ArrayList<>();
        List<Order> orders = orderInterface.getOrdersByUserId(user_id);

        orders.forEach(order -> {
            Product product = productInterface.findById(order.getProduct_id()).orElse(null);
            Table table = tableInterface.findById(order.getTable_id()).orElse(null);

            CustomOrder customOrder = new CustomOrder();
            customOrder.setOrder_id(order.getOrder_id());
            customOrder.setTable_id(order.getTable_id());
            customOrder.setTable_name(table.getTable_name());
            customOrder.setProduct_id(order.getProduct_id());
            customOrder.setProduct_name(product.getProduct_name());
            customOrder.setQuantity(order.getQuantity());

            LocalDateTime dateTime = order.getOrder_date().toLocalDateTime();
            DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");

            customOrder.setOrder_date(dateTime.format(dateFormatter));
            customOrder.setStatus(order.getStatus());
            customOrder.setInvoice_id(order.getInvoice_id());

            customOrders.add(customOrder);
        });

        return customOrders;
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
        order.setStatus(OrderStatus.PENDING);

        orderInterface.save(order);
    }

    @Override
    public void editOrder(Integer user_id, Integer order_id, Order order) {
        Order orderToEdit = orderInterface.findById(order_id).orElse(null);
        Product oldProduct = productInterface.findById(orderToEdit.getProduct_id()).orElse(null);
        Product newProduct = productInterface.findById(order.getProduct_id()).orElse(null);
        Invoice oldInvoice = invoiceInterface.findById(orderToEdit.getInvoice_id()).orElse(null);

        if (orderToEdit == null) throw new CustomException(HttpStatus.NOT_FOUND, "Pedido no encontrado");
        if (!orderToEdit.getUser_id().equals(user_id)) throw new CustomException(HttpStatus.UNPROCESSABLE_ENTITY, "Este pedido no pertenece a este usuario");
        if (oldProduct == null) throw new CustomException(HttpStatus.NOT_FOUND, "Producto no encontrado");
        if (!oldProduct.getUser_id().equals(user_id)) throw new CustomException(HttpStatus.UNPROCESSABLE_ENTITY, "Este producto no pertenece a este usuario");
        if (newProduct == null) throw new CustomException(HttpStatus.NOT_FOUND, "Producto no encontrado");
        if (!newProduct.getUser_id().equals(user_id)) throw new CustomException(HttpStatus.UNPROCESSABLE_ENTITY, "Este producto no pertenece a este usuario");
        if (oldInvoice == null) throw new CustomException(HttpStatus.NOT_FOUND, "Factura no encontrada");
        if (!oldInvoice.getUser_id().equals(user_id)) throw new CustomException(HttpStatus.UNPROCESSABLE_ENTITY, "Esta factura no pertenece a este usuario");

        if (orderToEdit.getTable_id().equals(order.getTable_id())) {

            oldInvoice.setTotal(oldInvoice.getTotal() - (orderToEdit.getQuantity() * oldProduct.getPrice()));
            oldInvoice.setTotal(oldInvoice.getTotal() + (order.getQuantity() * newProduct.getPrice()));

            invoiceInterface.save(oldInvoice);
        } else {
            Invoice invoiceToEdit = invoiceInterface.findInvoiceByTableIdAndPaidFalse(order.getTable_id()).orElse(null);

            oldInvoice.setTotal(oldInvoice.getTotal() - (orderToEdit.getQuantity() * oldProduct.getPrice()));
            invoiceInterface.save(oldInvoice);

            if (invoiceToEdit == null) {
                Invoice newInvoice = new Invoice();
                newInvoice.setTotal(newProduct.getPrice() * order.getQuantity());
                newInvoice.setPaid(false);
                newInvoice.setTable_id(order.getTable_id());
                newInvoice.setUser_id(user_id);
                newInvoice.setInvoice_date(new Timestamp(System.currentTimeMillis()));

                invoiceInterface.save(newInvoice);

                Invoice invoiceToSave = invoiceInterface.findInvoiceByTableIdAndPaidFalse(order.getTable_id()).orElse(null);
                orderToEdit.setInvoice_id(invoiceToSave.getInvoice_id());
            } else {
                invoiceToEdit.setTotal(invoiceToEdit.getTotal() + (order.getQuantity() * newProduct.getPrice()));
                invoiceInterface.save(invoiceToEdit);

                orderToEdit.setInvoice_id(invoiceToEdit.getInvoice_id());
            }
        }

        orderToEdit.setQuantity(order.getQuantity());
        orderToEdit.setProduct_id(order.getProduct_id());
        orderToEdit.setStatus(order.getStatus());
        orderToEdit.setTable_id(order.getTable_id());

        orderInterface.save(orderToEdit);
    }

    @Override
    public void changeStatus(Integer user_id, Integer order_id) {
        Order orderToEdit = orderInterface.findById(order_id).orElse(null);

        if (orderToEdit == null) throw new CustomException(HttpStatus.NOT_FOUND, "Pedido no encontrado");
        if (!orderToEdit.getUser_id().equals(user_id)) throw new CustomException(HttpStatus.UNPROCESSABLE_ENTITY, "Este pedido no pertenece a este usuario");

        switch (orderToEdit.getStatus()) {
            case OrderStatus.PENDING:
                orderToEdit.setStatus(OrderStatus.PREPARING);
                break;
            case OrderStatus.PREPARING:
                orderToEdit.setStatus(OrderStatus.READY);
                break;
            case OrderStatus.READY:
                orderToEdit.setStatus(OrderStatus.DELIVERED);
                break;
            case OrderStatus.DELIVERED:
                orderToEdit.setStatus(OrderStatus.PENDING);
                break;
        }

        orderInterface.save(orderToEdit);
    }

    @Override
    public void deleteOrder(Integer user_id, Integer order_id) {
        Order orderToDelete = orderInterface.findById(order_id).orElse(null);
        Invoice invoiceToEdit = invoiceInterface.findById(orderToDelete.getInvoice_id()).orElse(null);
        Product product = productInterface.findById(orderToDelete.getProduct_id()).orElse(null);

        if (orderToDelete == null) throw new CustomException(HttpStatus.NOT_FOUND, "Pedido no encontrado");
        if (!orderToDelete.getUser_id().equals(user_id)) throw new CustomException(HttpStatus.UNPROCESSABLE_ENTITY, "Este pedido no pertenece a este usuario");
        if (invoiceToEdit == null) throw new CustomException(HttpStatus.NOT_FOUND, "Factura no encontrada");
        if (!invoiceToEdit.getUser_id().equals(user_id)) throw new CustomException(HttpStatus.UNPROCESSABLE_ENTITY, "Esta factura no pertenece a este usuario");

        if (orderToDelete.getStatus() != OrderStatus.PENDING) throw new CustomException(HttpStatus.UNPROCESSABLE_ENTITY, "Esta orden no se puede eliminar debido a su estado");

        invoiceToEdit.setTotal(invoiceToEdit.getTotal() - (orderToDelete.getQuantity() * product.getPrice()));

        invoiceInterface.save(invoiceToEdit);
        orderInterface.delete(orderToDelete);
    }
}
