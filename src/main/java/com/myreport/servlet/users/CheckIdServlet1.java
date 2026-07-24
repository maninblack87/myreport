package com.myreport.servlet.users;

// 입출력 관련 라이브러리
import java.io.IOException;
import java.io.PrintWriter;

// 서블릿 관련 라이브러리
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

// 몽고DB 관련 라이브러리
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.MongoCollection;
import org.bson.Document;

public class CheckIdServlet1 extends HttpServlet {

    private static final String MONGODB_URI = "mongodb+srv://maninblack87:quantum87@cluster0.sho0t.mongodb.net/";

    @Override
    protected void doGet(
        HttpServletRequest request,
        HttpServletResponse response
    ) throws ServletException, IOException {

        // 서버가 요청을 해석할 때 : UTF-8
        request.setCharacterEncoding("UTF-8");

        // 서버가 요청에 응답할 때 : JSON, UTF-8
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        // 변수
        String id = request.getParameter("id");

        PrintWriter out = response.getWriter();
        boolean isDuplicate = false;

        try (MongoClient mongoClient = MongoClients.create(MONGODB_URI)){
            MongoDatabase myhome =mongoClient.getDatabase("myhome");
            MongoCollection<Document> users = myhome.getCollection("users");

            Document findUser = users.find(new Document("id", id)).first();

            if (findUser != null){
                isDuplicate = true;
            }

        } catch (Exception e){
            e.printStackTrace();

            // 서버 오류로 응답한다(꼭 서버 오류만 있는건 아닐수도 있지만)
            response.setStatus(500);
        }

        // JSON 응답
        out.print(
            "{\"isDuplicate\":" + isDuplicate + "}"
        );
        out.flush();

    }
    
}
