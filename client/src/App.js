import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import StudentForm from "./components/StudentForm";
import LoginStudent from "./components/LoginStudent";
import TeacherForm from "./components/TeacherForm";
import LoginTeacher from "./components/LoginTeacher";
import AddEdit from "./AddEdit";
import View from "./View";
//import ProtectedStudentRoute from "./components/protected/ProtectedStudentRoute";
import ProtectedTeacherRoute from "./components/protected/ProtectedTeacherRoute";
import QuizForm from "./QuizForm";
function App() {
  return (
    <>
      <Router>
        <Navbar />
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/register/student" element={<StudentForm />} />
            <Route exact path="/register/teacher" element={<TeacherForm />} />
            <Route exact path="/login/student" element={<LoginStudent />} />
            <Route exact path="/login/teacher" element={<LoginTeacher />} />
            <Route
              exact
              path="/quiz/create"
              element={
                <ProtectedTeacherRoute>
                  <QuizForm />
                </ProtectedTeacherRoute>
              }
            />
            <Route exact path="/addstudent" Component={AddEdit} />
            <Route exact path="/update/:id" Component={AddEdit} />
            <Route exact path="/view/:id" Component={View} />
            <Route
              exact
              path="*"
              element={
                <h2 className="text-center text-danger mt-4">
                  Error 404 - Page Not Found!
                </h2>
              }
            />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
