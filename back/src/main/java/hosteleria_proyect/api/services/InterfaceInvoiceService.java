package hosteleria_proyect.api.services;

import hosteleria_proyect.api.customEntitys.CustomInvoice;
import hosteleria_proyect.api.entitys.Invoice;

import java.util.List;

public interface InterfaceInvoiceService {
    public List<Invoice> getInvoices(Integer user_id);

    public CustomInvoice getCustomInvoices(Integer user_id, Integer invoice_id);

    public Invoice getInvoice(Integer user_id, Integer invoice_id);

    public void changePaid(Integer user_id, Integer invoice_id);

    public void editInvoice(Integer user_id, Integer invoice_id, Invoice invoice);

    public void deleteInvoice(Integer user_id, Integer invoice_id);
}
