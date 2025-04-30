import { useState, useEffect } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { getData, putData } from '../../utils/api';

export default function EditEmployee() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        name: "",
        role: "employee",
        position: "",
    });

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const data = await getData(`/employee/${id}`);                
                setFormData({
                    email: data.data.email,
                    name: data.data.name,
                    role: data.data.role || "employee",
                    position: data.data.position || "",
                });
            } catch (error) {
                console.error("Error fetching employee:", error?.response?.data || error.message);
                alert("Failed to fetch employee data.");
            }
        };
        fetchEmployee();
    }, [id]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await putData(`/employee/${id}`, formData);
            alert('Employee updated successfully');
            navigate(`/admin/employees`);
        } catch (error) {
            console.error("Error updating employee data:", error?.response?.data || error.message);
            alert(error?.response?.data || error.message);
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
                        Save
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
};
