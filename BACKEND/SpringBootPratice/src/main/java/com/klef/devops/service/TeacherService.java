package com.klef.devops.service;

import java.util.List;
import com.klef.devops.entity.Teacher;

public interface TeacherService {
    Teacher addTeacher(Teacher teacher);
    List<Teacher> getAllTeachers();
    Teacher getTeacherById(int id);
    Teacher updateTeacher(Teacher teacher);
    void deleteTeacherById(int id);
}
