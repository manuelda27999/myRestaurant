package hosteleria_proyect.api.controllers;

import hosteleria_proyect.api.entitys.User;
import hosteleria_proyect.api.error.MyException;
import hosteleria_proyect.api.services.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("hosteleria-proyect") //Establece parte de la ruta para hacer las peticiones -> Quedaría de la siguiente forma: http://localhost:8080/hosteleria-proyect/...
@CrossOrigin(value = {"*"}) //Notación para hacer peticiones desde el front-end, puerto 3000
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserService userService;

    //http://192.168.1.129:8080/hosteleria-proyect/users
    @GetMapping("/users")
    public List<User> getUsers() {
        var users = userService.getUsers();
        return users;
    }

    @PostMapping("/users/auth")
    public User getUserByEmailAndPassword(@RequestBody Map<String, Object> requestBody) throws MyException {
        String email = (String) requestBody.get("email");
        String password = (String) requestBody.get("password");

        System.out.println("Este es el email: " + email);
        System.out.println("Esta es la contraseña: " + password);

        var user = userService.getUserByEmailAndPassword(email, password);

        System.out.println("Este es el usuario: " + user);

        return user;
    }

    @GetMapping("/users/{id}")
    public User getUserById(@PathVariable Integer id) throws MyException {
        User user = userService.getUserById(id);

        return user;
    }

    @PostMapping("/users")
    public void saveUser(@RequestBody User newOrUpdateUser) {
        userService.saveUser(newOrUpdateUser);
    }

    @DeleteMapping("/users/{id}")
    public void deleteUser(@PathVariable Integer id) throws MyException {
        User user = userService.getUserById(id);
        userService.deleteUser(user);
    }
}
