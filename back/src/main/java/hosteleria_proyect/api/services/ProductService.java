package hosteleria_proyect.api.services;

import hosteleria_proyect.api.entitys.CategoryProduct;
import hosteleria_proyect.api.entitys.Product;
import hosteleria_proyect.api.error.CustomException;
import hosteleria_proyect.api.interfaces.ProductInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService implements InterfaceProductService{

    @Autowired
    private ProductInterface productInterface;


    @Override
    public Product getProductById(Integer user_id, Integer product_id) {
        Product product = productInterface.findById(product_id).orElse(null);

        if (product == null) throw new CustomException(HttpStatus.NOT_FOUND, "Producto no encontrado");
        if (!product.getUser_id().equals(user_id)) throw new CustomException(HttpStatus.UNPROCESSABLE_ENTITY, "Este producto no pertenece a este usuario");

        product.setUser_id(null);

        return product;
    }

    @Override
    public List<Product> getProductsByCategoryId(Integer user_id, Integer category_id) {
        List<Product> products = productInterface.findAllByCategoryId(user_id, category_id);

        products.forEach(product -> product.setUser_id(null));

        return products;
    }

    @Override
    public void createProduct(Integer user_id, Integer category_id, Product product) {
        Product repeatProduct = productInterface.findByProduct_name(product.getProduct_name(), user_id).orElse(null);

        if (repeatProduct != null) throw new CustomException(HttpStatus.UNPROCESSABLE_ENTITY, "Este nombre de producto ya está siendo utilizado");

        product.setCategory_id(category_id);
        product.setUser_id(user_id);

        product.setProduct_id(user_id);
        productInterface.save(product);
    }

    @Override
    public void editProduct(Integer user_id, Integer product_id, Product product) {
        Product productToEdit = productInterface.findById(product_id).orElse(null);
        Product productRepeat = productInterface.findByProduct_name(product.getProduct_name(), user_id).orElse(null);

        if (productToEdit == null) throw new CustomException(HttpStatus.NOT_FOUND, "Producto no encontrado");
        if (productRepeat != null) throw new CustomException(HttpStatus.UNPROCESSABLE_ENTITY, "Este nombre ya está siendo utilizado en otro producto");
        if (!productToEdit.getUser_id().equals(user_id)) throw new CustomException(HttpStatus.UNPROCESSABLE_ENTITY, "Esta producto no pertenece a este usuario");

        productToEdit.setProduct_name(product.getProduct_name());
        productToEdit.setDescription(product.getDescription());
        productToEdit.setAllergens(product.getAllergens());
        productToEdit.setIngredients(product.getIngredients());
        productToEdit.setPrice(product.getPrice());

        productInterface.save(productToEdit);
    }

    @Override
    public void deleteProduct(Integer product_id, Integer user_id) {
        Product productToDelete = productInterface.findById(product_id).orElse(null);

        if (productToDelete == null) throw new CustomException(HttpStatus.NOT_FOUND, "Producto no encontrado");
        if (!productToDelete.getUser_id().equals(user_id)) throw new CustomException(HttpStatus.UNPROCESSABLE_ENTITY, "Esta producto no pertenece a este usuario");

        productInterface.delete(productToDelete);
    }
}
