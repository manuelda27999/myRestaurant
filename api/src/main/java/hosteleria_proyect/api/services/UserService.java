package hosteleria_proyect.api.services;

import hosteleria_proyect.api.entitys.User;
import hosteleria_proyect.api.error.MyException;
import hosteleria_proyect.api.interfaces.UserInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService implements InterfaceUserService {

    @Autowired
    private UserInterface userInterface;

    @Override
    public List<User> getUsers() {
        List<User> users = userInterface.findAll();
        return users;
    }

    @Override
    public User getUserByEmailAndPassword(String email, String password) throws MyException {
        User user = userInterface.findByEmail(email).orElse(null);

        if (user == null) throw new MyException("User not found");

        if (password.equals(user.getPassword())) {
            return user;
        } else {
            throw  new MyException("Invalid password");
        }
    }

    @Override
    public User getUserById(Integer user_id) throws MyException {
        User user = userInterface.findById(user_id).orElse(null);

        if (user == null) throw new MyException("User not found");

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
