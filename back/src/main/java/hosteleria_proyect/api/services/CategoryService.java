package hosteleria_proyect.api.services;

import hosteleria_proyect.api.entitys.CategoryProduct;
import hosteleria_proyect.api.error.CustomException;
import hosteleria_proyect.api.interfaces.CategoryInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService implements InterfaceCategoryService {

    @Autowired
    private CategoryInterface categoryInterface;

    @Override
    public List<CategoryProduct> getCategories(Integer user_id) {
        List<CategoryProduct> categories = categoryInterface.findAllByUserId(user_id);

        categories.forEach(category -> category.setUser_id(null));

        return categories;
    }

    @Override
    public CategoryProduct getCategory(Integer user_id, Integer category_id) {
        CategoryProduct category = categoryInterface.findById(category_id).orElse(null);

        if (category == null) throw new CustomException(HttpStatus.NOT_FOUND, "Categoría no encontrada");
        if (!category.getUser_id().equals(user_id)) throw new CustomException(HttpStatus.UNPROCESSABLE_ENTITY, "Esta categoría no pertenece a este usuario");

        category.setUser_id(null);

        return category;
    }

    @Override
    public void createCategory(Integer user_id, CategoryProduct category) {
        CategoryProduct repeatCategory = categoryInterface.findByCategory_name(category.getCategory_name(), user_id).orElse(null);

        if (repeatCategory != null) throw new CustomException(HttpStatus.UNPROCESSABLE_ENTITY, "Este nombre de categoría ya está siendo utilizado");

        category.setUser_id(user_id);
        categoryInterface.save(category);
    }

    @Override
    public void editCategory(Integer user_id, Integer category_id, CategoryProduct category) {
        CategoryProduct categoryToEdit = categoryInterface.findById(category_id).orElse(null);
        CategoryProduct repeatedCategory = categoryInterface.findByCategory_name(category.getCategory_name(), user_id).orElse(null);

        if (categoryToEdit == null) throw new CustomException(HttpStatus.NOT_FOUND, "Categoría no encontrada");
        if (repeatedCategory != null) throw new CustomException(HttpStatus.UNPROCESSABLE_ENTITY, "Este nombre ya está siendo utilizado en otra categoría");
        if (!categoryToEdit.getUser_id().equals(user_id)) throw new CustomException(HttpStatus.UNPROCESSABLE_ENTITY, "Esta categoría no pertenece a este usuario");

        categoryToEdit.setCategory_name(category.getCategory_name());

        categoryInterface.save(category);
    }

    @Override
    public void deleteCategory(Integer user_id, Integer category_id) {
        CategoryProduct categoryToDelete = categoryInterface.findById(category_id).orElse(null);

        if (categoryToDelete == null) throw new CustomException(HttpStatus.NOT_FOUND, "Categoría no encontrada");
        if (!categoryToDelete.getUser_id().equals(user_id)) throw new CustomException(HttpStatus.UNPROCESSABLE_ENTITY, "Esta categoría no pertenece a este usuario");

        categoryInterface.delete(categoryToDelete);
    }
}
