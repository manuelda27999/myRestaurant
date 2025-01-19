package hosteleria_proyect.api.interfaces;

import hosteleria_proyect.api.entitys.CategoryProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface CategoryInterface extends JpaRepository<CategoryProduct, Integer> {

    @Query(value = "SELECT * FROM product_categories WHERE user_id = ?1", nativeQuery = true)
    List<CategoryProduct> findAllByUserId(Integer user_id);

    @Query(value = "SELECT * FROM product_categories WHERE category_name = ?1 AND user_id = ?2", nativeQuery = true)
    Optional<CategoryProduct> findByCategory_name(String table_name, Integer user_id);
}
