package hosteleria_proyect.api.controllers;

import hosteleria_proyect.api.entitys.Product;
import hosteleria_proyect.api.services.ProductService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.swing.plaf.ListUI;
import java.util.List;

@RestController
@RequestMapping("hosteleria-proyect")
@CrossOrigin(value = "http://localhost:3000")
public class ProductController {

    private static final Logger logger = LoggerFactory.getLogger(ProductController.class);

    @Autowired
    private ProductService productService;

    @GetMapping("/products")
    public List<Product> getProducts() {
        var products = productService.getProducts();
        products.forEach(product -> logger.info(product.toString()));
        return products;
    }

    @GetMapping("/products/{id}")
    public Product getProductById(@PathVariable Integer id) {
        Product product = productService.getProductById(id);
        return product;
    }

    @PostMapping("/products")
    public void saveProduct(@RequestBody Product newOrUpdateProduct) {
        productService.saveProduct(newOrUpdateProduct);
    }

    @DeleteMapping("/products/{id}")
    public void deleteProduct(@PathVariable Integer id) {
        Product product = productService.getProductById(id);
        productService.deleteProduct(product);
    }
}
