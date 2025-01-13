package hosteleria_proyect.api.controllers;

import hosteleria_proyect.api.customEntitys.CustomInvoice;
import hosteleria_proyect.api.entitys.Invoice;
import hosteleria_proyect.api.error.CustomException;
import hosteleria_proyect.api.services.InvoiceService;
import hosteleria_proyect.api.utilities.JWTUtils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("myRestaurant")
@CrossOrigin(value = "{*}")
public class InvoiceController {

    @Autowired
    private InvoiceService invoiceService;

    @GetMapping("/invoices")
    public ResponseEntity<?> getInvoices(@RequestHeader("Authorization") String bearerToken) {
        try {
            String token = bearerToken.replace("Bearer ", "");
            int user_id = JWTUtils.getIdFromToken(token);

            List<Invoice> invoices = invoiceService.getInvoices(user_id);
            return ResponseEntity.ok(invoices);
        } catch (CustomException exception) {
            Map<String, String> response = new HashMap<>();
            response.put("message", exception.getMessage());
            return new ResponseEntity<>(response, exception.getStatus());
        }
    }

    @GetMapping("/invoices/{invoice_id}")
    public ResponseEntity<?> getCustomInvoice(@PathVariable Integer invoice_id ,@RequestHeader("Authorization") String bearerToken) {
        try {
            String token = bearerToken.replace("Bearer ", "");
            int user_id = JWTUtils.getIdFromToken(token);

            CustomInvoice customInvoices = invoiceService.getCustomInvoice(user_id, invoice_id);
            return ResponseEntity.ok(customInvoices);
        } catch (CustomException exception) {
            Map<String, String> response = new HashMap<>();
            response.put("message", exception.getMessage());
            return new ResponseEntity<>(response, exception.getStatus());
        }
    }

    @PatchMapping("/invoices/{invoice_id}/paid")
    public ResponseEntity<?> changePaid(@PathVariable Integer invoice_id ,@RequestHeader("Authorization") String bearerToken) {
        try {
            String token = bearerToken.replace("Bearer ", "");
            int user_id = JWTUtils.getIdFromToken(token);

            invoiceService.changePaid(user_id, invoice_id);
            return new ResponseEntity<>("Estado de la factura cambiado", HttpStatus.NO_CONTENT);
        } catch (CustomException exception) {
            Map<String, String> response = new HashMap<>();
            response.put("message", exception.getMessage());
            return new ResponseEntity<>(response, exception.getStatus());
        }
    }

    @PatchMapping("/invoices/{invoice_id}")
    public ResponseEntity<?> editInvoice(@PathVariable Integer invoice_id ,@RequestHeader("Authorization") String bearerToken, @RequestBody Invoice invoice) {
        try {
            String token = bearerToken.replace("Bearer ", "");
            int user_id = JWTUtils.getIdFromToken(token);

            invoiceService.editInvoice(user_id, invoice_id, invoice);
            return new ResponseEntity<>("Factura editada", HttpStatus.NO_CONTENT);
        } catch (CustomException exception) {
            Map<String, String> response = new HashMap<>();
            response.put("message", exception.getMessage());
            return new ResponseEntity<>(response, exception.getStatus());
        }
    }
}
