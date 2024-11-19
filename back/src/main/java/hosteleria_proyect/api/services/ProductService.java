package hosteleria_proyect.api.services;

import hosteleria_proyect.api.entitys.Product;
import hosteleria_proyect.api.interfaces.ProductInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService implements InterfaceProductService{

    @Autowired
    private ProductInterface productInterface;

    @Override
    public List<Product> getProducts() {
        List<Product> products= productInterface.findAll();
        return products;
    }

    @Override
    public Product getProductById(Integer product_id) {
        Product product = productInterface.findById(product_id).orElse(null);
        return product;
    }

    @Override
    public void saveProduct(Product product) {
        productInterface.save(product);
    }

    @Override
    public void deleteProduct(Product product) {
        productInterface.delete(product);
    }
}
