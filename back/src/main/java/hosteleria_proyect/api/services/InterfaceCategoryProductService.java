package hosteleria_proyect.api.services;

import hosteleria_proyect.api.entitys.CategoryProduct;

import java.util.List;

public interface InterfaceCategoryProductService {
    public List<CategoryProduct> getCategories(Integer user_id);

    public CategoryProduct getCategory(Integer user_id, Integer category_id);

    public void createCategory(Integer user_id, CategoryProduct categoryProduct);

    public void editCategory(Integer user_id, Integer category_id, CategoryProduct categoryProduct);

    public void deleteCategory(Integer user_id, Integer category_id);
}
