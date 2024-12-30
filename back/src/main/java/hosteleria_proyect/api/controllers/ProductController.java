package hosteleria_proyect.api.controllers;

import hosteleria_proyect.api.entitys.Product;
import hosteleria_proyect.api.error.CustomException;
import hosteleria_proyect.api.services.ProductService;
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
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping("/products/{product_id}/one")
    public ResponseEntity<?> getProduct(@PathVariable Integer product_id, @RequestHeader("Authorization") String bearerToken) {
        try {
            String token = bearerToken.replace("Bearer ", "");
            int user_id = JWTUtils.getIdFromToken(token);

            Product product = productService.getProductById(user_id, product_id);
            return ResponseEntity.ok(product);
        } catch (CustomException exception) {
            Map<String, String> response = new HashMap<>();
            response.put("message", exception.getMessage());
            return new ResponseEntity<>(response, exception.getStatus());
        }
    }

    @GetMapping("/products/{category_id}")
    public ResponseEntity<?> getProducts(@PathVariable Integer category_id, @RequestHeader("Authorization") String bearerToken) {
        try {
            String token = bearerToken.replace("Bearer ", "");
            int user_id = JWTUtils.getIdFromToken(token);

            List<Product> products = productService.getProductsByCategoryId(user_id, category_id);
            return ResponseEntity.ok(products);
        } catch (CustomException exception) {
            Map<String, String> response = new HashMap<>();
            response.put("message", exception.getMessage());
            return new ResponseEntity<>(response, exception.getStatus());
        }
    }

    @PostMapping("/products/{category_id}")
    public ResponseEntity<?> createProduct(@RequestHeader("Authorization") String bearerToken, @PathVariable Integer category_id ,@RequestBody Product product) {
        try {
            String token = bearerToken.replace("Bearer ", "");
            int user_id = JWTUtils.getIdFromToken(token);

            productService.createProduct(user_id, category_id, product);
            return new ResponseEntity<>("Producto creado con éxito", HttpStatus.CREATED);
        } catch (CustomException exception) {
            Map<String, String> response = new HashMap<>();
            response.put("message", exception.getMessage());
            return new ResponseEntity<>(response, exception.getStatus());
        }
    }

    @PatchMapping("/products/{product_id}")
    public ResponseEntity<?> editProduct(@PathVariable Integer product_id,@RequestHeader("Authorization") String bearerToken, @RequestBody Product product) {
        try {
            String token = bearerToken.replace("Bearer ", "");
            int user_id = JWTUtils.getIdFromToken(token);

            productService.editProduct(user_id, product_id, product);
            return new ResponseEntity<>("Producto editado con éxito", HttpStatus.NO_CONTENT);
        } catch (CustomException exception) {
            Map<String, String> response = new HashMap<>();
            response.put("message", exception.getMessage());
            return new ResponseEntity<>(response, exception.getStatus());
        }
    }

    @DeleteMapping("/products/{product_id}")
    public ResponseEntity<?> deleteProduct(@PathVariable Integer product_id, @RequestHeader("Authorization") String bearerToken) {
        try {
            String token = bearerToken.replace("Bearer ", "");
            int user_id = JWTUtils.getIdFromToken(token);

            productService.deleteProduct(product_id, user_id);
            return new ResponseEntity<>("Producto eliminado", HttpStatus.NO_CONTENT);
        } catch (CustomException exception) {
            Map<String, String> response = new HashMap<>();
            response.put("message", exception.getMessage());
            return new ResponseEntity<>(response, exception.getStatus());
        }
    }
}
