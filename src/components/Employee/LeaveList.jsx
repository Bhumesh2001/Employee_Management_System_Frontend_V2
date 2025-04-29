import { useState } from "react";
import { Card, Table, Button } from "react-bootstrap";

export default function LeaveList() {
    const [leaves, setLeaves] = useState([
        {
            _id: "680cc821c4849572c014b516",
            startDate: "2025-04-26T00:00:00.000Z",
            endDate: "2025-04-29T00:00:00.000Z",
            status: "Pending",
        },
    ]);

    return (
        <Card className="p-4 shadow-sm">
            <h2 className="mb-4">Leave Requests</h2>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {leaves.length > 0 ? (
                        leaves.map((leave, index) => (
                            <tr key={leave._id}>
                                <td>{index + 1}</td>
                                <td>{new Date(leave.startDate).toLocaleDateString()}</td>
                                <td>{new Date(leave.endDate).toLocaleDateString()}</td>
                                <td>
                                    <span
                                        className={`badge ${leave.status === "Approved" ? "bg-success" : "bg-warning text-dark"
                                            }`}
                                    >
                                        {leave.status}
                                    </span>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center">
                                No leave requests found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </Card>
    );
};
