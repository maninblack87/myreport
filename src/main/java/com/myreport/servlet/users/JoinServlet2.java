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

public class JoinServlet2 extends HttpServlet {

    // 상수
    private static final String MONGODB_URI = "mongodb+srv://maninblack87:quantum87@cluster0.sho0t.mongodb.net/";

    // 함수 : 회원가입 페이지 열기
    @Override
    protected void doGet (
        HttpServletRequest request,
        HttpServletResponse response
    ) throws ServletException, IOException {

        // getRequestDispatcher : 회원가입 페이지를 요청
        // forward
        request.getRequestDispatcher("/WEB-INF/views/users/join.jsp").forward(request, response);

    }

    // 함수 : 회원가입 처리
    @Override
    protected void doPost (
        HttpServletRequest request,
        HttpServletResponse response
    ) throws ServletException, IOException {

        // 인코딩 형식 : UTF-8
        request.setCharacterEncoding("UTF-8");

        // 변수
        String id = request.getParameter("id");
        String password = request.getParameter("password");

        // A.아이디 검증
        if (id == null || id.length() < 5 || id.length() > 25) {
            response.sendRedirect(
                request.getContextPath() + "/users/join?error=idLength"
            );
            return;
        }

        // B.비밀번호 검증
        if (password == null || password.length() < 5 || password.length() > 25) {
            response.sendRedirect(
                request.getContextPath() + "/users/join?error=passwordLength"
            );
            return;
        }

        // 몽고DB 연결
        // 1. 아이디 중복 검사를 위해
        try (MongoClient mongoClient = MongoClients.create(MONGODB_URI)){
            MongoDatabase myreport = mongoClient.getDatabase("myreport");
            MongoCollection<Document> users = myreport.getCollection("users");

            // C.아이디 중복 검사
            Document findUser = users.find(new Document("id", id)).first();
            if (findUser != null) {
                response.sendRedirect(
                    request.getContextPath() + "/users/join?error=idDuplicate"
                );
            }

            // 비밀번호 해싱
            String hashedPassword = PasswordUtil.hashPassword(password);

            // 회원 저장
            Document newUser = new Document();
            newUser.append("id", id);
            newUser.append("password", hashedPassword);
            newUser.append("role", "user");

            users.insertOne(newUser);

            // 회원가입 성공 후 로그인 페이지로 이동
            response.sendRedirect(
                request.getContextPath() + "/users/login?success=joined"
            );

        } catch (Exception e) {

            e.printStackTrace();

            response.sendRedirect(
                request.getContextPath() + "/users/join?error=serverError"
            );

        }

    }
    
}
