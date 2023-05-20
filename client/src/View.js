import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { Link } from 'react-router-dom';
import "./view.css"

function View() {
  const [user, setUser] = useState({});
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/get/${id}`)
      .then((resp) => setUser({ ...resp.data[0] }));
  }, [id]);
  return (
    <div style={{ marginTop: "150px" }}>
      <div className="card">
        <div className="card-header">
          <p>Student Details : </p>
        </div>
        <div className="container">
          <strong>ID : </strong>
          <span>{id}</span>
          <br />
          <br />
          <strong>Name : </strong>
          <span>{user.name}</span>
          <br />
          <br />
          <strong>Department Name: </strong>
          <span>{user.dept_name}</span>
          <br />
          <br />
          <strong>Total Credits : </strong>
          <span>{user.total_cred}</span>
          <br />
          <br />
          <Link to="/">
            <div className="btn btn-edit">Go Back</div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default View;
 