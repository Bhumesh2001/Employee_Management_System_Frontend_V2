import { useState, useEffect } from "react";
import { Card, Table, Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getData } from "../../utils/api"; 

export default function LeaveList() {
    const [leaves, setLeaves] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLeaves = async () => {
            try {
                const data = await getData("/leave/my");                
                setLeaves(data.data);
            } catch (error) {
                console.error("Failed to fetch leaves:", error?.response?.data || error.message);
                alert("Error fetching leave requests.");
            } finally {
                setLoading(false);
            }
        };
        fetchLeaves();
    }, []);

    return (
        <Card className="p-4 shadow-sm">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="mb-0">Leave Requests</h2>
                <Button variant="primary" onClick={() => navigate("/employee/apply-leave")}>
                    Apply Leave
                </Button>
            </div>
            {loading ? (
                <div className="text-center my-4">
                    <Spinner animation="border" variant="primary" />
                </div>
            ) : (
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
                                            className={`badge ${leave.status === "Approved"
                                                ? "bg-success"
                                                : leave.status === "Rejected"
                                                    ? "bg-danger"
                                                    : "bg-warning text-dark"
                                                }`}
                                        >
                                            {leave.status}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center">
                                    No leave requests found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            )}
        </Card>
    );
};
