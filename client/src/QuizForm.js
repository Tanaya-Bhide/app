import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import axios from 'axios';
import './QuizForm.css'
const QuizForm = () => {
 
  const [data, setdata] = useState([]);
  const loadData = async () => {
    const response = await axios.get("http://localhost:3001/api/get");
    setdata(response.data);
  };
  useEffect(() => {
    loadData();
  }, []);
  const deletestudent = (id) => {
    if (window.confirm("Are you sure you want to delete that student ? ")) {
      axios.delete(`http://localhost:3001/api/remove/${id}`);
      toast.success("Student deleted successfully");
      setTimeout(() => loadData(), 500);
    }
  };
  return (
    <div style={{ marginTop: "100px" }}>
      <Link to="/addstudent">
        <button className="button">Add student</button>
      </Link>
      <br></br>
      <br></br>
      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>Student ID</th>
            <th style={{ textAlign: "center" }}>Name</th>
            <th style={{ textAlign: "center" }}>Department Name</th>
            <th style={{ textAlign: "center" }}>Total Credits</th>
            <th style={{ textAlign: "center" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((item, index) => {
              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.dept_name}</td>
                  <td>{item.total_cred}</td>
                  <td>
                    <Link to={`/update/${item.id}`}>
                      <button className="btn btn-edit">EDIT</button>
                    </Link>
                    <button
                      className="btn btn-delete"
                      onClick={() => deletestudent(item.id)}
                    >
                      DELETE
                    </button>
                    <Link to={`/view/${item.id}`}>
                      <button className="btn btn-view">VIEW</button>
                    </Link>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <br></br>
      <br></br>
    </div>
  );
};

export default QuizForm;
