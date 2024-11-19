package hosteleria_proyect.api.services;

import hosteleria_proyect.api.entitys.Table;
import hosteleria_proyect.api.interfaces.TableInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TableService implements InterfaceTableService {

    @Autowired
    private TableInterface tableInterface;

    @Override
    public List<Table> getTables() {
        List<Table> tables = tableInterface.findAll();
        return tables;
    }

    @Override
    public Table getTablesById(Integer table_id) {
        Table table = tableInterface.findById(table_id).orElse(null);
        return table;
    }

    @Override
    public void safeTable(Table table) {
        tableInterface.save(table);
    }

    @Override
    public void deleteTable(Table table) {
        tableInterface.delete(table);
    }
}
