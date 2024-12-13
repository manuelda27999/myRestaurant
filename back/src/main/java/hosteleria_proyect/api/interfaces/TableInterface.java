package hosteleria_proyect.api.interfaces;

import hosteleria_proyect.api.entitys.Table;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TableInterface extends JpaRepository<Table, Integer> {

    @Query(value = "SELECT * FROM tables WHERE user_id = ?1", nativeQuery = true)
    List<Table> findAllByUser_id(Integer user_id);

    @Query(value = "SELECT * FROM tables WHERE table_name = ?1 AND user_id = ?2", nativeQuery = true)
    Optional<Table> findByTable_name(String table_name, Integer user_id);
}
