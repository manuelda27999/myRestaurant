package hosteleria_proyect.api.services;

import hosteleria_proyect.api.customEntitys.CustomInvoice;
import hosteleria_proyect.api.customEntitys.CustomOrder;
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

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
public class InvoiceService implements InterfaceInvoiceService {

    @Autowired
    private InvoiceInterface invoiceInterface;

    @Autowired
    private TableInterface tableInterface;

    @Autowired
    private OrderInterface orderInterface;

    @Autowired
    private ProductInterface productInterface;

    @Override
    public List<Invoice> getInvoices(Integer user_id) {

        return invoiceInterface.findInvoicesByUserId(user_id);
    }

    @Override
    public List<CustomInvoice> getCustomInvoices(Integer user_id) {
        List<CustomInvoice> customInvoices = new ArrayList<>();
        List <Invoice> invoices = invoiceInterface.findInvoicesByUserId(user_id);

        invoices.forEach(invoice -> {
            CustomInvoice customInvoice = new CustomInvoice();
            List<CustomOrder> customOrders = new ArrayList<>();

            Table table = tableInterface.findById(invoice.getTable_id()).orElse(null);
            List<Order> orders = orderInterface.getOrdersByInvoiceId(invoice.getInvoice_id());

            if (invoice == null) throw new CustomException(HttpStatus.NOT_FOUND, "Factura no encontrada.");
            if (!invoice.getUser_id().equals(user_id)) throw new CustomException(HttpStatus.UNPROCESSABLE_ENTITY ,"El usuario no tiene permiso para acceder a esta factura.");
            if (table == null) throw new CustomException(HttpStatus.NOT_FOUND, "Mesa no encontrada.");
            if (!table.getUser_id().equals(user_id)) throw new CustomException(HttpStatus.UNPROCESSABLE_ENTITY ,"El usuario no tiene permiso para acceder a esta mesa.");

            customInvoice.setInvoice_id(invoice.getInvoice_id());
            customInvoice.setTotal(invoice.getTotal());

            LocalDateTime dateTimeForInvoice = invoice.getInvoice_date().toLocalDateTime();
            DateTimeFormatter dateFormatterForInvoice = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
            customInvoice.setInvoice_date(dateTimeForInvoice.format(dateFormatterForInvoice));

            customInvoice.setPaid(invoice.getPaid());
            customInvoice.setTable_name(table.getTable_name());

            orders.forEach(order -> {
                Product product = productInterface.findById(order.getProduct_id()).orElse(null);

                CustomOrder customOrder = new CustomOrder();
                customOrder.setOrder_id(order.getOrder_id());
                customOrder.setProduct_name(product.getProduct_name());
                customOrder.setTable_id(order.getTable_id());
                customOrder.setTable_name(table.getTable_name());
                customOrder.setProduct_id(order.getProduct_id());
                customOrder.setProduct_name(product.getProduct_name());
                customOrder.setPrice(product.getPrice());
                customOrder.setQuantity(order.getQuantity());
                customOrder.setTotal(product.getPrice() * order.getQuantity());

                LocalDateTime dateTime = order.getOrder_date().toLocalDateTime();
                DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
                customOrder.setOrder_date(dateTime.format(dateFormatter));

                customOrder.setStatus(order.getStatus());

                customOrders.add(customOrder);
            });

            customInvoice.setOrders(customOrders);
            customInvoices.addFirst(customInvoice);
        });

        return customInvoices;
    }

    @Override
    public CustomInvoice getCustomInvoice(Integer user_id, Integer invoice_id) {
        CustomInvoice customInvoice = new CustomInvoice();
        List<CustomOrder> customOrders = new ArrayList<>();

        Invoice invoice = invoiceInterface.findById(invoice_id).orElse(null);
        Table table = tableInterface.findById(invoice.getTable_id()).orElse(null);
        List<Order> orders = orderInterface.getOrdersByInvoiceId(invoice_id);

        if (invoice == null) throw new CustomException(HttpStatus.NOT_FOUND, "Factura no encontrada.");
        if (!invoice.getUser_id().equals(user_id)) throw new CustomException(HttpStatus.UNPROCESSABLE_ENTITY ,"El usuario no tiene permiso para acceder a esta factura.");
        if (table == null) throw new CustomException(HttpStatus.NOT_FOUND, "Mesa no encontrada.");
        if (!table.getUser_id().equals(user_id)) throw new CustomException(HttpStatus.UNPROCESSABLE_ENTITY ,"El usuario no tiene permiso para acceder a esta mesa.");

        customInvoice.setInvoice_id(invoice_id);
        customInvoice.setTotal(invoice.getTotal());

        LocalDateTime dateTimeForInvoice = invoice.getInvoice_date().toLocalDateTime();
        DateTimeFormatter dateFormatterForInvoice = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        customInvoice.setInvoice_date(dateTimeForInvoice.format(dateFormatterForInvoice));

        customInvoice.setPaid(invoice.getPaid());
        customInvoice.setTable_name(table.getTable_name());

        orders.forEach(order -> {
            Product product = productInterface.findById(order.getProduct_id()).orElse(null);

            CustomOrder customOrder = new CustomOrder();
            customOrder.setOrder_id(order.getOrder_id());
            customOrder.setProduct_name(product.getProduct_name());
            customOrder.setTable_id(order.getTable_id());
            customOrder.setTable_name(table.getTable_name());
            customOrder.setProduct_id(order.getProduct_id());
            customOrder.setProduct_name(product.getProduct_name());
            customOrder.setPrice(product.getPrice());
            customOrder.setQuantity(order.getQuantity());
            customOrder.setTotal(product.getPrice() * order.getQuantity());

            LocalDateTime dateTime = order.getOrder_date().toLocalDateTime();
            DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
            customOrder.setOrder_date(dateTime.format(dateFormatter));

            customOrder.setStatus(order.getStatus());

            customOrders.add(customOrder);
        });

        customInvoice.setOrders(customOrders);

        return customInvoice;
    }

    @Override
    public Invoice getInvoice(Integer user_id, Integer invoice_id) {
        return null;
    }

    @Override
    public void changePaid(Integer user_id, Integer invoice_id) {
        Invoice invoice = invoiceInterface.findById(invoice_id).orElse(null);

        if (invoice == null) throw new CustomException(HttpStatus.NOT_FOUND, "Factura no encontrada.");
        if (!invoice.getUser_id().equals(user_id)) throw new CustomException(HttpStatus.UNPROCESSABLE_ENTITY ,"El usuario no tiene permiso para modificar esta factura.");

        Table table = tableInterface.findById(invoice.getTable_id()).orElse(null);
        if (table == null) throw new CustomException(HttpStatus.NOT_FOUND, "Mesa no encontrada");

        table.setAvailable(!table.getAvailable());

        invoice.setPaid(!invoice.getPaid());

        invoiceInterface.save(invoice);
    }

    @Override
    public void editInvoice(Integer user_id, Integer invoice_id, Invoice invoice) {
        Invoice invoiceToEdit = invoiceInterface.findById(invoice_id).orElse(null);

        if (invoiceToEdit == null) throw new CustomException(HttpStatus.NOT_FOUND, "Factura no encontrada.");
        if (!invoiceToEdit.getUser_id().equals(user_id)) throw new CustomException(HttpStatus.UNPROCESSABLE_ENTITY ,"El usuario no tiene permiso para modificar esta factura.");

        invoiceToEdit.setTable_id(invoice.getTable_id());

        invoiceInterface.save(invoiceToEdit);
    }
}
