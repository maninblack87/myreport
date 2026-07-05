package com.myreport.util;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordUtil {

    // ★☆★ 해싱을 수행하는 도구
    private static BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // 비밀번호를 해싱하는 함수
    public static String hashPassword(String password) {
        return passwordEncoder.encode(password);
    }

    // 입력한 비밀번호와 해싱된 비밀번호를 비교하는 함수
    public static boolean checkPassword(String rawPassword, String hashedPassword) {
        return passwordEncoder.matches(rawPassword, hashedPassword);
    }
    
}
