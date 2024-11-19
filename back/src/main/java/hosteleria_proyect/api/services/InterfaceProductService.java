package hosteleria_proyect.api.services;

import hosteleria_proyect.api.entitys.Product;

import java.util.List;

public interface InterfaceProductService {
    public List<Product> getProducts();

    public  Product getProductById(Integer product_id);

    public void saveProduct(Product product);

    public void deleteProduct(Product product);
}
