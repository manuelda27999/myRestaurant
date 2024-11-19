package hosteleria_proyect.api.services;

import hosteleria_proyect.api.entitys.Invoice;
import hosteleria_proyect.api.interfaces.InvoiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InvoiceService implements InterfaceInvoiceService {

    @Autowired
    private InvoiceInterface invoiceInterface;

    @Override
    public List<Invoice> getInvoices() {
        List<Invoice> invoices = invoiceInterface.findAll();
        return invoices;
    }

    @Override
    public Invoice getInvoice(Integer invoice_id) {
        Invoice invoice = invoiceInterface.findById(invoice_id).orElse(null);
        return invoice;
    }

    @Override
    public void saveInvoice(Invoice invoice) {
        invoiceInterface.save(invoice);
    }

    @Override
    public void deleteInvoice(Invoice invoice) {
        invoiceInterface.delete(invoice);
    }
}
