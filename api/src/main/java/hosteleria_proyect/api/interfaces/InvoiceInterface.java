package hosteleria_proyect.api.interfaces;

import hosteleria_proyect.api.entitys.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InvoiceInterface extends JpaRepository<Invoice, Integer> {
}
