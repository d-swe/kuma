package com.kumacorp.kuma_ims.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kumacorp.kuma_ims.service.ProductService;
import com.kumacorp.kuma_ims.model.Product;

@RestController
@RequestMapping("/products")
@CrossOrigin(origins = "http://localhost:5173")
// @CrossOrigin(origins = "http://kuma-frontend.s3-website-us-east-1.amazonaws.com")
public class ProductController {
   
    @Autowired
    private ProductService productService;

    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @PostMapping
    public Product createProduct(@RequestBody Product product) {
        return productService.createProduct(product);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> findProductById(@PathVariable int id) {
        Optional<Product> product = productService.findProductById(id);
        if (product.isPresent())
            return ResponseEntity.ok(product.get());
        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/count")
    public long getProductCount() {
        return productService.getProductCount();
    }

    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable int id) {
        productService.deleteProduct(id);
    }

    @PutMapping("/{id}")
    public Product updateProduct(@PathVariable int id, @RequestBody Product product) {
        return productService.updateProduct(id, product);
    }

    // @GetMapping("/warehouse/{id}")
    // public List<Product> findProductsByWarehouseId(@PathVariable int id) {
    //     return productService.findProductsByWarehouseId(id);
    // }

    // @PutMapping("/{id}/decrement")
    // public ResponseEntity<String> decrementProductQuantity(@PathVariable("id") Long productId, @RequestParam("amount") int amount) {
    //     try {
    //         productService.decreaseProductQuantity(productId, amount);
    //         return new ResponseEntity<>("Product quantity updated successfully.", HttpStatus.OK);
    //     } catch (Exception e) {
    //         // Handle exceptions and return an appropriate response
    //         return new ResponseEntity<>("Error updating product quantity: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    //     }
    // }
}
