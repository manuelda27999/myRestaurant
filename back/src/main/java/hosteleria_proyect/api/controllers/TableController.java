package hosteleria_proyect.api.controllers;

import hosteleria_proyect.api.entitys.Table;
import hosteleria_proyect.api.error.CustomException;
import hosteleria_proyect.api.services.TableService;
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
@RequestMapping("myRestaurant")
@CrossOrigin(value = {"*"})
public class TableController {

    @Autowired
    private TableService tableService;

    @GetMapping("/tables")
    public ResponseEntity<?> getTables(@RequestHeader("Authorization") String bearerToken) {
        try {
            String token = bearerToken.replace("Bearer ", "");
            int user_id = JWTUtils.getIdFromToken(token);

            List<Table> tables = tableService.getTables(user_id);
            return ResponseEntity.ok(tables);
        } catch (CustomException exception) {
            Map<String, String> response = new HashMap<>();
            response.put("message", exception.getMessage());
            return new ResponseEntity<>(response, exception.getStatus());
        }
    }

    @GetMapping("/tables/{table_id}")
    public ResponseEntity<?> getTableById(@PathVariable Integer table_id, @RequestHeader("Authorization") String bearerToken) {
        try {
            String token = bearerToken.replace("Bearer ", "");
            int user_id = JWTUtils.getIdFromToken(token);

            Table table = tableService.getTableById(table_id, user_id);
            return ResponseEntity.ok(table);
        } catch (CustomException exception) {
            Map<String, String> response = new HashMap<>();
            response.put("message", exception.getMessage());
            return new ResponseEntity<>(response, exception.getStatus());
        }
    }

    @PostMapping("/tables")
    public ResponseEntity<?> createTable(@RequestBody Table table, @RequestHeader("Authorization") String bearerToken) {
        try {
            String token = bearerToken.replace("Bearer ", "");
            int user_id = JWTUtils.getIdFromToken(token);

            tableService.createTable(table, user_id);
            return new ResponseEntity<>("Mesa creada con éxito", HttpStatus.CREATED);
        } catch (CustomException exception) {
            Map<String, String> response = new HashMap<>();
            response.put("message", exception.getMessage());
            return new ResponseEntity<>(response, exception.getStatus());
        }
    }

    @PatchMapping("/tables/{table_id}")
    public ResponseEntity<?> editTable(@RequestBody Table table, @RequestHeader("Authorization") String bearerToken, @PathVariable Integer table_id) {
        try {
            String token = bearerToken.replace("Bearer ", "");
            int user_id = JWTUtils.getIdFromToken(token);

            tableService.editTable(table, table_id, user_id);
            return new ResponseEntity<>("Mesa actualizada con éxito", HttpStatus.NO_CONTENT);
        } catch (CustomException exception) {
            Map<String, String> response = new HashMap<>();
            response.put("message", exception.getMessage());
            return new ResponseEntity<>(response, exception.getStatus());
        }
    }

    @DeleteMapping("/tables/{table_id}")
    public ResponseEntity<?> deleteTable(@PathVariable Integer table_id, @RequestHeader("Authorization") String bearerToken) {
        try {
            String token = bearerToken.replace("Bearer ", "");
            int user_id = JWTUtils.getIdFromToken(token);

            tableService.deleteTable(table_id, user_id);
            return new ResponseEntity<>("Mesa eliminada", HttpStatus.NO_CONTENT);
        } catch (CustomException exception) {
            Map<String, String> response = new HashMap<>();
            response.put("message", exception.getMessage());
            return new ResponseEntity<>(response, exception.getStatus());
        }
    }
}
