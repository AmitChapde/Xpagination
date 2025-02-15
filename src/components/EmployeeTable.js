import React, { useEffect, useState } from "react";

const EmployeeTable = () => {
  const API_URL =
    "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";
  const ITEMS_PER_PAGE = 10; 

  const [employees, setEmployees] = useState([]); 
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);

 
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("failed to fetch data");

        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        alert("failed to fetch data");
        setError("Failed to fetch data");
      }
    };

    fetchEmployees();
  }, []);

  const totalPages = Math.ceil(employees.length / ITEMS_PER_PAGE);

 
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentEmployees = employees.slice(indexOfFirstItem, indexOfLastItem);

 
  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  if (error) return <p>Failed to load data</p>;

  return (
    <div>
      <h2>Employee Data</h2>

     
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {currentEmployees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

     
      <div style={{ marginTop: "10px" }}>
        <button onClick={handlePrev} >
          Previous
        </button>

        <span style={{ margin: "0 10px" }}>
          Page {currentPage} of {totalPages}
        </span>

        <button onClick={handleNext} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default EmployeeTable;
