package Servlets;

import java.io.IOException;
import java.sql.ResultSet;
import java.util.stream.Collectors;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;


/**
 * Servlet implementation class SigninServlet
 */
@WebServlet("/signin")
public class SigninServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private String test = "SignIn Servlet";
    /**
     * @see HttpServlet#HttpServlet()
     */
    public SigninServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		//request.getRequestDispatcher("/WEB-INF/signin.jsp").forward(request, response);
		response.getWriter().append(test);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		//Gson gson = new Gson();
		//String json = "";
		
		if ("POST".equalsIgnoreCase(request.getMethod())) 
		{
		   test = request.getReader().lines().collect(Collectors.joining(System.lineSeparator()));
		}
		else System.out.println("net SignIna");
		
	
		Gson gson = new Gson();
		User currentUser = new User();
		currentUser = gson.fromJson(test, User.class);
		
		 MySQLAccess dao = new MySQLAccess();
         try {	
			ResultSet p = dao.readDataBase();
			boolean t = dao.signInUser(currentUser);
			dao.close();
			if(t)response.getWriter().append(test);
			else response.getWriter().append(gson.toJson("null"));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			response.getWriter().append(gson.toJson("null"));
			e.printStackTrace();
		}
		//response.sendRedirect("http://localhost:3000/userpage");
	}

}
