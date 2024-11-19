package hosteleria_proyect.api.services;

import hosteleria_proyect.api.entitys.Invoice;

import java.util.List;

public interface InterfaceInvoiceService {
    public List<Invoice> getInvoices();

    public Invoice getInvoice(Integer invoice_id);

    public void saveInvoice(Invoice invoice);

    public void deleteInvoice(Invoice invoice);
}
