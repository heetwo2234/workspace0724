package com.kh.example.collection3;

import java.util.HashMap;

public class MemberController {
	private HashMap<String, Member> map = new HashMap<>();
	
	public boolean joinMembership(String id, Member m) {
		if (map.containsKey(id)) return false;
		map.put(id, m);
		return true;
	}
	
	public String logIn(String id, String password) {
		Member m = map.get(id);
		if(m != null && m.getPassword().equals(password )) {
			return m.getName();
		}
		return null;
	}
	
	public boolean changePassword(String id, String oldPw, String newPw) {
		Member m = map.get(id);
		if (m != null && m.getPassword().equals(oldPw)) {
			m.setPassword(newPw);
			return true;
		}
		return false;
		
	}
	public void changeName(String id, String newName) {
		Member m = map.get(id);
		if( m != null) {
			m.setName(newName);
		}
	}
	public TreeMap<String, String> sameName(String name) {
		TreeMap<String, Stirng> result = new TreeMap<>();
		map.entrty
	}

}
