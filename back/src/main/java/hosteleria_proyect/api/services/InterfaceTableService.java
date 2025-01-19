package hosteleria_proyect.api.services;

import hosteleria_proyect.api.entitys.Table;

import java.util.List;

public interface InterfaceTableService {
    public List<Table> getTables(Integer user_id);

    public Table getTableById(Integer table_id, Integer user_id);

    public void createTable(Table table, Integer user_id);

    public void editTable(Table table, Integer table_id, Integer user_id);

    public void deleteTable(Integer table_id, Integer user_id);
}
