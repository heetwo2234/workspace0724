package com.kh.example.collection3;

public class Member {
	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	private String password;
	
	public Member() {
	}

	private String name;
	
	public Member(String password, String name) {
		this.password = password;
		this.name = name;
	}

	public String toString() {
		return "Member [password=" + password + ", name=" + name + "]";
	}
	

}
