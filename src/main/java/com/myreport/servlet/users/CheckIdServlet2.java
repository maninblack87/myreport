package com.myreport.servlet.users;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.ServletException;

import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.MongoCollection;
import org.bson.Document;

public class CheckIdServlet2 extends HttpServlet {

    // 상수
    private static final String MONGODB_URI = "mongodb+srv://maninblack87:<db_password>@cluster0.sho0t.mongodb.net/";

    @Override
    protected void doGet(
        HttpServletRequest request,
        HttpServletResponse response
    ) throws ServletException, IOException {

        // 서버가 요청을 해석할 때 UTF-8
        request.setCharacterEncoding("UTF-8");

        // 서버가 응답을 할 때
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        // 변수
        String id = request.getParameter("id");
        boolean isDuplicate = false;

        PrintWriter out = response.getWriter();

        // 아이디 중복 검사
        try (MongoClient mongoClient = MongoClients.create(MONGODB_URI)){
            MongoDatabase myhome = mongoClient.getDatabase("myhome");
            MongoCollection<Document> users = myhome.getCollection("users");

            Document findUser = users.find(new Document("id", id)).first();

            if (findUser != null){
                isDuplicate = true;
            }

        } catch (Exception e){
            e.printStackTrace();
            response.setStatus(500);
        }

        // JSON 응답
        out.print(
            "{\"isDuplicate\":" + isDuplicate + "}"
        );
        out.flush();

    }
    
}
