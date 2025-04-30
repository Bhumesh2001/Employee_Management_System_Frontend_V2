import { useState } from "react";
import { Card, Form, Button, Row, Col, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { postData } from "../../utils/api"; // adjust the path if needed

export default function ApplyLeave() {
    const [formData, setFormData] = useState({
        startDate: "",
        endDate: "",
    });

    const [message, setMessage] = useState("");
    const [variant, setVariant] = useState("danger");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.startDate || !formData.endDate) {
            setVariant("danger");
            setMessage("Please fill both Start and End Dates!");
            return;
        }

        if (formData.startDate > formData.endDate) {
            setVariant("danger");
            setMessage("Start Date cannot be after End Date!");
            return;
        }

        try {
            await postData("/leave", formData);
            setVariant("success");
            setMessage("Leave Applied Successfully!");
            setFormData({ startDate: "", endDate: "" });

            setTimeout(() => navigate("/employee/leaves"), 1500);
        } catch (error) {
            console.error("Apply leave error:", error);
            setVariant("danger");
            setMessage(
                error?.response?.data?.message || "Failed to apply for leave."
            );
        }
    };

    return (
        <Card className="p-4 shadow-sm">
            <h2 className="mb-4 text-center">Apply for Leave</h2>

            {message && (
                <Alert
                    variant={variant}
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
                                required
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
                                required
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
