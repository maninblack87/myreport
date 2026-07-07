package com.myreport.servlet.users;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.*;

import com.myreport.model.UserVO;

public class DetailServlet extends HttpServlet {

    @Override
    protected void doGet(
        HttpServletRequest request,
        HttpServletResponse response
    ) throws ServletException, IOException {
        
        HttpSession session = request.getSession();

        // 로그인 사용자의 정보 가져오기
        UserVO loginUser = (UserVO) session.getAttribute("loginUser");

        // 로그인 안 한 경우
        if (loginUser == null) {
            response.sendRedirect(
                request.getContextPath() +  "/users/login"
            );
            return;
        }

        // JSP로 전달
        request.setAttribute("loginUser", loginUser);

        // 화면 이동
        request.getRequestDispatcher("/WEB-INF/views/users/detail.jsp").forward(request, response);

    }
    
}
