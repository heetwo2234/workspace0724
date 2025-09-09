package traning;

import java.util.Scanner;

public class Test1 {

	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		
		System.out.println("점수를 입력하세요: ");
		int score = sc.nextInt();
		
		String grade;
		
		if(90 <= score) {
			grade = "A";
		}
		else if(80 <= score) {
			grade = "B";
		}
		else if(70 <= score) {
			grade = "C";
		}
		else if(60 <= score) {
			grade = "D";
		}
		else {
			grade = "F";
		}
		
		System.out.println("당신의 성적은" + grade + "입니다.");
		
	}

}
