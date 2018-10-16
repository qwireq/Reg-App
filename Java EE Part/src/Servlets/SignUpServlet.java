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
import com.google.gson.JsonObject;


/**
 * Servlet implementation class SignUpServlet
 */
@WebServlet("/signup")
public class SignUpServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private String test = "SignUp Servlet";
    /**
     * @see HttpServlet#HttpServlet()
     */
    public SignUpServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		//request.getRequestDispatcher("/WEB-INF/signup.jsp").forward(request, response);
		response.getWriter().append(test);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		if ("POST".equalsIgnoreCase(request.getMethod())) 
		{
		   test = request.getReader().lines().collect(Collectors.joining(System.lineSeparator()));
		}
		else System.out.println("No Sign Up");
		
		
		MySQLAccess dao = new MySQLAccess();
		
		Gson gson = new Gson();
		User newUser = new User();
		newUser = gson.fromJson(test, User.class);
		
        try {
        	System.out.println("Reading DB");
			ResultSet p = dao.readDataBase();
			System.out.println("\nChecking user");
			boolean r = dao.checkUser(newUser);
			//dao.writeMetaData(r);
			if(r == false){
				System.out.println("\nThere is no such user");
				newUser.setAccess_level(3);
				dao.registerUser(newUser);
				p = dao.readDataBase();
				dao.close();
				response.getWriter().append(test);
			}
			else{
				System.out.println("User with such email already exists!");
				response.getWriter().append(gson.toJson("null"));
			}
		} catch (Exception e) {
			response.getWriter().append(gson.toJson("null"));
			e.printStackTrace();
		}
	}

}
