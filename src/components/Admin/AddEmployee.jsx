import { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { useNavigate } from 'react-router-dom'
import { postData } from "../../utils/api";

export default function AddEmployee() {
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
        try {
            await postData('/employee', formData);
            alert('Employee created successfully');
            setFormData({
                email: "",
                password: "",
                name: "",
                role: "employee",
                position: "",
            });
            navigate('/admin/employees')
        } catch (error) {
            console.log(error?.response?.data || error.message);
            alert(error?.response?.data.message || error.message);
        }
    };

    return (
        <Card className="p-4 shadow-sm">
            <Card.Body>
                <h2 className="text-center mb-4">Add Employee</h2>
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
                        Add Employee
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
};
