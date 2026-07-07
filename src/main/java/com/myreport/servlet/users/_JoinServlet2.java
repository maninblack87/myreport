package com.myreport.servlet.users;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.MongoCollection;

import org.bson.Document;

import com.myreport.util.PasswordUtil;

public class _JoinServlet2 extends HttpServlet {
    
    // 몽고DB URI
    private static final String MONGODB_URI = "mongodb+srv://maninblack87:quantum87@cluster0.sho0t.mongodb.net/";

    // 함수 : 회원가입 페이지 열기
    @Override
    protected void doGet(
        HttpServletRequest request,
        HttpServletResponse response
    ) throws ServletException, IOException {
        request.getRequestDispatcher("/WEB-INF/views/users/register.jsp").forward(request, response);
    }

    // 함수 : 회원가입 처리
    @Override
    protected void doPost(
        HttpServletRequest request,
        HttpServletResponse response
    ) throws ServletException, IOException {

        request.setCharacterEncoding("UTF-8");

        // 변수 정의
        String id = request.getParameter("id");
        String password = request.getParameter("password");

        // 아이디 검증 : 아이디 길이
        if (id == null || id.length() < 5 || id.length() > 25) {
            response.sendRedirect(
                request.getContextPath() + "/users/join?error=idLength"
            );
        }

        // 비밀번호 검증 : 비밀번호 길이
        if (password == null || password.length() < 5 || password.length() > 25) {
            response.sendRedirect(
                request.getContextPath() + "/users/join?error=PasswordLength"
            );
            return;
        }

        // 몽고DB 연결
        try (MongoClient mongoClient = MongoClients.create(MONGODB_URI)) {
            MongoDatabase myhome = mongoClient.getDatabase("myhome");
            MongoCollection<Document> users = myhome.getCollection("users");

            // 아이디 중복 검사
            Document findUser = users.find(new Document("id", id)).first();

            // 중복 아이디 체크
            if (findUser != null) {
                response.sendRedirect(
                    request.getContextPath() + "/users/join?error=duplicate"
                );
                return;
            }

            // 비밀번호 해싱
            String hashedPassword = PasswordUtil.hashPassword(password);

            // 회원 저장
            Document newUser = new Document();
            newUser.append("id", id);
            newUser.append("password", hashedPassword);
            newUser.append("role", "user");

            users.insertOne(newUser);

        } catch (Exception e) {
            e.printStackTrace();

            response.sendRedirect(
                request.getContextPath() + "/users/join?error=server"
            );
        }

    }

}
