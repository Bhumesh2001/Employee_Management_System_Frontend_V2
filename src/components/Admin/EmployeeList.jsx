import { useState, useEffect } from "react";
import { Table, Button, Card, Modal, Form } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { getData, deleteData, postData } from '../../utils/api';

export default function EmployeeList() {
    const navigate = useNavigate();
    const [employees, setEmployees] = useState([]);
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    const [showModal, setShowModal] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [formData, setFormData] = useState({
        month: "",
        amount: "",
    });

    const fetchEmployees = async () => {
        try {
            const data = await getData('/employee');
            setEmployees(data.data);
            setFilteredEmployees(data.data);
        } catch (error) {
            console.error("Error fetching employees:", error.response?.data || error.message);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, 300);
        return () => clearTimeout(timer);
    }, [search]);

    useEffect(() => {
        const value = debouncedSearch.toLowerCase();
        const result = employees.filter((emp) =>
            emp.name.toLowerCase().includes(value) ||
            emp.email.toLowerCase().includes(value) ||
            emp.position.toLowerCase().includes(value)
        );
        setFilteredEmployees(result);
    }, [debouncedSearch, employees]);

    const handleShowModal = (employee) => {
        setSelectedEmployee(employee);
        setFormData({ month: "", amount: "" });
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedEmployee(null);
    };

    const handleGenerate = async () => {
        const newPayslip = {
            employeeId: selectedEmployee._id,
            month: formData.month,
            amount: Number(formData.amount),
        };

        try {
            await postData('/payslip', newPayslip);
            alert('Payslip generated successfully!');
            handleCloseModal();
        } catch (error) {
            console.error('Failed to generate payslip:', error.response?.data?.message || error.message);
            alert(error.response?.data?.message || 'Error generating payslip');
        }
    };

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
                setEmployees(prev => prev.filter((emp) => emp._id !== employeeId));
                setFilteredEmployees(prev => prev.filter((emp) => emp._id !== employeeId));
            } catch (error) {
                console.error("Error deleting employee:", error.response?.data || error.message);
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

            <Form.Control
                type="text"
                placeholder="Search by Name, Email, or Position"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="mb-3"
            />

            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Position</th>
                        <th>Actions</th>
                        <th>Payslip</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredEmployees.length > 0 ? (
                        filteredEmployees.map((employee, index) => (
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
                                        size="sm"
                                        onClick={() => handleDelete(employee._id)}
                                    >
                                        Delete
                                    </Button>
                                </td>
                                <td>
                                    <Button
                                        variant="primary"
                                        size="sm"
                                        onClick={() => handleShowModal(employee)}
                                    >
                                        Generate New
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

            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Generate Payslip</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Month</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="April 2025"
                                value={formData.month || ""}
                                onChange={(e) => setFormData({ ...formData, month: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Amount (₹)</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="45000"
                                value={formData.amount || ""}
                                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>Cancel</Button>
                    <Button
                        variant="success"
                        onClick={handleGenerate}
                        disabled={!formData.month || !formData.amount}
                    >
                        Generate
                    </Button>
                </Modal.Footer>
            </Modal>
        </Card>
    );
};
