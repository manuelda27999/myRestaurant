package hosteleria_proyect.api.services;

import hosteleria_proyect.api.entitys.Table;
import hosteleria_proyect.api.error.CustomException;
import hosteleria_proyect.api.interfaces.TableInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TableService implements InterfaceTableService {

    @Autowired
    private TableInterface tableInterface;

    @Override
    public List<Table> getTables(Integer user_id) {
        List<Table> tables = tableInterface.findAllByUser_id(user_id);

        if (tables.isEmpty()) throw new CustomException(HttpStatus.NOT_FOUND, "Ninguna mesa encontrada en la base de datos");

        tables.forEach(table -> table.setUser_id(null));

        return tables;
    }

    @Override
    public Table getTableById(Integer table_id, Integer user_id) {
        Table table = tableInterface.findById(table_id).orElse(null);

        if (table == null) throw new CustomException(HttpStatus.NOT_FOUND, "Mesa no encontrada");
        if (!table.getUser_id().equals(user_id)) throw new CustomException(HttpStatus.UNPROCESSABLE_ENTITY, "Esta mesa no pertenece a este usuario");

        table.setUser_id(null);

        return table;
    }

    @Override
    public void createTable(Table table, Integer user_id) {
        Table repeatTable = tableInterface.findByTable_name(table.getTable_name(), user_id).orElse(null);

        if (repeatTable != null) throw new CustomException(HttpStatus.UNPROCESSABLE_ENTITY, "Este nombre de mesa ya está siendo utilizado");

        table.setUser_id(user_id);
        tableInterface.save(table);
    }

    @Override
    public void editTable(Table table, Integer table_id, Integer user_id) {
        Table tableToEdit = tableInterface.findById(table_id).orElse(null);
        Table repeatedTable = tableInterface.findByTable_name(table.getTable_name(), user_id).orElse(null);

        if (tableToEdit == null) throw new CustomException(HttpStatus.NOT_FOUND, "Mesa no encontrada");
        if (repeatedTable != null && !repeatedTable.getTable_id().equals(table_id)) throw new CustomException(HttpStatus.UNPROCESSABLE_ENTITY, "Este nombre ya está siendo utilizado en otra mesa");
        if (!tableToEdit.getUser_id().equals(user_id)) throw new CustomException(HttpStatus.UNPROCESSABLE_ENTITY, "Esta mesa no pertenece a este usuario");

        tableToEdit.setTable_name(table.getTable_name());
        tableToEdit.setAvailable(table.getAvailable());

        tableInterface.save(tableToEdit);
    }

    @Override
    public void deleteTable(Integer table_id, Integer user_id) {
        Table tableToDelete = tableInterface.findById(table_id).orElse(null);

        if (tableToDelete == null) throw new CustomException(HttpStatus.NOT_FOUND, "Mesa no encontrada");
        if (!tableToDelete.getUser_id().equals(user_id)) throw new CustomException(HttpStatus.UNPROCESSABLE_ENTITY, "Esta mesa no pertenece a este usuario");

        tableInterface.delete(tableToDelete);
    }


}
