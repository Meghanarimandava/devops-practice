package com.klef.devops.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "teacher_table")
public class Teacher {
    @Id
    @Column(name = "teacher_id")
    private int id;

    @Column(name = "teacher_name", nullable = false, length = 50)
    private String name;

    @Column(name = "teacher_gender", nullable = false, length = 10)
    private String gender; // FEMALE or MALE

    @Column(name = "teacher_department", nullable = false, length = 20)
    private String department;

    @Column(name = "teacher_qualification", nullable = false, length = 30)
    private String qualification; // M.Tech, PhD, etc.

    @Column(name = "teacher_designation", nullable = false, length = 30)
    private String designation; // Assistant Prof, Associate Prof, Professor

    @Column(name = "teacher_email", nullable = false, unique = true, length = 50)
    private String email;

    @Column(name = "teacher_password", nullable = false, length = 50)
    private String password;

    @Column(name = "teacher_contact", nullable = false, unique = true, length = 20)
    private String contact;

    // Getters and Setters
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    public String getGender() {
        return gender;
    }
    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getDepartment() {
        return department;
    }
    public void setDepartment(String department) {
        this.department = department;
    }

    public String getQualification() {
        return qualification;
    }
    public void setQualification(String qualification) {
        this.qualification = qualification;
    }

    public String getDesignation() {
        return designation;
    }
    public void setDesignation(String designation) {
        this.designation = designation;
    }

    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }

    public String getContact() {
        return contact;
    }
    public void setContact(String contact) {
        this.contact = contact;
    }

    @Override
    public String toString() {
        return "Teacher [id=" + id + ", name=" + name + ", gender=" + gender + ", department=" + department
                + ", qualification=" + qualification + ", designation=" + designation
                + ", email=" + email + ", password=" + password + ", contact=" + contact + "]";
    }
}