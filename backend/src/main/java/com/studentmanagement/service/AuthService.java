package com.studentmanagement.service;

import com.studentmanagement.dto.LoginRequest;
import com.studentmanagement.dto.LoginResponse;
import com.studentmanagement.dto.RegisterRequest;
import com.studentmanagement.entity.User;

public interface AuthService {

    LoginResponse login(LoginRequest request);

    LoginResponse register(RegisterRequest request);

    User getCurrentUser(String username);
}
