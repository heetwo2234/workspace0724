package com.kh.jsp.controller.board;

import java.io.IOException;

import com.kh.jsp.service.BoardService;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class UpdateController
 */
@WebServlet(name = "update.bo", urlPatterns = { "/update.bo" })
public class UpdateController extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public UpdateController() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		//board정보를 받아 -> update -> 결과에따른 페이지 응답
		
		int boardNo = Integer.parseInt(request.getParameter("bno"));
		int categoryNo = Integer.parseInt(request.getParameter("category"));
		String boardTitle = request.getParameter("title");
		String boardContent = request.getParameter("content");
		
		new BoardService().updateBoard(boardNo, categoryNo, boardTitle, boardContent);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
