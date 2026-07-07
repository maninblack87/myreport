package com.myreport.servlet.users;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

import org.bson.Document;

public class CheckIdServlet extends HttpServlet {

    // 회원가입 할 때, 아이디 중복 체크를 위해 사용한다
    private static final String MONGODB_URI = "mongodb+srv://maninblack87:quantum87@cluster0.sho0t.mongodb.net/";

    @Override
    protected void doGet(
        HttpServletRequest request,
        HttpServletResponse response
    ) throws ServletException, IOException {

        // 요청 대상(서버)가 해석할 때 UTF-8
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

        } catch (Exception e){
            e.printStackTrace();

            // 서버 오류
            response.setStatus(500);
        }

        // JSON 응답
        out.print(
            "{\"isDuplicate\":" + isDuplicate + "}"
        );
        out.flush();

    }
    
}
