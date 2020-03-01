package umm3601.todo;

import static com.mongodb.client.model.Filters.and;
import static com.mongodb.client.model.Filters.eq;
import static com.mongodb.client.model.Filters.regex;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.sound.sampled.SourceDataLine;

import com.google.common.collect.ImmutableMap;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Sorts;

import org.bson.Document;
import org.bson.conversions.Bson;
import org.bson.types.ObjectId;
import org.mongojack.JacksonCodecRegistry;

import io.javalin.http.BadRequestResponse;
import io.javalin.http.Context;
import io.javalin.http.NotFoundResponse;

 /**
   * Controller that manages requests for info about todos.
   */
public class TodoController {


  JacksonCodecRegistry jacksonCodecRegistry = JacksonCodecRegistry.withDefaultObjectMapper();
  private final MongoCollection<Todo> todoCollection;


  /**
   * Construct a controller for todos.
   * @param database the database containing todo data
   */
  public TodoController(MongoDatabase database) {
    jacksonCodecRegistry.addCodecForClass(Todo.class);
    todoCollection = database.getCollection("todos").withDocumentClass(Todo.class)
    .withCodecRegistry(jacksonCodecRegistry);

  }
  /**
   * Get a single todo with specified id given a context
   * @param ctx
   */
  public void getTodo(Context ctx) {
    String id = ctx.pathParam("id");
    Todo todo;

    try {
      todo = todoCollection.find(eq("_id", new ObjectId(id))).first();
    } catch(IllegalArgumentException e) {
      throw new BadRequestResponse("The requested todo id wasn't a legal Mongo Object ID.");
    }
    if (todo == null) {
      throw new NotFoundResponse("The requested todo was not found");
    } else {
      ctx.json(todo);
    }
  }

  /**
   * Delete a single todo given specified id in the request
   * @param ctx
   */
  public void deleteTodo (Context ctx) {
    String id = ctx.pathParam("id");
    todoCollection.deleteOne(eq("_id", new ObjectId(id)));
  }
  /**
   * Get a JSON response with all the todos.
   * @param ctx
   */
  public void getTodos(Context ctx) {
    List<Bson> filters = new ArrayList<Bson>();

    if(ctx.queryParamMap().containsKey("owner")) {
      filters.add(regex("owner", ctx.queryParam("owner"), "i"));
    }

    if(ctx.queryParamMap().containsKey("status")) {
      boolean targetStatus = ctx.queryParam("status", Boolean.class).get();
      filters.add(eq("status", targetStatus));
    }

    String sortBy = ctx.queryParam("sortby", "owner"); //Sort by sort query param, default is category
    String sortOrder = ctx.queryParam("sortorder", "asc");

    ctx.json(todoCollection.find(filters.isEmpty() ? new Document() : and(filters))
    .sort(sortOrder.equals("desc") ? Sorts.descending(sortBy) : Sorts.ascending(sortBy))
    .into(new ArrayList<>()));
  }
  /**
   * Add new todo to database if it has valid parameters
   * @param ctx
   */
  public void addNewTodo(Context ctx) {
    Todo newTodo = ctx.bodyValidator(Todo.class)
    .check((tdo) -> tdo.owner != null && tdo.owner.length() > 0)
    .check((tdo) -> tdo.category != null && tdo.category.length() > 0)
    .check((tdo) -> tdo.body != null && tdo.body.length() > 0)
    .check((tdo) -> tdo.status != null && (tdo.status == true || tdo.status == false))
    .get();

    todoCollection.insertOne(newTodo);
    ctx.status(201);
    ctx.json(ImmutableMap.of("id", newTodo._id));
  }
}
