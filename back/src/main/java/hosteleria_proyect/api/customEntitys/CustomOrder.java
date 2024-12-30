package hosteleria_proyect.api.customEntitys;

import lombok.*;

import java.sql.Timestamp;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode
public class CustomOrder {
    private Integer order_id;
    private String product_name;
    private Double price;
    private Integer quantity;
    private Double total;
    private Timestamp order_date;
}
