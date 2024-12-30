package hosteleria_proyect.api.entitys;

import hosteleria_proyect.api.customEntitys.OrderStatus;
import jakarta.persistence.*;
import jakarta.persistence.Table;
import lombok.*;

import java.sql.Timestamp;

@Entity
@Table(name = "orders")
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer order_id;
    private Integer quantity;
    private Integer table_id;
    private Integer product_id;
    private Integer invoice_id;
    private Integer user_id;
    private Timestamp order_date;

    @Enumerated(EnumType.STRING)
    private OrderStatus status;
}


