package hosteleria_proyect.api.controllers;

import hosteleria_proyect.api.entitys.Table;
import hosteleria_proyect.api.services.TableService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("hosteleria-proyect")
@CrossOrigin(value = "http://localhost:3000")
public class TableController {

    private static final Logger logger = LoggerFactory.getLogger(TableController.class);

    @Autowired
    private TableService tableService;

    @GetMapping("/tables")
    public List<Table> getTables() {
        var tables = tableService.getTables();
        tables.forEach(table -> logger.info(table.toString()));
        return tables;
    }

    @GetMapping("/tables/{id}")
    public Table getTableById(@PathVariable Integer id) {
        Table table = tableService.getTablesById(id);
        return table;
    }

    @PostMapping("/tables")
    public void saveTable(@RequestBody Table table) {
        tableService.safeTable(table);
    }

    @DeleteMapping("/tables/{id}")
    public void deleteTable(@PathVariable Integer id) {
        Table table = tableService.getTablesById(id);
        tableService.deleteTable(table);
    }
}
