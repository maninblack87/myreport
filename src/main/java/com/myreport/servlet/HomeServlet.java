package com.myreport.servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class HomeServlet extends HttpServlet {

    @Override
    protected void doGet(
        HttpServletRequest request,
        HttpServletResponse response                
    ) throws ServletException, IOException {
        System.out.println("HomeServlet.java 작동 확인!");

        request.getRequestDispatcher("/WEB-INF/views/index.jsp").forward(request, response);
    }

}