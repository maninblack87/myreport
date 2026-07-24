package com.myreport.servlet.users;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.MongoCollection;
import org.bson.Document;

import com.myreport.util.PasswordUtil;

public class JoinServlet2 extends HttpServlet {

    private static final String MONGODB_URI = "mongodb+srv://maninblack87:quantum87@cluster0.sho0t.mongodb.net/";

    @Override
    protected void doGet(
        HttpServletRequest request,
        HttpServletResponse response
    ) throws ServletException, IOException {
        request.getRequestDispatcher("/WEB-INF/views/users/join.jsp").forward(request, response);
    }

    @Override
    protected void doPost(
        HttpServletRequest request,
        HttpServletResponse response
    ) throws ServletException, IOException {

        // 요청 해석 : UTF-8
        request.setCharacterEncoding("UTF-8");

        // 변수
        String id = request.getParameter("id");
        String password = request.getParameter("password");

        // 검증1 : 아이디 길이
        if (id == null || id.length() < 5 || id.length() > 25){
            response.sendRedirect(
                request.getContextPath() + "/users/join?error=idLength"
            );
            return;
        }

        // 검증2 : 비밀번호 길이
        if (password == null || password.length() < 5 || password.length() > 25){
            response.sendRedirect(
                request.getContextPath() + "/users/join?error=passwordLength"
            );
            return;
        }

        // 검증3 : 아이디 중복 여부
        // >> 몽고 DB 연결
        try (MongoClient mongoClient = MongoClients.create(MONGODB_URI)){
            MongoDatabase myhome = mongoClient.getDatabase("myhome");
            MongoCollection<Document> users = myhome.getCollection("users");

            Document findUser = users.find(new Document("id", id)).first();
            
            if (findUser != null){
                response.sendRedirect(
                    request.getContextPath() + "/users/join?error=duplicate"
                );
                return;
            }

            // 비밀번호 해싱
            String hashedPassword = PasswordUtil.hashPassword(password);

            // 회원저장
            Document newUser = new Document();
            newUser.append("id", id);
            newUser.append("password", hashedPassword);
            newUser.append("role", "user");
            users.insertOne(newUser);

            // 회원가입 성공 후 로그인 페이지로 이동
            response.sendRedirect(
                request.getContextPath() + "/users/login?success=join"
            );

        } catch (Exception e){
            e.printStackTrace();

            response.sendRedirect(
                request.getContextPath() + "/users/join?error=server"
            );
        }

    }
    
}
