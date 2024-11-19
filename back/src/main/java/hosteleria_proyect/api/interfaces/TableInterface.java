package hosteleria_proyect.api.interfaces;

import hosteleria_proyect.api.entitys.Table;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TableInterface extends JpaRepository<Table, Integer> {


}
