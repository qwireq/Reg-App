package Servlets;

public class User {
     private String email;
     private String password;
     private String name;
     private String surname;
     private int access_level;
    
     public User(){
    	 
     }
	/**
	 * @return the email
	 */
	public String getEmail() {
		return email;
	}
	/**
	 * @param email the email to set
	 */
	public void setEmail(String email) {
		this.email = email;
	}
	/**
	 * @return the iD
	 */
	
	/**
	 * @return the name
	 */
	public String getName() {
		return name;
	}
	/**
	 * @param name the name to set
	 */
	public void setName(String name) {
		this.name = name;
	}
	/**
	 * @return the password
	 */
	public String getPassword() {
		return password;
	}
	/**
	 * @param password the password to set
	 */
	public void setPassword(String password) {
		this.password = password;
	}
	/**
	 * @return the surname
	 */
	public String getSurname() {
		return surname;
	}
	/**
	 * @param surname the surname to set
	 */
	public void setSurname(String surname) {
		this.surname = surname;
	}
	/**
	 * @return the access_level
	 */
	public int getAccess_level() {
		return access_level;
	}
	/**
	 * @param access_level the access_level to set
	 */
	public void setAccess_level(int access_level) {
		this.access_level = access_level;
	}
	/**
	 * @return the iD
	 */
}
