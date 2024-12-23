package hosteleria_proyect.api.controllers;

import hosteleria_proyect.api.entitys.CategoryProduct;
import hosteleria_proyect.api.error.CustomException;
import hosteleria_proyect.api.services.CategoryService;
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
public class CategoryController {

    @Autowired
    private CategoryService categoryProductService;

    @GetMapping("/categoryProduct")
    public ResponseEntity<?> getCategories(@RequestHeader("Authorization") String bearerToken) {
        try {
            String token = bearerToken.replace("Bearer ", "");
            int user_id = JWTUtils.getIdFromToken(token);

            List<CategoryProduct> categories = categoryProductService.getCategories(user_id);
            return ResponseEntity.ok(categories);
        } catch (CustomException exception) {
            Map<String, String> response = new HashMap<>();
            response.put("message", exception.getMessage());
            return new ResponseEntity<>(response, exception.getStatus());
        }
    }

    @GetMapping("/categoryProduct/{category_id}")
    public ResponseEntity<?> getCategory(@PathVariable Integer category_id, @RequestHeader("Authorization") String bearerToken) {
        try {
            String token = bearerToken.replace("Bearer ", "");
            int user_id = JWTUtils.getIdFromToken(token);

            CategoryProduct category = categoryProductService.getCategory(user_id, category_id);
            return ResponseEntity.ok(category);
        } catch (CustomException exception) {
            Map<String, String> response = new HashMap<>();
            response.put("message", exception.getMessage());
            return new ResponseEntity<>(response, exception.getStatus());
        }
    }

    @PostMapping("/categoryProduct/")
    public ResponseEntity<?> createCategory(@RequestHeader("Authorization") String bearerToken, @RequestBody CategoryProduct category) {
        try {
            String token = bearerToken.replace("Bearer ", "");
            int user_id = JWTUtils.getIdFromToken(token);

            categoryProductService.createCategory(user_id, category);
            return new ResponseEntity<>("Categoría creada con éxito", HttpStatus.CREATED);
        } catch (CustomException exception) {
            Map<String, String> response = new HashMap<>();
            response.put("message", exception.getMessage());
            return new ResponseEntity<>(response, exception.getStatus());
        }
    }

    @PatchMapping("/categoryProduct/{category_id}")
    public ResponseEntity<?> editCategory(@PathVariable Integer category_id,@RequestHeader("Authorization") String bearerToken, @RequestBody CategoryProduct category) {
        try {
            String token = bearerToken.replace("Bearer ", "");
            int user_id = JWTUtils.getIdFromToken(token);

            categoryProductService.editCategory(user_id, category_id, category);
            return new ResponseEntity<>("Categoría editada con éxito", HttpStatus.NO_CONTENT);
        } catch (CustomException exception) {
            Map<String, String> response = new HashMap<>();
            response.put("message", exception.getMessage());
            return new ResponseEntity<>(response, exception.getStatus());
        }
    }

    @DeleteMapping("/categoryProduct/{category_id}")
    public ResponseEntity<?> deleteCategory(@PathVariable Integer category_id, @RequestHeader("Authorization") String bearerToken) {
        try {
            String token = bearerToken.replace("Bearer ", "");
            int user_id = JWTUtils.getIdFromToken(token);

            categoryProductService.deleteCategory(user_id, category_id);
            return new ResponseEntity<>("Categoría eliminada", HttpStatus.NO_CONTENT);
        } catch (CustomException exception) {
            Map<String, String> response = new HashMap<>();
            response.put("message", exception.getMessage());
            return new ResponseEntity<>(response, exception.getStatus());
        }
    }
}
