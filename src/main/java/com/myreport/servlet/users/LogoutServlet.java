package com.myreport.servlet.users;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

public class LogoutServlet extends HttpServlet {
    
    @Override
    protected void doGet(
        HttpServletRequest request,
        HttpServletResponse response
    ) throws ServletException, IOException {

        // 세션 가져오기
        HttpSession session = request.getSession(false);

        // 세션이 존재하면 무효화
        if (session != null) {
            session.invalidate();
        }

        // 메인페이지로 이동
        response.sendRedirect(request.getContextPath() + "/");

    }

}
