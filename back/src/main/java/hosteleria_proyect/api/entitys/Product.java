package hosteleria_proyect.api.entitys;

import jakarta.persistence.*;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@Table(name = "products")
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer product_id;
    private String product_name;
    private String description;
    private String ingredients;
    private String allergens;
    private Double price;
    private Integer user_id;
    private Integer category_id;
}
