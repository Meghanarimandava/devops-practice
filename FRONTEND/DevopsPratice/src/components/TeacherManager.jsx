import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';
import config from './config.js';

const TeacherManager = () => {
  const [teachers, setTeachers] = useState([]);
  const [teacher, setTeacher] = useState({
    id: '',
    name: '',
    gender: '',
    department: '',
    qualification: '',
    designation: '',
    email: '',
    password: '',
    contact: ''
  });
  const [idToFetch, setIdToFetch] = useState('');
  const [fetchedTeacher, setFetchedTeacher] = useState(null);
  const [message, setMessage] = useState('');
  const [editMode, setEditMode] = useState(false);

  const baseUrl = `${config.url}`;

  useEffect(() => {
    fetchAllTeachers();
  }, []);


  const fetchAllTeachers = async () => {
    try {
      const res = await axios.get(`${baseUrl}/all`);
      console.log("API response:", res.data);

      if (Array.isArray(res.data)) {
        setTeachers(res.data);
      } else if (res.data) {
        setTeachers([res.data]);
      } else {
        setTeachers([]);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setMessage("Failed to fetch teachers.");
      setTeachers([]);
    }
  };

  const handleChange = (e) => {
    setTeacher({ ...teacher, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    for (let key in teacher) {
      if (!teacher[key] || teacher[key].toString().trim() === '') {
        setMessage(`Please fill out the ${key} field.`);
        return false;
      }
    }
    return true;
  };

  const addTeacher = async () => {
    if (!validateForm()) return;
    try {
      await axios.post(`${baseUrl}/add`, teacher);
      setMessage('Teacher added successfully.');
      fetchAllTeachers();
      resetForm();
    } catch (error) {
      setMessage('Error adding teacher.');
    }
  };

  const updateTeacher = async () => {
    if (!validateForm()) return;
    try {
      await axios.put(`${baseUrl}/update`, teacher);
      setMessage('Teacher updated successfully.');
      fetchAllTeachers();
      resetForm();
    } catch (error) {
      setMessage('Error updating teacher.');
    }
  };

  const deleteTeacher = async (id) => {
    try {
      const res = await axios.delete(`${baseUrl}/delete/${id}`);
      setMessage(res.data);
      fetchAllTeachers();
    } catch (error) {
      setMessage('Error deleting teacher.');
    }
  };

  
  const getTeacherById = async () => {
    try {
      const res = await axios.get(`${baseUrl}/get/${idToFetch}`);
      console.log("Get by ID response:", res.data);

      if (res.data && typeof res.data === "object") {
        setFetchedTeacher(res.data);
        setMessage('');
      } else {
        setFetchedTeacher(null);
        setMessage('Teacher not found.');
      }
    } catch (error) {
      console.error("Fetch by ID error:", error);
      setFetchedTeacher(null);
      setMessage('Teacher not found.');
    }
  };

  const handleEdit = (tch) => {
    setTeacher(tch);
    setEditMode(true);
    setMessage(`Editing teacher with ID ${tch.id}`);
  };

  const resetForm = () => {
    setTeacher({
      id: '',
      name: '',
      gender: '',
      department: '',
      qualification: '',
      designation: '',
      email: '',
      password: '',
      contact: ''
    });
    setEditMode(false);
  };

  return (
    <div className="main-container">
      <div className="teacher-container">

        {message && (
          <div className={`message-banner ${message.toLowerCase().includes('error') ? 'error' : 'success'}`}>
            {message}
          </div>
        )}

        <h2>Teacher Management System</h2>

        <div>
          <h3>{editMode ? 'Edit Teacher' : 'Add Teacher'}</h3>
          <div className="form-grid">
            <input type="number" name="id" placeholder="ID" value={teacher.id} onChange={handleChange} />
            <input type="text" name="name" placeholder="Name" value={teacher.name} onChange={handleChange} />
            <select name="gender" value={teacher.gender} onChange={handleChange}>
              <option value="">Select Gender</option>
              <option value="MALE">MALE</option>
              <option value="FEMALE">FEMALE</option>
            </select>
            <input type="text" name="department" placeholder="Department" value={teacher.department} onChange={handleChange} />
            <input type="text" name="qualification" placeholder="Qualification" value={teacher.qualification} onChange={handleChange} />
            <input type="text" name="designation" placeholder="Designation" value={teacher.designation} onChange={handleChange} />
            <input type="email" name="email" placeholder="Email" value={teacher.email} onChange={handleChange} />
            <input type="password" name="password" placeholder="Password" value={teacher.password} onChange={handleChange} />
            <input type="text" name="contact" placeholder="Contact" value={teacher.contact} onChange={handleChange} />
          </div>

          <div className="btn-group">
            {!editMode ? (
              <button className="btn-blue" onClick={addTeacher}>Add Teacher</button>
            ) : (
              <>
                <button className="btn-green" onClick={updateTeacher}>Update Teacher</button>
                <button className="btn-gray" onClick={resetForm}>Cancel</button>
              </>
            )}
          </div>
        </div>

        <div>
          <h3>Get Teacher By ID</h3>
          <input
            type="number"
            value={idToFetch}
            onChange={(e) => setIdToFetch(e.target.value)}
            placeholder="Enter ID"
          />
          <button className="btn-blue" onClick={getTeacherById}>Fetch</button>

          {fetchedTeacher && (
            <div>
              <h4>Teacher Found:</h4>
              <pre>{JSON.stringify(fetchedTeacher, null, 2)}</pre>
            </div>
          )}
        </div>

        <div>
          <h3>All Teachers</h3>
          {teachers.length === 0 ? (
            <p>No teachers found.</p>
          ) : (
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    {Object.keys(teacher).map((key) => (
                      <th key={key}>{key}</th>
                    ))}
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {teachers.map((tch) => (
                    <tr key={tch.id}>
                      {Object.keys(teacher).map((key) => (
                        <td key={key}>{tch[key]}</td>
                      ))}
                      <td>
                        <div className="action-buttons">
                          <button className="btn-green" onClick={() => handleEdit(tch)}>Edit</button>
                          <button className="btn-red" onClick={() => deleteTeacher(tch.id)}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default TeacherManager;
