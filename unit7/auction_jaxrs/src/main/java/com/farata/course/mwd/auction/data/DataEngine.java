package com.farata.course.mwd.auction.data;

import com.farata.course.mwd.auction.entity.Bid;
import com.farata.course.mwd.auction.entity.Product;

import javax.annotation.PostConstruct;
import javax.inject.Singleton;
import javax.ws.rs.core.UriInfo;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.function.Predicate;
import java.util.stream.Collectors;

@Singleton
public class DataEngine {

    @PostConstruct void init() {
        initProducts();
        bidList = new ArrayList<>();
        count = new AtomicInteger();
    }

    private List<Product> productsList;
    private List<Bid> bidList;
    private AtomicInteger count;

    private void initProducts() {
        productsList = new ArrayList<Product>() {

            public boolean add(Product dto) {
                return !((dto == null) || (dto.getId() == null)) && super.add(dto);
            }

            public Product remove(int index) {
                Product dto = super.remove(index);
                return dto;
            }
        };

        Random random = new Random(LocalDateTime.now().getHour());
        for (int i = 1; i <= 6; i++) {
            productsList.add(new Product(i, "Item " + i, "images/0" + i + ".jpg",
                "",
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore adipiscing elit. Ut enim.",
                2,
                LocalDateTime.now().plusDays(random.nextInt(10)),
                new BigDecimal(12),
                new BigDecimal(35),
                "123", 5
            ));
        }
    }

    public List<Product> findAllProducts() {
        return Collections.unmodifiableList(productsList);
    }


    public List<Product> findAllFeaturedProducts(UriInfo uriInfo) {
        String title = uriInfo.getQueryParameters().getFirst("title");
        //String bidsCount = uriInfo.getQueryParameters().getFirst("bidsCount");
        String highPrice = uriInfo.getQueryParameters().getFirst("highPrice");
        String lowPrice = uriInfo.getQueryParameters().getFirst("lowPrice");
        Predicate<Product> allProduct = new Predicate<Product>() {
            @Override
            public boolean test(Product product) {
                return true;
            }
        };
        List<Product> featuredProducts = productsList.stream()
                .filter(title != null ? product -> product.getTitle().contains(title) : allProduct)
                .filter(highPrice != null ?
                        product -> product.getMinimalPrice().compareTo(new BigDecimal(highPrice)) == -1 : allProduct)
                .filter(lowPrice != null ?
                        product -> product.getMinimalPrice().compareTo(new BigDecimal(lowPrice)) == 1 : allProduct)
                .collect(Collectors.toList());

        // TODO featured products
        return Collections.unmodifiableList(featuredProducts);
    }

    public Product findProductById(int id) {
        Product result = null;
        for (Product product : productsList) {
            if (product.getId().compareTo(id) == 0) {
                result = product;
                break;
            }
        }
        return result;
    }

    public void addBid(Bid bid) {
        bidList.add(bid);
    }

    public int getNextBidId() {
        return count.incrementAndGet();
    }

    public List<Bid> getAllBids(int idProduct) {
        return bidList.stream().filter(bid -> bid.getProduct().getId() == idProduct).collect(Collectors.toList());
    }

}
