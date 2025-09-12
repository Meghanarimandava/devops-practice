package com.klef.devops.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.klef.devops.entity.Teacher;
import com.klef.devops.repository.TeacherRepository;

@Service
public class TeacherServiceImpl implements TeacherService {

    @Autowired
    private TeacherRepository teacherRepository;

    @Override
    public Teacher addTeacher(Teacher teacher) {
        // Optional: check for duplicate email/contact before saving
        if (teacherRepository.findByEmail(teacher.getEmail()) != null) {
            throw new RuntimeException("Email already exists");
        }
        if (teacherRepository.findByContact(teacher.getContact()) != null) {
            throw new RuntimeException("Contact number already exists");
        }
        return teacherRepository.save(teacher);
    }

    @Override
    public List<Teacher> getAllTeachers() {
        return teacherRepository.findAll();
    }

    @Override
    public Teacher getTeacherById(int id) {
        Optional<Teacher> opt = teacherRepository.findById(id);
        return opt.orElse(null);
    }

    @Override
    public Teacher updateTeacher(Teacher teacher) {
        if (!teacherRepository.existsById(teacher.getId())) {
            throw new RuntimeException("Teacher with ID " + teacher.getId() + " not found");
        }
        return teacherRepository.save(teacher);
    }

    @Override
    public void deleteTeacherById(int id) {
        if (!teacherRepository.existsById(id)) {
            throw new RuntimeException("Teacher with ID " + id + " not found");
        }
        teacherRepository.deleteById(id);
    }
}
