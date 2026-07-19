package com.myreport.servlet.users;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

import org.bson.Document;

import com.myreport.util.PasswordUtil;

public class JoinServlet extends HttpServlet {
    
    // MongoDB URI
    private static final String MONGODB_URI = "mongodb+srv://maninblack87:quantum87@cluster0.sho0t.mongodb.net/";

    // 함수 : 회원가입 페이지 열기
    @Override
    protected void doGet(
        HttpServletRequest request,
        HttpServletResponse response
    ) throws ServletException, IOException {
        request.getRequestDispatcher("/WEB-INF/views/users/join.jsp").forward(request, response);
        System.out.println(">> 회원가입 페이지 이동 성공 <<");
    }

    // 함수 : 회원가입 처리
    @Override
    protected void doPost(
        HttpServletRequest request,
        HttpServletResponse response
    ) throws ServletException, IOException {
        System.out.println(">> 회원가입 처리 시작 <<");

        request.setCharacterEncoding("UTF-8");

        // 변수 정의
        String id = request.getParameter("id");
        String password = request.getParameter("password");

        // 아이디 검증 : 아이디 길이
        if (id == null || id.length() < 5 || id.length() > 25) {
            response.sendRedirect(
                request.getContextPath() + "/users/join?error=idLength"
            );
            System.out.println("아이디 검증 실패");
            System.out.println(">> 회원가입 처리 종료 <<");
            return;
        }
        System.out.println("아이디 검증 완료");
        System.out.printf("입력한 아이디 : %s\n", id);
        System.out.printf("해당 아이디 길이 : %d\n\n", id.length());

        // 비밀번호 검증 : 비밀번호 길이
        if (password == null || password.length() < 5 || password.length() > 25){
            response.sendRedirect(
                request.getContextPath() + "/users/join?error=passwordLength"
            );
            System.out.println("비밀번호 검증 실패");
            System.out.println(">> 회원가입 처리 종료 <<");
            return;
        }
        System.out.println("비밀번호 검증 완료");
        System.out.printf("입력한 비밀번호 : %s\n", password);
        System.out.printf("해당 비밀번호 길이 : %d\n", password.length());
        System.out.println();

        // 몽고DB 연결
        try (MongoClient mongoClient = MongoClients.create(MONGODB_URI)) {
            System.out.println("몽고DB연결 성공");

            MongoDatabase myhome = mongoClient.getDatabase("myhome");
            System.out.println("몽고DB 데이터베이스 가져오기 성공");

            MongoCollection<Document> users = myhome.getCollection("users");
            System.out.println("몽고DB 컬렉션 가져오기 성공\n");

            // 현재 users 컬렉션에 저장된 정보 가져오기
            FindIterable<Document> allUsers = users.find();
            for (Document user : allUsers) {
                System.out.printf("DB에 저장된 아이디: %s\n", user.toJson());
            }

            // 아이디 중복 검사
            Document findUser = users.find(new Document("id", id)).first();
            System.out.printf("DB에서 찾은 아이디: %s\n\n", findUser);

            // 중복된 아이디 체크
            if (findUser != null) {
                response.sendRedirect(
                    request.getContextPath() + "/users/join?error=duplicate"
                );
                System.out.println("중복된 아이디가 존재합니다");
                System.out.println(">> 회원가입 처리 종료 <<");
                return;
            }
            System.out.println("아이디 중복 검사 완료\n");

            // 비밀번호 해싱
            String hashedPassword = PasswordUtil.hashPassword(password);
            System.out.println("비밀번호 해싱 완료\n");

            // 회원 저장
            Document newUser = new Document();
            newUser.append("id", id);
            newUser.append("password", hashedPassword);
            newUser.append("role", "user");
            System.out.printf("새로운 회원 정보: %s\n", newUser.toJson());
            System.out.println("새로운 회원 정보 저장 준비 완료\n");

            users.insertOne(newUser);
            System.out.println(">> 회원가입 처리 성공 <<\n");

            // 회원가입 성공 후 로그인 페이지로 이동
            response.sendRedirect(
                request.getContextPath() + "/users/login?success=join"
            );
            System.out.println(">> 로그인 페이지 이동 <<");

        // 예외 적인 오류 반환
        } catch (Exception e) {

            e.printStackTrace();

            response.sendRedirect(
                request.getContextPath() + "/users/join?error=server"
            );
            System.out.println(">> 회원가입 처리 실패 <<");

        }
    }

}
