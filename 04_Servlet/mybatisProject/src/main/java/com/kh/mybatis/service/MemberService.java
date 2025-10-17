package com.kh.mybatis.service;

import org.apache.ibatis.session.SqlSession;

import com.kh.mybatis.common.Template;
import com.kh.mybatis.model.dao.MemberDao;
import com.kh.mybatis.model.vo.Member;

public class MemberService {
	private MemberDao memberDao = new MemberDao();
	
	public Member loginMember(String userId, String userPwd) {
		SqlSession sqlSession = Template.getSqlSession();
		
		Member m = new MemberDao().loginMember(sqlSession, userId, userPwd);
		
		sqlSession.close();
		
		return m;
	}
}
