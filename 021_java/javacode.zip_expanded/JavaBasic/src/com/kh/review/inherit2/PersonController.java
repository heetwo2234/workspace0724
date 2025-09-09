package com.kh.review.inherit2;

public class PersonController {
	private Student[] s = new Student[3];
	private Employee[] e = new Employee[10];
	
	public int[] personCount() {
		int sCount = 0, eCount = 0;
		for(Student st : s) {
			if(st == null) {
				break;
		}
			sCount++;
		}
		
		for(Employee em : e) {
			if(em == null) {
				break;
			}
			eCount++;
		}
		int[] countArr = {sCount , eCount};
		
		return countArr;
	}
	
	public void insertStudent(String name, int age, double height, double weight, int grade, String major) {
		for()
	}
}
