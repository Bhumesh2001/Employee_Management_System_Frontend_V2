import { useState } from "react";
import { Card, Table } from "react-bootstrap";

export default function AttendanceList() {
    const [attendances, setAttendances] = useState([
        {
            _id: "680ccc4fc4849572c014b52d",
            date: "2025-04-26T00:00:00.000Z",
            signIn: "5:36:38 PM",
            signOut: "5:37:05 PM",
        },
    ]);

    return (
        <Card className="p-4 shadow-sm">
            <h2 className="mb-4">Attendance List</h2>
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
        </Card>
    );
};
