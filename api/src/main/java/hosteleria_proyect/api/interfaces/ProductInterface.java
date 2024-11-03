package hosteleria_proyect.api.interfaces;

import hosteleria_proyect.api.entitys.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductInterface extends JpaRepository<Product, Integer> {
}
