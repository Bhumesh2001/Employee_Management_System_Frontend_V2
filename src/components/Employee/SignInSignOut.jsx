import { useState } from "react";
import { Card, Button, Row, Col, Alert } from "react-bootstrap";

export default function SignInSignOut() {
    const [signInTime, setSignInTime] = useState(null);
    const [signOutTime, setSignOutTime] = useState(null);
    const [message, setMessage] = useState("");

    const handleSignIn = () => {
        const currentTime = new Date().toLocaleTimeString();
        setSignInTime(currentTime);
        setMessage("Signed In Successfully at " + currentTime);
    };

    const handleSignOut = () => {
        if (!signInTime) {
            setMessage("Please sign in first!");
            return;
        }
        const currentTime = new Date().toLocaleTimeString();
        setSignOutTime(currentTime);
        setMessage("Signed Out Successfully at " + currentTime);
    };

    return (
        <Card className="p-4 shadow-sm">
            <h2 className="mb-4 text-center">Mark Attendance</h2>

            {message && (
                <Alert
                    variant={message.includes("Out") ? "success" : "info"}
                    onClose={() => setMessage("")}
                    dismissible
                >
                    {message}
                </Alert>
            )}

            <Row className="justify-content-center mb-4">
                <Col xs="auto">
                    <Button variant="primary" className="mb-2" onClick={handleSignIn} disabled={signInTime}>
                        {signInTime ? `Signed In at ${signInTime}` : "Sign In"}
                    </Button>
                </Col>
                <Col xs="auto">
                    <Button variant="danger" className="mb-2" onClick={handleSignOut} disabled={!signInTime || signOutTime}>
                        {signOutTime ? `Signed Out at ${signOutTime}` : "Sign Out"}
                    </Button>
                </Col>
            </Row>

            <div className="text-center">
                {signInTime && <p>Sign In Time: {signInTime}</p>}
                {signOutTime && <p>Sign Out Time: {signOutTime}</p>}
            </div>
        </Card>
    );
};
