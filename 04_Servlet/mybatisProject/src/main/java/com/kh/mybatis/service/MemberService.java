package com.kh.mybatis.service;

import static com.kh.jsp.common.JDBCTemplate.close;
import static com.kh.jsp.common.JDBCTemplate.getConnection;

import java.sql.Connection;

import com.kh.jsp.model.dao.MemberDao;
import com.kh.jsp.model.vo.Member;

public class MemberService {
	
	public Member loginMember(String userId, String userPwd) {
		Connection conn = getConnection();
		Member m = new MemberDao().loginMember(userId, userPwd, conn);
		
		close(conn);
		
		return m;
	}
}
