package hosteleria_proyect.api.controllers;

import hosteleria_proyect.api.entitys.Invoice;
import hosteleria_proyect.api.services.InvoiceService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("hosteleria-proyect")
@CrossOrigin(value = "http://localhost:3000")
public class InvoiceController {

    private static final Logger logger = LoggerFactory.getLogger(InvoiceController.class);

    @Autowired
    private InvoiceService invoiceService;

    @GetMapping("/invoices")
    public List<Invoice> getInvoices() {
       var invoices = invoiceService.getInvoices();
       return invoices;
    }
}
