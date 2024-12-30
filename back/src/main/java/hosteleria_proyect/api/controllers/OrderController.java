package hosteleria_proyect.api.controllers;

import hosteleria_proyect.api.customEntitys.CustomOrder;
import hosteleria_proyect.api.entitys.Order;
import hosteleria_proyect.api.entitys.Product;
import hosteleria_proyect.api.error.CustomException;
import hosteleria_proyect.api.services.OrderService;
import hosteleria_proyect.api.utilities.JWTUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("myRestaurant")
@CrossOrigin(value = {"*"})
public class OrderController {

    @Autowired
    private OrderService orderService;

    @GetMapping("/orders/{order_id}")
    public ResponseEntity<?> getOrder(@PathVariable Integer order_id, @RequestHeader("Authorization") String bearerToken) {
        try {
            String token = bearerToken.replace("Bearer ", "");
            int user_id = JWTUtils.getIdFromToken(token);

            CustomOrder customOrder = orderService.getOrderById(user_id, order_id);
            return ResponseEntity.ok(customOrder);
        } catch (CustomException exception) {
            Map<String, String> response = new HashMap<>();
            response.put("message", exception.getMessage());
            return new ResponseEntity<>(response, exception.getStatus());
        }
    }

    @GetMapping("/orders")
    public ResponseEntity<?> getOrders(@RequestHeader("Authorization") String bearerToken) {
        try {
            String token = bearerToken.replace("Bearer ", "");
            int user_id = JWTUtils.getIdFromToken(token);

            List<CustomOrder> customOrders = orderService.getOrders(user_id);
            return ResponseEntity.ok(customOrders);
        } catch (CustomException exception) {
            Map<String, String> response = new HashMap<>();
            response.put("message", exception.getMessage());
            return new ResponseEntity<>(response, exception.getStatus());
        }
    }

    @PostMapping("/orders")
    public ResponseEntity<?> createOrder(@RequestHeader("Authorization") String bearerToken ,@RequestBody Order order) {
        try {
            String token = bearerToken.replace("Bearer ", "");
            int user_id = JWTUtils.getIdFromToken(token);

            orderService.createOrder(user_id, order);
            return new ResponseEntity<>("Pedido creado con éxito", HttpStatus.CREATED);
        } catch (CustomException exception) {
            Map<String, String> response = new HashMap<>();
            response.put("message", exception.getMessage());
            return new ResponseEntity<>(response, exception.getStatus());
        }
    }

    @PatchMapping("/orders/{order_id}")
    public ResponseEntity<?> editOrder(@RequestHeader("Authorization") String bearerToken, @PathVariable Integer order_id, @RequestBody Order order) {
        try {
            String token = bearerToken.replace("Bearer ", "");
            int user_id = JWTUtils.getIdFromToken(token);

            orderService.editOrder(user_id, order_id, order);
            return new ResponseEntity<>("Pedido editado con éxito", HttpStatus.NO_CONTENT);
        } catch (CustomException exception) {
            Map<String, String> response = new HashMap<>();
            response.put("message", exception.getMessage());
            return new ResponseEntity<>(response, exception.getStatus());
        }
    }

    @DeleteMapping("/orders/{order_id}")
    public ResponseEntity<?> deleteOrder(@PathVariable Integer order_id, @RequestHeader("Authorization") String bearerToken) {
        try {
            String token = bearerToken.replace("Bearer ", "");
            int user_id = JWTUtils.getIdFromToken(token);

            orderService.deleteOrder(user_id, order_id);
            return new ResponseEntity<>("Pedido eliminado", HttpStatus.NO_CONTENT);
        } catch (CustomException exception) {
            Map<String, String> response = new HashMap<>();
            response.put("message", exception.getMessage());
            return new ResponseEntity<>(response, exception.getStatus());
        }
    }
}
