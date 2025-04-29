import { useState, useEffect } from "react";
import { Table, Button, Card, Modal, Form } from "react-bootstrap";
import { patchData, getData } from '../../utils/api';

export default function LeaveList() {
    const [leaves, setLeaves] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedLeave, setSelectedLeave] = useState(null);
    const [updatedStatus, setUpdatedStatus] = useState("");

    // Fetch leaves from the API
    useEffect(() => {
        const fetchLeaves = async () => {
            try {
                const leavesData = await getData("/leave");  // Fetch all leave requests
                setLeaves(leavesData);
            } catch (error) {
                console.error("Error fetching leave requests:", error);
            }
        };
        fetchLeaves();
    }, []);

    // Open the modal to update the leave status
    const handleOpenModal = (leave) => {
        setSelectedLeave(leave);
        setUpdatedStatus(leave.status);
        setShowModal(true);
    };

    // Close the modal
    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedLeave(null);
        setUpdatedStatus("");
    };

    // Update the leave status
    const handleUpdateStatus = async () => {
        try {
            // Send a PATCH request to update the leave status
            const updatedLeave = await patchData(`/leave/${selectedLeave._id}`, { status: updatedStatus });

            // Update the state with the new status
            setLeaves((prevLeaves) =>
                prevLeaves.map((leave) =>
                    leave._id === selectedLeave._id ? { ...leave, status: updatedStatus } : leave
                )
            );

            handleCloseModal();
            console.log("Leave status updated successfully:", updatedLeave);
            alert('Leave status updated successfully');
        } catch (error) {
            console.error("Error updating leave status:", error);
            alert('Error updating leave status');
        }
    };

    return (
        <>
            <Card className="p-4 shadow-sm">
                <h2 className="mb-4">All Leave Requests</h2>
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Employee Name</th>
                            <th>Email</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaves.length > 0 ? (
                            leaves.map((leave, index) => (
                                <tr key={leave._id}>
                                    <td>{index + 1}</td>
                                    <td>{leave.employeeId.name}</td>
                                    <td>{leave.employeeId.email}</td>
                                    <td>{new Date(leave.startDate).toLocaleDateString()}</td>
                                    <td>{new Date(leave.endDate).toLocaleDateString()}</td>
                                    <td>
                                        <span
                                            className={`badge ${leave.status === "Pending"
                                                ? "bg-warning"
                                                : leave.status === "Approved"
                                                    ? "bg-success"
                                                    : "bg-danger"
                                                }`}
                                        >
                                            {leave.status}
                                        </span>
                                    </td>
                                    <td>
                                        <Button
                                            variant="primary"
                                            size="sm"
                                            onClick={() => handleOpenModal(leave)}
                                        >
                                            Update Status
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center">
                                    No leave requests found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </Card>

            {/* Update Status Modal */}
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Update Leave Status</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Status</Form.Label>
                        <Form.Select
                            value={updatedStatus}
                            onChange={(e) => setUpdatedStatus(e.target.value)}
                        >
                            <option value="Pending">Pending</option>
                            <option value="Approved">Approved</option>
                            <option value="Rejected">Rejected</option>
                        </Form.Select>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancel
                    </Button>
                    <Button variant="success" onClick={handleUpdateStatus}>
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
