package com.kh.jsp.controller.board;

import java.io.IOException;

import com.kh.jsp.model.vo.Board;
import com.kh.jsp.model.vo.Member;
import com.kh.jsp.service.BoardService;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

/**
 * Servlet implementation class InsertController
 */
@WebServlet(name = "insert.bo", urlPatterns = { "/insert.bo" })
public class InsertController extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public InsertController() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		//enctype이 multipart/form-data일 때 request로 값 추출이 불가
		System.out.println("---------------------");
		System.out.println(request.getParameter("title"));
		System.out.println("---------------------");
		
		HttpSession session = request.getSession();
		
		Board b = new Board();
		
		int categoryNo = Integer.parseInt(request.getParameter("category"));
		b.setCategoryNo(categoryNo);
		
		String title = request.getParameter("title");
		b.setBoardTitle(title);
		
		String content = request.getParameter("content");
		b.setBoardContent(content);
		
		Member loginMember = (Member)session.getAttribute("loginMember");
		b.setBoardWriter(loginMember.getMemberNo());
		
		int result = new BoardService().insertBoard(b);
		if(result > 0) { //성공
			session.setAttribute("alertMsg", "일반게시글 작성 성공");
			response.sendRedirect(request.getContextPath() + "/list.bo");
		} else { //실패
			request.setAttribute("errorMsg", "일반게시글 작성 실패");
			request.getRequestDispatcher("views/common/error.jsp").forward(request, response);
		}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
