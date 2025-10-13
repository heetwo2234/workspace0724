package com.kh.jsp.service;

import static com.kh.jsp.common.JDBCTemplate.*;

import java.sql.Connection;
import java.util.ArrayList;

import com.kh.jsp.model.dao.BoardDao;
import com.kh.jsp.model.vo.Board;

public class BoardService {
	
	public ArrayList<Board> selectAllBoard(){
		Connection conn = getConnection();
		
		ArrayList<Board> list = new BoardDao().selectAllBoard(conn);
		close(conn);
		
		return list;
	}

}
