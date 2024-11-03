package hosteleria_proyect.api.services;

import hosteleria_proyect.api.entitys.User;
import hosteleria_proyect.api.interfaces.UserInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService implements InterfaceUserService{

    @Autowired
    private UserInterface userInterface;

    @Override
    public List<User> getUsers() {
        List<User> users = userInterface.findAll();
        return users;
    }

    @Override
    public User getUserByEmailAndPassword(String email, String password) {
        User user = userInterface.findByEmail(email).orElse(null);

        if (user != null && password.equals(user.getPassword())) {
            return user;
        } else {
            return null;
        }
    }

    @Override
    public User getUserById(Integer user_id) {
        User user = userInterface.findById(user_id).orElse(null);
        return user;
    }

    @Override
    public void saveUser(User user) {
        userInterface.save(user);
    }

    @Override
    public void deleteUser(User user) {
        userInterface.delete(user);
    }
}
