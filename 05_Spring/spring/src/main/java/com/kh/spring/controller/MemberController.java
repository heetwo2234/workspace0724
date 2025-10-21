package com.kh.spring.controller;

import com.kh.spring.model.vo.Member;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

//Bean에 class등록하는 방법으로 @Component를 클래스에 부여한다.
//@Controller -> @Component + Controller객체가 가질 수 있는 예외처리등의 기능을 포함하는 어노테이션
@Controller
public class MemberController {

    /*
    Spring에서 클라이언트가 보낸 정보를 받는 방법

    1. HttpServletRequest를 활용해서 전달값을 가져옴.
    메서드에 매게변수로 HttpServletRequest를 작성해주면
    스프링컨테이너가 해당 메서드를 호출할 때 자동으로 매게변수로 주입
     */
    /*
    @PostMapping("login.me")
    public String login(HttpServletRequest request, HttpServletResponse response){
        String id = request.getParameter("userId");
        String pw = request.getParameter("userPwd");
        System.out.println(id);
        System.out.println(pw);

        return null;
    }
     */

    /*
    2. @RequestParam 어노테이션을 활용하는 방법
    request.getParameter(키)로 벨류를 추출하는 역할을 대신 해주는 어노테이션
    요청  parameter의 key값과 동일하게 매게변수명을 설정해주면 @RequestParam어노테이션을 생략해도 됨.
     */
    /*
    @PostMapping("login.me")
    public String login(@RequestParam(value = "userId", defaultValue = "user01") String id, String userPwd){
        System.out.println(id);
        System.out.println(userPwd);

        return null;
    }
     */

    @PostMapping("login.me")
    public String login(Member member){
        System.out.println(member);
        return null;
    }

}
