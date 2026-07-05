package com.myreport.model;

public class UserVO {
    private String id;
    private String password;
    private String role;

    // 생성자1
    public UserVO() {}

    // 생성자2
    public UserVO(String id, String password, String role) {
        this.id =  id;
        this.password = password;
        this.role = role;
    }

    // getter, setter 함수
    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }

    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }
    public void setRole(String role) {
        this.role = role;
    }

    // 디버깅용 toString() 함수
    @Override
    public String toString() {
        return "UserVO [id=" + id + ", role=" + role + "]";
    }

}