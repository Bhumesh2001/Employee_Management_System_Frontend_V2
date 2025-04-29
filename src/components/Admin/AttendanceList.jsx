import { useState, useEffect } from "react";
import { Card, Table } from "react-bootstrap";
import { getData } from '../../utils/api';

export default function AttendanceList() {
    const [attendances, setAttendances] = useState([]);
    const [loading, setLoading] = useState(true);  // Loading state to show a loading indicator
    const [error, setError] = useState(null);  // To handle errors if the API call fails

    // Fetch attendance data from the API
    useEffect(() => {
        const fetchAttendances = async () => {
            try {
                const data = await getData('/attendance/all');  // Call the API using getData
                setAttendances(data);  // Update the state with the fetched data
            } catch (error) {
                setError("Failed to fetch attendance data.");  // Set error message if the request fails
                console.error(error);
            } finally {
                setLoading(false);  // Stop loading after the request completes
            }
        };

        fetchAttendances();
    }, []);  // Empty dependency array ensures the effect runs only once when the component mounts

    return (
        <Card className="p-4 shadow-sm">
            <h2 className="mb-4">Attendance List</h2>

            {/* Displaying a loading state while fetching data */}
            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div className="text-danger">{error}</div>  // Display error if there's an issue with fetching
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
