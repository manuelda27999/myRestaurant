package hosteleria_proyect.api.services;

import hosteleria_proyect.api.entitys.Product;

import java.util.List;

public interface InterfaceProductService {
    public  Product getProductById(Integer user_id, Integer product_id);

    public List<Product> getProductsByCategoryId(Integer user_id, Integer category_id);

    public void createProduct(Integer user_id, Integer category_id, Product product);

    public void editProduct(Integer user_id, Integer product_id, Product product);

    public void deleteProduct(Integer product_id, Integer user_id);
}
