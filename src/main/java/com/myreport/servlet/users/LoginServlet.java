package com.myreport.servlet.users;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.MongoCollection;

import org.bson.Document;

import com.myreport.model.UserVO;
import com.myreport.util.PasswordUtil;

public class LoginServlet extends HttpServlet {

    private static final String MONGODB_URI = "mongodb+srv://maninblack87:quantum87@cluster0.sho0t.mongodb.net/";

    @Override
    protected void doGet (
        HttpServletRequest request,
        HttpServletResponse response
    )
        throws ServletException, IOException {
            request.getRequestDispatcher("/WEB-INF/views/users/login.jsp").forward(request, response);
        }

    @Override
    protected void doPost (
        HttpServletRequest request,
        HttpServletResponse response
    )
        throws ServletException, IOException {
            request.setCharacterEncoding("UTF-8");

            // 변수 정의
            String id = request.getParameter("id");
            String password = request.getParameter("password");

            // 데이터베이스 연결
            try (MongoClient mongoClient = MongoClients.create(MONGODB_URI)) {
                MongoDatabase myhome = mongoClient.getDatabase("myhome");               // 임시로 myhome 데이터베이스 사용
                MongoCollection<Document> users = myhome.getCollection("users");

                Document findUser = users.find(new Document("id", id)).first();

                // 데이터베이스에서 아이디 조회에 성공한 경우
                if (findUser != null) {
                    String hashPassword = findUser.getString("password");

                    // 비밀번호가 일치하면 로그인 처리
                    if (PasswordUtil.checkPassword(
                        password,
                        hashPassword
                    )){

                        // 로그인 사용자의 id와 password 저장
                        UserVO loginUser = new UserVO();
                        loginUser.setId(findUser.getString("id"));
                        loginUser.setPassword(findUser.getString("password"));

                        // 세션 생성 - 로그인 사용자 정보를 저장
                        HttpSession session = request.getSession();
                        session.setAttribute("loginUser", loginUser);

                        // 
                        String target = (String) session.getAttribute("target");

                        // target이 있는 경우
                        if (target != null){
                            session.removeAttribute("target");
                            response.sendRedirect(
                                request.getContextPath() + target
                            );
                            return;
                        }

                        // target이 없는 경우
                        response.sendRedirect(
                            request.getContextPath() + "/"
                        );
                        return;
                        
                    };
                }
            }
        }
    
}
