package hosteleria_proyect.api.interfaces;

import hosteleria_proyect.api.entitys.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@Repository
public interface InvoiceInterface extends JpaRepository<Invoice, Integer> {

    @Query(value = "SELECT * FROM invoices WHERE table_id = ?1 AND paid = 0", nativeQuery = true)
    Optional<Invoice> findInvoiceByTableIdAndPaidFalse(Integer table_id);

    @Query(value = "SELECT * FROM invoices WHERE user_id = ?1", nativeQuery = true)
    List<Invoice> findInvoicesByUserId(Integer user_id);

    /*@Query(value = "SELECT * FROM invoices WHERE table_id = ?1")
    Invoice findInvoicesByTableId(Integer table_id);*/
}
