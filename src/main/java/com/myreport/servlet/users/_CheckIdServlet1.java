package com.myreport.servlet.users;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.MongoCollection;

import org.bson.Document;

public class _CheckIdServlet1 extends HttpServlet {

    // MongoDB URI
    private static final String MONGODB_URI = "mongodb+srv://maninblack87:quantum87@cluster0.sho0t.mongodb.net/";

    // 아이디 중복 확인
    // GET /users/checkId?id=사용자입력아이디
    @Override
    protected void doGet(
        HttpServletRequest request,
        HttpServletResponse response
    ) throws ServletException, IOException {

        request.setCharacterEncoding("UTF-8");

        String id = request.getParameter("id");

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        PrintWriter out = response.getWriter();

        boolean isDuplicate = false;

        try (MongoClient mongoClient = MongoClients.create(MONGODB_URI)) {
            MongoDatabase myreport = mongoClient.getDatabase("myreport");
            MongoCollection<Document> users = myreport.getCollection("users");

            Document findUser = users.find(new Document("id", id)).first();

            if (findUser != null) {
                isDuplicate = true;
            }

        } catch (Exception e) {

            e.printStackTrace();

            response.setStatus(500);

        }

        out.print(
            "{\"isDuplicate\":"
            + isDuplicate
            + "}"
        );
        out.flush();

    }
    
}
