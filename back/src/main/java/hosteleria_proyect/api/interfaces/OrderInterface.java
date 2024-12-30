package hosteleria_proyect.api.interfaces;

import hosteleria_proyect.api.entitys.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderInterface extends JpaRepository<Order, Integer> {

    @Query(value = "SELECT * FROM orders WHERE user_id = ?1", nativeQuery = true)
    List<Order> getOrdersByUserId(Integer user_id);

    @Query(value = "SELECT * FROM orders WHERE invoice_id = ?1", nativeQuery = true)
    List<Order> getOrdersByInvoiceId(Integer invoice_id);
}
