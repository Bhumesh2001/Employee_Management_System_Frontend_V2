import { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { postData } from "../../utils/api";

export default function AddEmployee() {
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
            const data = await postData('/employee', formData);
            console.log(data, '==');
            alert('Employee created successfully');
        } catch (error) {
            console.log(error);
            alert(error.message);
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
