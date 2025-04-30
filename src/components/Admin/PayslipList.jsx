import { useState, useEffect } from "react";
import { Table, Card, Alert, Form } from "react-bootstrap";
import { getData } from "../../utils/api";

export default function PayslipList() {
    const [payslips, setPayslips] = useState([]);
    const [filteredPayslips, setFilteredPayslips] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    // Fetch payslips from the API
    const fetchPayslips = async () => {
        try {
            setLoading(true);
            const res = await getData("/payslip");
            setPayslips(res.data);
            setFilteredPayslips(res.data);
        } catch (err) {
            setError("Failed to load payslips.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPayslips();
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, 300);
        return () => clearTimeout(timer);
    }, [search]);

    useEffect(() => {
        const value = debouncedSearch.toLowerCase();
        const filtered = payslips.filter((p) =>
            p.employeeId?.name?.toLowerCase().includes(value) ||
            p.employeeId?.email?.toLowerCase().includes(value)
        );
        setFilteredPayslips(filtered);
    }, [debouncedSearch, payslips]);

    return (
        <Card className="p-4 shadow-sm">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Payslip List</h2>
            </div>

            {error && <Alert variant="danger">{error}</Alert>}

            <Form.Control
                type="text"
                placeholder="Search by name or email"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="mb-3"
            />

            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Employee Name</th>
                        <th>Email</th>
                        <th>Month</th>
                        <th>Amount (₹)</th>
                        <th>Generated Date</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredPayslips.length > 0 ? (
                        filteredPayslips.map((payslip, index) => (
                            <tr key={payslip._id}>
                                <td>{index + 1}</td>
                                <td>{payslip.employeeId?.name || "N/A"}</td>
                                <td>{payslip.employeeId?.email || "N/A"}</td>
                                <td>{payslip.month}</td>
                                <td>{payslip.amount}</td>
                                <td>{new Date(payslip.generatedDate).toLocaleString()}</td>
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
        </Card>
    );
};
