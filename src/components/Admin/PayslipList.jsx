import { useState, useEffect } from "react";
import { Table, Button, Card, Alert, Modal, Form } from "react-bootstrap";
import { getData, postData } from "../../utils/api";

export default function PayslipList() {
    const [payslips, setPayslips] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [showModal, setShowModal] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [formData, setFormData] = useState({
        month: "",
        amount: "",
    });

    const handleShowModal = (employee) => {
        setSelectedEmployee(employee);
        setFormData({ month: "", amount: "" });
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedEmployee(null);
    };

    // Fetch payslips from the API
    const fetchPayslips = async () => {
        try {
            setLoading(true);
            const res = await getData("/payslip");
            setPayslips(res.data);
        } catch (err) {
            setError("Failed to load payslips.");
        } finally {
            setLoading(false);
        }
    };

    const handleGenerate = async () => {
        const newPayslip = {
            employeeId: selectedEmployee._id,
            month: formData.month,
            amount: Number(formData.amount)
        };
        try {
            await postData('/payslip', newPayslip);
            setPayslips([...payslips, newPayslip]);
            handleCloseModal();
        } catch (error) {
            console.error('Failed to generate payslip:', error.response.data.message);
            alert(error.response.data.message || 'Error generating payslip');
        }
    };

    useEffect(() => {
        fetchPayslips();
    }, []);

    return (
        <Card className="p-4 shadow-sm">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Payslip List</h2>
            </div>
            {error && <Alert variant="danger">{error}</Alert>}

            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Employee Name</th>
                        <th>Email</th>
                        <th>Month</th>
                        <th>Amount (₹)</th>
                        <th>Generated Date</th>
                        {/* <th>Actions</th> */}
                    </tr>
                </thead>
                <tbody>
                    {payslips.length > 0 ? (
                        payslips.map((payslip, index) => (
                            <tr key={payslip._id}>
                                <td>{index + 1}</td>
                                <td>{payslip.employeeId?.name || "N/A"}</td>
                                <td>{payslip.employeeId?.email || "N/A"}</td>
                                <td>{payslip.month}</td>
                                <td>{payslip.amount}</td>
                                <td>{new Date(payslip.generatedDate).toLocaleString()}</td>
                                {/* <td>
                                    <Button
                                        variant="primary"
                                        size="sm"
                                        onClick={() => handleShowModal(payslip.employeeId)}
                                    >
                                        Generate New
                                    </Button>
                                </td> */}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center">
                                No payslips found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>

            {/* Modal */}
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
                                value={formData.month}
                                onChange={(e) => setFormData({ ...formData, month: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Amount (₹)</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="45000"
                                value={formData.amount}
                                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>Cancel</Button>
                    <Button variant="success" onClick={handleGenerate}>Generate</Button>
                </Modal.Footer>
            </Modal>
        </Card>
    );
};
