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
    private Integer table_id;
    private String table_name;
    private Integer product_id;
    private String product_name;
    private Integer quantity;
    private Double price;
    private Double total;
    private Timestamp order_date;
    private OrderStatus status;
    private Integer invoice_id;
}
