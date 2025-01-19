package hosteleria_proyect.api.entitys;

import hosteleria_proyect.api.customEntitys.CategoryColor;
import jakarta.persistence.*;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@Table(name = "product_categories")
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode
public class CategoryProduct {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer category_id;
    private String category_name;
    private Integer user_id;

    @Enumerated(EnumType.STRING)
    private CategoryColor color;
}
