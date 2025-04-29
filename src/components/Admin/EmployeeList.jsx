import { useState, useEffect } from "react";
import { Table, Button, Card } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { getData, deleteData } from '../../utils/api';

export default function EmployeeList() {
    const navigate = useNavigate();
    const [employees, setEmployees] = useState([]);

    // Fetch the employee list from the API when the component mounts
    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const data = await getData('/employee');  // Replace with your correct endpoint
                setEmployees(data);  // Store the fetched employee data in the state
            } catch (error) {
                console.error("Error fetching employees:", error);
            }
        };
        fetchEmployees();
    }, []);

    const handleEdit = (employeeId) => {
        console.log("Edit Employee:", employeeId);
        navigate(`/edit-employee/${employeeId}`);
    };

    const handleDelete = async (employeeId) => {
        if (window.confirm("Are you sure you want to delete this employee?")) {
            try {
                await deleteData(`/employee/${employeeId}`);
                setEmployees(employees.filter((emp) => emp.id !== employeeId));
            } catch (error) {
                console.error("Error deleting employee:", error);
            }
        }
    };

    return (
        <Card className="p-4 shadow-sm">
            <h2 className="mb-4">Employee List</h2>
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
                            <tr key={employee.id}>
                                <td>{index + 1}</td>
                                <td>{employee.name}</td>
                                <td>{employee.email}</td>
                                <td>{employee.position}</td>
                                <td>
                                    <Button
                                        variant="warning"
                                        size="sm"
                                        className="me-2 mb-2"
                                        onClick={() => handleEdit(employee.id)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="danger"
                                        size="sm mb-2"
                                        onClick={() => handleDelete(employee.id)}
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
