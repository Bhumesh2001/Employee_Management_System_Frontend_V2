import { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { putData } from '../../utils/api'; 

export default function EditEmployee() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        name: "",
        role: "employee",
        position: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Employee Data:", formData);
        try {
            const updatedEmployee = await putData(`/employee/${id}`, formData);
            console.log("Employee updated successfully:", updatedEmployee);
            alert('Employee updated successfully');
            navigate(`/employee`);
        } catch (error) {
            console.error("Error updating employee data:", error);
            alert(error.message);
        }
    };

    return (
        <Card className="p-4 shadow-sm">
            <Card.Body>
                <h2 className="text-center mb-4">Edit Employee</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter full name"
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter email"
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter password"
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPosition">
                        <Form.Label>Position</Form.Label>
                        <Form.Control
                            type="text"
                            name="position"
                            value={formData.position}
                            onChange={handleChange}
                            placeholder="Enter position"
                            required
                        />
                    </Form.Group>

                    {/* Hidden field for role */}
                    <Form.Control type="hidden" name="role" value="employee" />

                    <Button variant="primary" type="submit">
                        Edit Employee
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
};
