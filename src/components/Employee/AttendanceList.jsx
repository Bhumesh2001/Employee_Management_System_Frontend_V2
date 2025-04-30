import { useEffect, useState } from "react";
import { Card, Table, Button, Row, Col, Alert } from "react-bootstrap";
import { getData, postData } from "../../utils/api"; 

export default function AttendanceList() {
    const [attendances, setAttendances] = useState([]);
    const [message, setMessage] = useState("");
    const [variant, setVariant] = useState("success");

    useEffect(() => {
        fetchAttendances();
    }, []);

    const fetchAttendances = async () => {
        try {
            const data = await getData("/attendance");
            setAttendances(data.data);
        } catch (error) {
            console.error("Fetch error:", error);
            setVariant("danger");
            setMessage("Failed to load attendance.");
        }
    };

    const handleAction = async (type) => {
        try {
            await postData(`/attendance/${type}`);
            setVariant("success");
            setMessage(`Successfully ${type === "signin" ? "signed in" : "signed out"}.`);
            fetchAttendances(); // Refresh list
        } catch (error) {
            console.error(`${type} error:`, error);
            setVariant("danger");
            setMessage(error?.response?.data?.message || `Failed to ${type}.`);
        }
    };

    return (
        <Card className="p-4 shadow-sm">
            <h2 className="mb-4">Attendance List</h2>

            {message && (
                <Alert
                    variant={variant}
                    dismissible
                    onClose={() => setMessage("")}
                >
                    {message}
                </Alert>
            )}

            <Row className="mb-3">
                <Col>
                    <Button variant="success" onClick={() => handleAction("signin")}>
                        Sign In
                    </Button>
                </Col>
                <Col>
                    <Button variant="danger" onClick={() => handleAction("signout")}>
                        Sign Out
                    </Button>
                </Col>
            </Row>

            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Date</th>
                        <th>Sign In</th>
                        <th>Sign Out</th>
                    </tr>
                </thead>
                <tbody>
                    {attendances.length > 0 ? (
                        attendances.map((attendance, index) => (
                            <tr key={attendance._id}>
                                <td>{index + 1}</td>
                                <td>{new Date(attendance.date).toLocaleDateString()}</td>
                                <td>{attendance.signIn || "-"}</td>
                                <td>{attendance.signOut || "-"}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center">
                                No attendance records found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </Card>
    );
};
