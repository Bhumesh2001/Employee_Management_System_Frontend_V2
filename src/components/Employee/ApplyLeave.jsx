import { useState } from "react";
import { Card, Form, Button, Row, Col, Alert } from "react-bootstrap";

export default function ApplyLeave() {
    const [formData, setFormData] = useState({
        startDate: "",
        endDate: "",
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.startDate || !formData.endDate) {
            setMessage("Please fill both Start and End Dates!");
            return;
        }
        if (formData.startDate > formData.endDate) {
            setMessage("Start Date cannot be after End Date!");
            return;
        }

        console.log("Leave Applied:", formData);
        setMessage("Leave Applied Successfully!");
        // Reset form
        setFormData({ startDate: "", endDate: "" });
    };

    return (
        <Card className="p-4 shadow-sm">
            <h2 className="mb-4 text-center">Apply for Leave</h2>

            {message && (
                <Alert
                    variant={message.includes("Successfully") ? "success" : "danger"}
                    onClose={() => setMessage("")}
                    dismissible
                >
                    {message}
                </Alert>
            )}

            <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group controlId="startDate">
                            <Form.Label>Start Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="startDate"
                                value={formData.startDate}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>

                    <Col md={6}>
                        <Form.Group controlId="endDate">
                            <Form.Label>End Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="endDate"
                                value={formData.endDate}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <div className="text-center">
                    <Button variant="primary" type="submit">
                        Apply Leave
                    </Button>
                </div>
            </Form>
        </Card>
    );
};
