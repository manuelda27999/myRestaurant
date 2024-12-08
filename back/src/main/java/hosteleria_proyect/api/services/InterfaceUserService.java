package hosteleria_proyect.api.services;

import hosteleria_proyect.api.entitys.User;
import hosteleria_proyect.api.error.CustomException;

import java.util.List;
import java.util.Map;

public interface InterfaceUserService {
    public List<User> getUsers();  //Para obtener todos los usuarios

    public int getUserIdByEmailAndPassword(String email, String password) throws CustomException;

    public String getNameById(Integer user_id) throws CustomException;

    public User getUserById(Integer user_id) throws CustomException;  //Para obtener un solo usuario a través de su Id

    public void saveUser(User user);//Para crear un usuario

    public void updateNameUser(Integer user_id, User user);//Para crear actualizar un usuario

    public void updatePasswordUser(Integer user_id, Map<String, String> payload);//Para crear actualizar un usuario

    public void deleteUser(User user);  //Para eliminar un cliente
}
