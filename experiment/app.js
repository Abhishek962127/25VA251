import React from 'react';
import './app.css';
const Student = (props) => {
return (
<div className="student-card">
<h2>Student Details</h2>
<p>
<strong>Name:</strong> {props.name}
</p>
<p>
<strong>Course:</strong> {props.course}
</p>
<p>
<strong>Marks:</strong> {props.marks}
</p>
</div>
);
};
function App() {
return (
<div className="App">
<h1>Student Information System</h1>
<div className="student-container">
<Student
name="Monika"
course="B.Tech Data Science"
marks="95"
/>
<Student
name="Rahul"
course="B.Tech CS"
marks="88"
/>
<Student
name="Sneha"
course="B.Tech IT"
marks="92"
/>
</div>
</div>
);
}
export default Ap