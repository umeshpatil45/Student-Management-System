package com.studentmanagement.service;

import com.studentmanagement.dto.StatsDTO;
import com.studentmanagement.dto.StudentDTO;
import com.studentmanagement.entity.Student;

import java.util.List;

public interface StudentService {

    List<Student> getAllStudents();

    List<Student> searchStudents(String keyword);

    Student getStudentById(Long id);

    Student createStudent(StudentDTO studentDTO);

    Student updateStudent(Long id, StudentDTO studentDTO);

    void deleteStudent(Long id);

    StatsDTO getStats();
}
