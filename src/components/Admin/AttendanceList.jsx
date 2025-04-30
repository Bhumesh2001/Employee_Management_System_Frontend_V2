import { useState, useEffect } from "react";
import { Card, Table } from "react-bootstrap";
import { getData } from '../../utils/api';

export default function AttendanceList() {
    const [attendances, setAttendances] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAttendances = async () => {
            try {
                const data = await getData('/attendance/all');
                setAttendances(data.data);
            } catch (error) {
                setError("Failed to fetch attendance data.");
                console.error(error.response.data);
            } finally {
                setLoading(false);
            }
        };

        fetchAttendances();
    }, []);

    return (
        <Card className="p-4 shadow-sm">
            <h2 className="mb-4">Attendance List</h2>

            {/* Displaying a loading state while fetching data */}
            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div className="text-danger">{error}</div>
            ) : (
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Employee Name</th>
                            <th>Email</th>
                            <th>Position</th>
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
                                    <td>{attendance.employeeId?.name || "N/A"}</td>
                                    <td>{attendance.employeeId?.email || "N/A"}</td>
                                    <td>{attendance.employeeId?.position || "N/A"}</td>
                                    <td>{new Date(attendance.date).toLocaleDateString()}</td>
                                    <td>{attendance.signIn}</td>
                                    <td>{attendance.signOut}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center">
                                    No attendance records found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            )}
        </Card>
    );
};
