package com.farata.course.mwd.auction.service;

import com.farata.course.mwd.auction.data.DataEngine;
import com.farata.course.mwd.auction.entity.Bid;
import com.farata.course.mwd.auction.entity.Product;
import com.farata.course.mwd.auction.entity.User;

import javax.annotation.Resource;
import javax.inject.Inject;
import javax.jms.*;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.validation.Valid;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.Response;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.Properties;
import java.util.logging.Logger;

@Path("bid")
@Produces("application/json")
public class BidService {

    private static final Logger log = Logger.getLogger(BidService.class.getName());

    // Set up all the default values
    private static final String DEFAULT_MESSAGE = "Hello, World!";
    private static final String DEFAULT_CONNECTION_FACTORY = "jms/RemoteConnectionFactory";
    private static final String DEFAULT_DESTINATION = "jms/queue/test";
    private static final String DEFAULT_MESSAGE_COUNT = "57";
    private static final String DEFAULT_USERNAME = "quickstartUser";
    private static final String DEFAULT_PASSWORD = "quickstartPwd1!";
    private static final String INITIAL_CONTEXT_FACTORY = "org.jboss.naming.remote.client.InitialContextFactory";
    private static final String PROVIDER_URL = "http-remoting://127.0.0.1:8080";

    //  // TODO I don't have a connection @Resource(lookup ="java:/ConnectionFactory")
    ConnectionFactory connectionFactory;

    // TODO I don't have a queue @Resource(lookup = "queue/test")
    Queue testQueue;

    DataEngine dataEngine;

    @Inject
    public void setDataEngine(DataEngine dataEngine) {
        this.dataEngine = dataEngine;
    }
    // TODO: Provide actual implementation
    @GET
    @Path("/{id}/")
    public Bid getBid(@PathParam("id") int id, @Context HttpHeaders headers) {
        return new Bid(id, new BigDecimal(42));
    }

    // TODO: Provide actual implementation
    @POST
    @Consumes("application/json")
    public Response placeBid(@Valid Bid bid) {

     //   sendBidToQueue(); // Send a message to the queue
        Product product = dataEngine.findProductById(bid.getId());
        if  (product == null) {
            throw new NotFoundException("Product not found : " + bid.getId());
        }
        if (product.getReservedPrice().compareTo(bid.getAmount()) == -1) {
            return Response.status(Response.Status.OK).entity("You are winner").build();
        } else if (product.getMinimalPrice().compareTo(bid.getAmount()) == 1) {
            //todo how send error or mess
           return Response.status(Response.Status.OK).entity("You aren't win").build();
        } else {
            bid.setId(dataEngine.getNextBidId());
            bid.setAmount(bid.getAmount());
            bid.setBidTime(LocalDateTime.now());
            bid.setProduct(product);
            bid.setUser(new User(1, "foo", "foo@mail.ru", true));
            dataEngine.addBid(bid);
            List<Bid> bids = dataEngine.getAllBids(product.getId());
            bids.sort((o1, o2) -> o1.getAmount().compareTo(o2.getAmount()));
            return Response.status(Response.Status.OK).entity(bids.get(0).getJsonObject()).build();
        }
    }

    private void sendBidToQueue(){

        try (JMSContext context =
               connectionFactory.createContext(DEFAULT_USERNAME, DEFAULT_PASSWORD)) {
            log.info("\n Sending Hello Bid message from BidService to the queue");

            JMSProducer producer = context.createProducer();

            producer.send(testQueue, "Hello Bid!");
        }
    }
}
