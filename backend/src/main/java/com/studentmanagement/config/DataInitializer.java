package com.studentmanagement.config;

import com.studentmanagement.entity.Student;
import com.studentmanagement.entity.User;
import com.studentmanagement.repository.StudentRepository;
import com.studentmanagement.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(DataInitializer.class);

    private final UserRepository userRepository;
    private final StudentRepository studentRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(UserRepository userRepository,
                           StudentRepository studentRepository,
                           PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.studentRepository = studentRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        // Initialize default administrator user if table is empty
        if (userRepository.count() == 0) {
            User admin = new User();
            admin.setUsername("admin");
            admin.setEmail("admin@studentmanagement.com");
            admin.setPassword(passwordEncoder.encode("Admin@123"));
            admin.setRole("ROLE_ADMIN");
            userRepository.save(admin);
            log.info("Initialized default administrator user: username='admin', password='Admin@123'");
        }

        // Initialize sample student records if table is empty
        if (studentRepository.count() == 0) {
            List<Student> sampleStudents = Arrays.asList(
                    new Student("Alex Johnson", "alex.johnson@example.com", "+1-555-0101", "B.Sc Computer Science", "Computer Science", "3rd Year", "104 Tech Boulevard, San Jose, CA"),
                    new Student("Sophia Martinez", "sophia.martinez@example.com", "+1-555-0102", "B.Tech Information Technology", "Information Technology", "2nd Year", "23 Innovation Way, Austin, TX"),
                    new Student("Liam Davis", "liam.davis@example.com", "+1-555-0103", "B.Eng Electrical Engineering", "Electrical Engineering", "4th Year", "78 Edison Circle, Boston, MA"),
                    new Student("Emma Wilson", "emma.wilson@example.com", "+1-555-0104", "B.Eng Mechanical Engineering", "Mechanical Engineering", "1st Year", "45 Industrial Park, Detroit, MI"),
                    new Student("Ethan Brown", "ethan.brown@example.com", "+1-555-0105", "B.Sc Civil Engineering", "Civil Engineering", "3rd Year", "12 Bridge Street, Chicago, IL"),
                    new Student("Olivia Taylor", "olivia.taylor@example.com", "+1-555-0106", "B.Sc Computer Science", "Computer Science", "2nd Year", "89 Silicon Avenue, Seattle, WA"),
                    new Student("Noah Anderson", "noah.anderson@example.com", "+1-555-0107", "B.Tech Information Technology", "Information Technology", "4th Year", "56 Cyber Drive, New York, NY"),
                    new Student("Ava Thomas", "ava.thomas@example.com", "+1-555-0108", "B.Sc Data Science", "Computer Science", "1st Year", "34 Quantum Lane, Denver, CO")
            );

            studentRepository.saveAll(sampleStudents);
            log.info("Initialized {} sample student records.", sampleStudents.size());
        }
    }
}
