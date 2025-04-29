import { Card, Table, Button } from "react-bootstrap";

export default function PayslipList() {
    const payslips = [
        {
            _id: "680ccbb4c4849572c014b526",
            month: "April 2025",
            amount: 45000,
            generatedDate: "2025-04-26T12:04:04.285Z",
            __v: 0,
        },
        // You can add more payslips here later
    ];

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
                    {payslips.map((payslip, index) => (
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
                    ))}
                </tbody>
            </Table>
        </Card>
    );
};
