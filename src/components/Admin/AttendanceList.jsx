import { useState, useEffect } from "react";
import { Card, Table, Form } from "react-bootstrap";
import { getData } from '../../utils/api';

export default function AttendanceList() {
    const [attendances, setAttendances] = useState([]);
    const [filteredAttendances, setFilteredAttendances] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchAttendances = async () => {
            try {
                const data = await getData('/attendance/all');
                setAttendances(data.data);
                setFilteredAttendances(data.data);
            } catch (error) {
                setError("Failed to fetch attendance data.");
                console.error(error.response?.data || error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAttendances();
    }, []);

    useEffect(() => {
        const query = searchQuery.toLowerCase();
        const filtered = attendances.filter((att) => {
            const emp = att.employeeId || {};
            return (
                emp.name?.toLowerCase().includes(query) ||
                emp.email?.toLowerCase().includes(query) ||
                emp.position?.toLowerCase().includes(query) ||
                new Date(att.date).toLocaleDateString().includes(query)
            );
        });
        setFilteredAttendances(filtered);
    }, [searchQuery, attendances]);

    return (
        <Card className="p-4 shadow-sm">
            <h2 className="mb-4">Attendance List</h2>

            {/* Single Search Input */}
            <Form className="mb-3">
                <Form.Control
                    type="text"
                    placeholder="Search by name, email, position, or date"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </Form>

            {/* Table Display */}
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
                        {filteredAttendances.length > 0 ? (
                            filteredAttendances.map((attendance, index) => (
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
