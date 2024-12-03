package hosteleria_proyect.api.controllers;

import hosteleria_proyect.api.entitys.User;
import hosteleria_proyect.api.error.CustomException;
import hosteleria_proyect.api.services.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
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
    public ResponseEntity<Object> getUserByEmailAndPassword(@RequestBody Map<String, Object> requestBody) throws CustomException {
        try {
            String email = (String) requestBody.get("email");
            String password = (String) requestBody.get("password");

            int userId = userService.getUserIdByEmailAndPassword(email, password);
            Map<String, Integer> result = new HashMap<String, Integer>();
            result.put("userId", userId);

            return ResponseEntity.ok(result);
        } catch (CustomException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found or bad credentials");
        }
    }

    @GetMapping("/users/{id}")
    public User getUserById(@PathVariable Integer id) throws CustomException {
        User user = userService.getUserById(id);

        return user;
    }

    @GetMapping("/users/name/{id}")
    public ResponseEntity<Object> getNameById(@PathVariable Integer id) throws CustomException {
        try {
            String name = userService.getNameById(id);
            Map<String, String> result = new HashMap<String, String>();
            result.put("name", name);

            return ResponseEntity.ok(result);
        } catch (CustomException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Name of user with this id not found");
        }
    }

    @PostMapping("/users")
    public void saveUser(@RequestBody User newOrUpdateUser) {
        userService.saveUser(newOrUpdateUser);
    }

    @DeleteMapping("/users/{id}")
    public void deleteUser(@PathVariable Integer id) throws CustomException {
        User user = userService.getUserById(id);
        userService.deleteUser(user);
    }
}
