package com.studentmanagement.service.impl;

import com.studentmanagement.dto.StatsDTO;
import com.studentmanagement.dto.StudentDTO;
import com.studentmanagement.entity.Student;
import com.studentmanagement.exception.DuplicateResourceException;
import com.studentmanagement.exception.ResourceNotFoundException;
import com.studentmanagement.repository.StudentRepository;
import com.studentmanagement.service.StudentService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class StudentServiceImpl implements StudentService {

    private final StudentRepository studentRepository;

    public StudentServiceImpl(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public List<Student> searchStudents(String keyword) {
        if (keyword == null || keyword.trim().isEmpty()) {
            return studentRepository.findAll();
        }
        return studentRepository.searchStudents(keyword.trim());
    }

    @Override
    @Transactional(readOnly = true)
    public Student getStudentById(Long id) {
        return studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with ID: " + id));
    }

    @Override
    @Transactional
    public Student createStudent(StudentDTO studentDTO) {
        String cleanEmail = studentDTO.getEmail().trim().toLowerCase();
        if (studentRepository.existsByEmail(cleanEmail)) {
            throw new DuplicateResourceException("Student with email '" + cleanEmail + "' already exists");
        }

        Student student = new Student();
        student.setName(studentDTO.getName().trim());
        student.setEmail(cleanEmail);
        student.setPhone(studentDTO.getPhone().trim());
        student.setCourse(studentDTO.getCourse().trim());
        student.setDepartment(studentDTO.getDepartment().trim());
        student.setYear(studentDTO.getYear().trim());
        student.setAddress(studentDTO.getAddress().trim());
        student.setStatus((studentDTO.getStatus() != null && !studentDTO.getStatus().trim().isEmpty())
                ? studentDTO.getStatus().trim()
                : "Active");

        return studentRepository.save(student);
    }

    @Override
    @Transactional
    public Student updateStudent(Long id, StudentDTO studentDTO) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with ID: " + id));

        String cleanEmail = studentDTO.getEmail().trim().toLowerCase();
        if (studentRepository.existsByEmailAndIdNot(cleanEmail, id)) {
            throw new DuplicateResourceException("Student with email '" + cleanEmail + "' already exists");
        }

        student.setName(studentDTO.getName().trim());
        student.setEmail(cleanEmail);
        student.setPhone(studentDTO.getPhone().trim());
        student.setCourse(studentDTO.getCourse().trim());
        student.setDepartment(studentDTO.getDepartment().trim());
        student.setYear(studentDTO.getYear().trim());
        student.setAddress(studentDTO.getAddress().trim());
        if (studentDTO.getStatus() != null && !studentDTO.getStatus().trim().isEmpty()) {
            student.setStatus(studentDTO.getStatus().trim());
        }

        return studentRepository.save(student);
    }

    @Override
    @Transactional
    public void deleteStudent(Long id) {
        if (!studentRepository.existsById(id)) {
            throw new ResourceNotFoundException("Student not found with ID: " + id);
        }
        studentRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public StatsDTO getStats() {
        long totalStudents = studentRepository.count();
        long activeStudents = studentRepository.countByStatusIgnoreCase("Active");
        long totalCourses = studentRepository.findDistinctCourses().size();
        long totalDepartments = studentRepository.findDistinctDepartments().size();

        Map<String, Long> deptMap = new HashMap<>();
        List<Object[]> deptResults = studentRepository.countStudentsByDepartment();
        for (Object[] row : deptResults) {
            if (row[0] != null) {
                deptMap.put((String) row[0], ((Number) row[1]).longValue());
            }
        }

        Map<String, Long> yearMap = new HashMap<>();
        List<Object[]> yearResults = studentRepository.countStudentsByYear();
        for (Object[] row : yearResults) {
            if (row[0] != null) {
                yearMap.put((String) row[0], ((Number) row[1]).longValue());
            }
        }

        return new StatsDTO(totalStudents, activeStudents, totalCourses, totalDepartments, deptMap, yearMap);
    }
}
