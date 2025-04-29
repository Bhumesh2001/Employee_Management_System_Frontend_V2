import { useState } from "react";
import { Table, Button, Card } from "react-bootstrap";

export default function PayslipList() {
    const [payslips, setPayslips] = useState([
        {
            _id: "680ccbb4c4849572c014b526",
            employeeId: {
                _id: "680b4419e9308d5faf53ab91",
                email: "employee@example.com",
                name: "Employee One",
                role: "employee",
            },
            month: "April 2025",
            amount: 45000,
            generatedDate: "2025-04-26T12:04:04.285Z",
        },
    ]);

    const handleGeneratePayslip = () => {
        const newPayslip = {
            _id: Date.now().toString(),
            employeeId: {
                _id: "680b4419e9308d5faf53ab91",
                email: "employee@example.com",
                name: "Employee One",
                role: "employee",
            },
            month: "May 2025", // Change dynamically as needed
            amount: 50000,
            generatedDate: new Date().toISOString(),
        };
        setPayslips((prevPayslips) => [...prevPayslips, newPayslip]);
    };

    return (
        <Card className="p-4 shadow-sm">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Payslip List</h2>
                <Button variant="success" onClick={handleGeneratePayslip}>
                    Generate Payslip
                </Button>
            </div>
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
                    {payslips.length > 0 ? (
                        payslips.map((payslip, index) => (
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
