package hosteleria_proyect.api.services;

import hosteleria_proyect.api.entitys.Table;

import java.util.List;

public interface InterfaceTableService {
    public List<Table> getTables();

    public Table getTablesById(Integer table_id);

    public void safeTable(Table table);

    public void deleteTable(Table table);
}
