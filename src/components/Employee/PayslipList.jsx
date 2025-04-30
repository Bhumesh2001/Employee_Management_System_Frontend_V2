import { useEffect, useState } from "react";
import { Card, Table, Button, Spinner, Alert } from "react-bootstrap";
import { getData } from "../../utils/api"; 

export default function PayslipList() {
    const [payslips, setPayslips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetchPayslips();
    }, []);

    const fetchPayslips = async () => {
        try {
            const data = await getData("/payslip/my");
            setPayslips(data.data);
        } catch (error) {
            console.error("Error fetching payslips:", error);
            setMessage("Failed to fetch payslip data.");
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = (payslip) => {
        const payslipContent = `
Payslip ID: ${payslip._id}
Month: ${payslip.month}
Amount: ₹${payslip.amount}
Generated Date: ${new Date(payslip.generatedDate).toLocaleDateString()}
        `;
        const blob = new Blob([payslipContent], { type: "text/plain;charset=utf-8" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `Payslip_${payslip.month}.txt`;
        a.click();
        window.URL.revokeObjectURL(url);
    };

    return (
        <Card className="p-4 shadow-sm">
            <h2 className="mb-4 text-center">Payslip List</h2>

            {message && <Alert variant="danger">{message}</Alert>}
            {loading ? (
                <div className="text-center">
                    <Spinner animation="border" />
                </div>
            ) : (
                <Table responsive bordered hover>
                    <thead className="table-dark">
                        <tr>
                            <th>#</th>
                            <th>Month</th>
                            <th>Amount</th>
                            <th>Generated Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payslips.length > 0 ? (
                            payslips.map((payslip, index) => (
                                <tr key={payslip._id}>
                                    <td>{index + 1}</td>
                                    <td>{payslip.month}</td>
                                    <td>₹{payslip.amount}</td>
                                    <td>{new Date(payslip.generatedDate).toLocaleDateString()}</td>
                                    <td>
                                        <Button
                                            variant="success"
                                            size="sm"
                                            onClick={() => handleDownload(payslip)}
                                        >
                                            Download
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center">
                                    No payslips found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            )}
        </Card>
    );
};
