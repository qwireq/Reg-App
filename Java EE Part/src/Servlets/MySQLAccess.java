package Servlets;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Date;

public class MySQLAccess {
        private Connection connect = null;
        private Statement statement = null;
        private PreparedStatement preparedStatement = null;
        private ResultSet resultSet = null;

        public ResultSet readDataBase() throws Exception {
                try {
                        // This will load the MySQL driver, each DB has its own driver
                        Class.forName("com.mysql.jdbc.Driver").newInstance();
                        // Setup the connection with the DB
                        connect = DriverManager
                                        .getConnection("jdbc:mysql://localhost/mydb?"
                                                        + "user=root&password=root");

                        // Statements allow to issue SQL queries to the database
                        statement = connect.createStatement();
                        // Result set get the result of the SQL query
                        resultSet = statement
                                        .executeQuery("select * from user");
                        
                        writeResultSet(resultSet);
                        return resultSet;                   
                } catch (Exception e) {
                        throw e;
                } 

        }
        public boolean checkUser(User newUser) throws Exception{
        	try {
                // This will load the MySQL driver, each DB has its own driver
                Class.forName("com.mysql.jdbc.Driver").newInstance();
                // Setup the connection with the DB
                connect = DriverManager
                                .getConnection("jdbc:mysql://localhost/mydb?"
                                                + "user=root&password=root");               
                // PreparedStatements can use variables and are more efficient
                preparedStatement = connect
                                .prepareStatement("select * from user where email = ?");              
                // Parameters start with 1
                System.out.println("Email is " + newUser.getEmail());
                preparedStatement.setString(1, newUser.getEmail());
               
                resultSet = preparedStatement.executeQuery();
               
                //writeMetaData(resultSet);
                boolean t=resultSet.next();
              
                
                System.out.println("T is " + t + "\n" + preparedStatement);
                //writeMetaData(resultSet);
                writeResultSet(resultSet);
                return t;
               
        } catch (Exception e) {
        	
                throw e;
        } 
        }
        public boolean signInUser(User currentUser) throws Exception{
        	try {
                // This will load the MySQL driver, each DB has its own driver
                Class.forName("com.mysql.jdbc.Driver").newInstance();
                // Setup the connection with the DB
                connect = DriverManager
                                .getConnection("jdbc:mysql://localhost/mydb?"
                                                + "user=root&password=root");               
                // PreparedStatements can use variables and are more efficient
                preparedStatement = connect
                                .prepareStatement("select* from user where email = ? and password = ?");              
                // Parameters start with 1
                preparedStatement.setString(1, currentUser.getEmail());
                preparedStatement.setString(2, currentUser.getPassword());
                
                resultSet = preparedStatement.executeQuery();
                
                boolean t=resultSet.next();
                System.out.println("T is " + t + "\n" + preparedStatement);
                return t;
               

        } catch (Exception e) {
                throw e;
        } 
        }
        
        public void registerUser(User newUser) throws Exception{
        	try {
                // This will load the MySQL driver, each DB has its own driver
                Class.forName("com.mysql.jdbc.Driver").newInstance();
                // Setup the connection with the DB
                connect = DriverManager
                                .getConnection("jdbc:mysql://localhost/mydb?"
                                                + "user=root&password=root");               
                // PreparedStatements can use variables and are more efficient
                preparedStatement = connect
                                .prepareStatement("insert into user(email, password, name, surname, `access level`) values(?, ?, ?, ?, ?)");              
                // Parameters start with 1
                preparedStatement.setString(1, newUser.getEmail());
                preparedStatement.setString(2, newUser.getPassword());
                preparedStatement.setString(3, newUser.getName());
                preparedStatement.setString(4, newUser.getSurname());
                preparedStatement.setLong(5, newUser.getAccess_level());
                
                preparedStatement.executeUpdate();
               

        } catch (Exception e) {
        	System.out.println("Oshibka " + e);
                throw e;
        } 
        }
        public void writeMetaData(ResultSet resultSet) throws SQLException {
                //         Now get some metadata from the database
                // Result set get the result of the SQL query

                System.out.println("The columns in the table are: ");

                System.out.println("Table: " + resultSet.getMetaData().getTableName(1));
                for  (int i = 1; i<= resultSet.getMetaData().getColumnCount(); i++){
                        System.out.println("Column " +i  + " "+ resultSet.getMetaData().getColumnName(i));
                }
        }

        private void writeResultSet(ResultSet resultSet) throws SQLException {
                // ResultSet is initially before the first data set
                while (resultSet.next()) {
                        // It is possible to get the columns via name
                        // also possible to get the columns via the column number
                        // which starts at 1
                        // e.g. resultSet.getSTring(2);
                        String ID = resultSet.getString("ID");
                        String email = resultSet.getString("email");
                        String password = resultSet.getString("password");
                        String name = resultSet.getString("name");
                        String surname = resultSet.getString("surname");
                        String access_level = resultSet.getString("access level");
                        System.out.println("ID: " + ID);
                        System.out.println("Email: " + email);
                        System.out.println("PW: " + password);
                        System.out.println("Name: " + name);
                        System.out.println("Surname: " + surname);
                        System.out.println("Access Level: " + access_level);
                }
        }

        // You need to close the resultSet
        public void close() {
                try {
                        if (resultSet != null) {
                                resultSet.close();
                        }

                        if (statement != null) {
                                statement.close();
                        }

                        if (connect != null) {
                                connect.close();
                        }
                } catch (Exception e) {

                }
        }

}