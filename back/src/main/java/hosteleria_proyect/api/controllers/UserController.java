package hosteleria_proyect.api.controllers;

import hosteleria_proyect.api.entitys.User;
import hosteleria_proyect.api.error.CustomException;
import hosteleria_proyect.api.services.UserService;
import hosteleria_proyect.api.utilities.JWTUtils;
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
@RequestMapping("myRestaurant") //Establece parte de la ruta para hacer las peticiones -> Quedaría de la siguiente forma: http://localhost:8080/hosteleria-proyect/...
@CrossOrigin(value = {"*"}) //Notación para hacer peticiones desde el front-end, puerto 3000
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserService userService;

    //http://192.168.1.129:8080/hosteleria-proyect/users
    //Pruebas
    @GetMapping("/users")
    public List<User> getUsers() {
        var users = userService.getUsers();
        return users;
    }

    @PostMapping("/users/auth")
    public ResponseEntity<Map<String, String>> getUserByEmailAndPassword(@RequestBody Map<String, Object> requestBody) throws CustomException {
        try {
            String email = (String) requestBody.get("email");
            String password = (String) requestBody.get("password");

            int userId = userService.getUserIdByEmailAndPassword(email, password);

            String token = JWTUtils.generateToken(userId);

            Map<String, String> result = new HashMap<String, String>();
            result.put("token", token);

            return ResponseEntity.ok(result);
        } catch (CustomException exception) {
            Map<String, String> response = new HashMap<>();
            response.put("message", exception.getMessage());
            return new ResponseEntity<>(response, exception.getStatus());
        }
    }

    //Pruebas
    @GetMapping("/users/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Integer id) throws CustomException {
        try {
            User user = userService.getUserById(id);
            return new ResponseEntity<>(user, HttpStatus.OK);
        } catch (CustomException exception) {
            Map<String, String> response = new HashMap<>();
            response.put("message", exception.getMessage());
            return new ResponseEntity<>(response, exception.getStatus());
        }
    }

    @GetMapping("/users/name/")
    public ResponseEntity<Object> getNameById(@RequestHeader("Authorization") String bearerToken) throws CustomException {
        try {
            String token = bearerToken.replace("Bearer ", "");
            int user_id = JWTUtils.getIdFromToken(token);

            String name = userService.getNameById(user_id);
            Map<String, String> result = new HashMap<String, String>();
            result.put("name", name);

            return ResponseEntity.ok(result);
        } catch (CustomException exception) {
            Map<String, String> response = new HashMap<>();
            response.put("message", exception.getMessage());
            return new ResponseEntity<>(response, exception.getStatus());        }
    }

    @PostMapping("/users")
    public ResponseEntity<?> createUser(@RequestBody User newUser) {
        try {
            userService.saveUser(newUser);
            return new ResponseEntity<>("User created successfully", HttpStatus.CREATED);
        } catch (CustomException exception) {
            Map<String, String> response = new HashMap<>();
            response.put("message", exception.getMessage());
            return new ResponseEntity<>(response, exception.getStatus());
        }
    }

    @PatchMapping("/users/")
    public ResponseEntity<Map<String, String>> updateNameUser(@RequestHeader("Authorization") String bearerToken, @RequestBody User updateUser) {
        try {
            String token = bearerToken.replace("Bearer ", "");
            int user_id = JWTUtils.getIdFromToken(token);

            userService.updateNameUser(user_id, updateUser);

            Map<String, String> response = new HashMap<>();
            response.put("message", "User update successfully");
            return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
        } catch (CustomException exception) {
            Map<String, String> response = new HashMap<>();
            response.put("message", exception.getMessage());
            return new ResponseEntity<>(response, exception.getStatus());
        }
    }

    @PatchMapping("users/changePassword")
    public ResponseEntity<Map<String, String>> updatePassword(@RequestHeader("Authorization") String bearerToken, @RequestBody Map<String, String> payload ) {
        try {
            String token = bearerToken.replace("Bearer ", "");
            int user_id = JWTUtils.getIdFromToken(token);

            userService.updatePasswordUser(user_id, payload);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Password change successfully");
            return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
        } catch (CustomException exception) {
            Map<String, String> response = new HashMap<>();
            response.put("message", exception.getMessage());
            return new ResponseEntity<>(response, exception.getStatus());
        }
    }

    //Pruebas
    @DeleteMapping("/users/{id}")
    public void deleteUser(@PathVariable Integer id) throws CustomException {
        User user = userService.getUserById(id);
        userService.deleteUser(user);
    }
}
