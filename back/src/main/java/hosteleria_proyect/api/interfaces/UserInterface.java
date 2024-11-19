package hosteleria_proyect.api.interfaces;

import hosteleria_proyect.api.entitys.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserInterface extends JpaRepository<User, Integer> {
    //@Query(value = "SELECT * FROM user WHERE email = ?1;")
    Optional<User> findByEmail(String email);
}
