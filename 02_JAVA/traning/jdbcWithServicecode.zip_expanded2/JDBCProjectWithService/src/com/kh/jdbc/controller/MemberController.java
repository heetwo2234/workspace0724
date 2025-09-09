package com.kh.jdbc.controller;

import com.kh.jdbc.model.dao.MemberDao;

public class MemberController {
	private MemberDao md;

	public MemberController() {
		super();
		this.md = new MemberDao();
	}
	
	
}
