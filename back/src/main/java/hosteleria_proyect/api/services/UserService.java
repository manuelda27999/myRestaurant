package hosteleria_proyect.api.services;

import hosteleria_proyect.api.entitys.User;
import hosteleria_proyect.api.error.CustomException;
import hosteleria_proyect.api.interfaces.UserInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

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
    public int getUserIdByEmailAndPassword(String email, String password) throws CustomException {
        User user = userInterface.findByEmail(email).orElse(null);

        if (user == null) throw new CustomException(HttpStatus.NOT_FOUND, "User not found");

        if (password.equals(user.getPassword())) {
            return user.getUser_id();
        } else {
            throw  new CustomException(HttpStatus.UNAUTHORIZED,"Invalid password");
        }
    }

    @Override
    public String getNameById(Integer user_id) throws CustomException {
        User user = userInterface.findById(user_id).orElseThrow(() -> new CustomException(HttpStatus.NOT_FOUND, "User not found"));

        return user.getName();
    }

    @Override
    public User getUserById(Integer user_id) throws CustomException {
        User user = userInterface.findById(user_id).orElse(null);

        if (user == null) throw new CustomException(HttpStatus.NOT_FOUND,"User not found");

        return user;
    }


    @Override
    public void saveUser(User user) {
        User findUser = userInterface.findByEmail(user.getEmail()).orElse(null);

        if (findUser == null ) {
            userInterface.save(user);
        } else {
            throw new CustomException(HttpStatus.CONFLICT, "This email is not available");
        }
    }

    @Override
    public void updateNameUser(Integer user_id, User updateUser) {
        User user = userInterface.findById(user_id).orElse(null);

        if (user == null ) throw new CustomException(HttpStatus.NOT_FOUND, "User not found");
        if(updateUser.getName() == null) throw new CustomException(HttpStatus.UNPROCESSABLE_ENTITY, "Name to change not found");
        if(updateUser.getName().isEmpty()) throw new CustomException(HttpStatus.UNPROCESSABLE_ENTITY, "Name is empty");

        user.setName(updateUser.getName());
        userInterface.save(user);
    }

    @Override
    public void updatePasswordUser(Integer user_id, Map<String, String> payload) {
        String lastPassword = payload.get("lastPassword");
        String newPassword = payload.get("newPassword");
        String newPasswordRepeat = payload.get("newPasswordRepeat");

        User user = userInterface.findById(user_id).orElse(null);

        if (user == null ) throw new CustomException(HttpStatus.NOT_FOUND, "User not found");

        if(lastPassword.isEmpty()) throw new CustomException(HttpStatus.UNPROCESSABLE_ENTITY, "Currect password is empty");
        if(newPassword.isEmpty()) throw new CustomException(HttpStatus.UNPROCESSABLE_ENTITY, "New password is empty");
        if(newPasswordRepeat.isEmpty()) throw new CustomException(HttpStatus.UNPROCESSABLE_ENTITY, "New password is empty");

        if (!user.getPassword().equals(lastPassword)) throw new CustomException(HttpStatus.UNAUTHORIZED, "Incorrect current password");
        if ((!newPassword.equals(newPasswordRepeat))) throw new CustomException(HttpStatus.UNPROCESSABLE_ENTITY, "The new password is not the same");
        if (lastPassword.equals(newPassword)) throw new CustomException(HttpStatus.UNPROCESSABLE_ENTITY, "The current password and the new password are the same");

        user.setPassword(newPassword);

        userInterface.save(user);
    }

    @Override
    public void deleteUser(User user) {
        userInterface.delete(user);
    }
}
