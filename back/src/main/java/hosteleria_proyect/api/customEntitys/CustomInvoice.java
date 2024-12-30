package hosteleria_proyect.api.customEntitys;

import lombok.*;

import java.sql.Timestamp;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class CustomInvoice {

    private Integer invoice_id;
    private Double total;
    private Timestamp invoice_date;
    private Boolean paid;
    private String table_name;
    private List<CustomOrder> orders;
}
