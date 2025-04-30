import { useState, useEffect } from "react";
import { Table, Button, Card } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { getData, deleteData } from '../../utils/api';

export default function EmployeeList() {
    const navigate = useNavigate();
    const [employees, setEmployees] = useState([]);

    const fetchEmployees = async () => {
        try {
            const data = await getData('/employee');
            setEmployees(data.data);
        } catch (error) {
            console.error("Error fetching employees:", error.response.data);
        }
    };
    useEffect(() => {  
        fetchEmployees();
    }, []);


    const handleAddEmployee = () => {
        navigate('/admin/add-employee');
    };

    const handleEdit = (employeeId) => {
        navigate(`/admin/edit-employee/${employeeId}`);
    };

    const handleDelete = async (employeeId) => {
        if (window.confirm("Are you sure you want to delete this employee?")) {
            try {
                await deleteData(`/employee/${employeeId}`);
                fetchEmployees();
                setEmployees(employees.filter((emp) => emp.id !== employeeId));
            } catch (error) {
                console.error("Error deleting employee:", error.response.data);
            }
        }
    };

    return (
        <Card className="p-4 shadow-sm">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Employee List</h2>
                <Button variant="primary" onClick={handleAddEmployee}>
                    + Add Employee
                </Button>
            </div>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Position</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.length > 0 ? (
                        employees.map((employee, index) => (
                            <tr key={employee._id}>
                                <td>{index + 1}</td>
                                <td>{employee.name}</td>
                                <td>{employee.email}</td>
                                <td>{employee.position}</td>
                                <td>
                                    <Button
                                        variant="warning"
                                        size="sm"
                                        className="me-2 mb-2"
                                        onClick={() => handleEdit(employee._id)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="danger"
                                        size="sm mb-2"
                                        onClick={() => handleDelete(employee._id)}
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center">
                                No employees found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </Card>
    );
};
