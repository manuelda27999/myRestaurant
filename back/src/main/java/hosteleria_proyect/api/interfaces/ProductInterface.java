package hosteleria_proyect.api.interfaces;

import hosteleria_proyect.api.entitys.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductInterface extends JpaRepository<Product, Integer> {

    @Query(value = "SELECT * FROM products WHERE product_name = ?1 AND user_id = ?2", nativeQuery = true)
    Optional<Product> findByProduct_name(String product_name, Integer user_id);

    @Query(value = "SELECT * FROM products WHERE user_id = ?1 AND category_id = ?2", nativeQuery = true)
    List<Product> findAllByCategoryId(Integer user_id, Integer category_id);
}
