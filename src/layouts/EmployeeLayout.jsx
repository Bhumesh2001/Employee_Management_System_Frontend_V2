import '../css/Layout.css';
import { Container, Row, Col, Navbar, Nav, Dropdown } from "react-bootstrap";
import { Routes, Route, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Import Pages
import DashboardPage from '../pages/Employee/DashboardPage';
import LeavesPage from '../pages/Employee/LeaveListPage';
import PayslipsPage from '../pages/Employee/PayslipListPage';
import AttendancePage from '../pages/Employee/AttendanceListPage';
import ApplyLeavePage from '../pages/Employee/ApplyLeavePage';
import SingInSignOutPage from '../pages/Employee/SignInSignOutPage';

function EmployeeLayout() {
   const { logout } = useAuth();

    const handleLogout = () => {
        logout('employee');
    };

    return (
        <Container fluid className="d-flex flex-column min-vh-100 p-0">

            {/* Header */}
            <Navbar bg="dark" variant="dark" expand="lg" className="px-3">
                <Navbar.Brand as={Link} to="/employee">🚀 Employee Dashboard</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse className="justify-content-end">
                    <Nav>
                        <Dropdown align="end">
                            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                👤 Profile
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item as={Link} to="/employee/profile">View Profile</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>


            {/* Body */}
            <Row className="flex-grow-1 m-0">
                {/* Sidebar */}
                <Col xs={12} md={3} lg={2} className="bg-light border-end p-3">
                    <Nav className="flex-column">
                        <Nav.Link as={Link} to="/employee">🏠 Dashboard</Nav.Link>
                        <Nav.Link as={Link} to="/employee/leaves">📝 Leaves</Nav.Link>
                        <Nav.Link as={Link} to="/employee/payslips">💳 Payslips</Nav.Link>
                        <Nav.Link as={Link} to="/employee/attendances">📅 Attendance</Nav.Link>
                    </Nav>
                </Col>

                {/* Main Content */}
                <Col xs={12} md={9} lg={10} className="p-4">
                    <Routes>
                        <Route index element={<DashboardPage />} />
                        <Route path="signin-signout" element={<SingInSignOutPage />} />
                        <Route path="apply-leave" element={<ApplyLeavePage />} />
                        <Route path="leaves" element={<LeavesPage />} />
                        <Route path="payslips" element={<PayslipsPage />} />
                        <Route path="attendances" element={<AttendancePage />} />
                    </Routes>
                </Col>
            </Row>

            {/* Footer */}
            <footer className="bg-dark text-white text-center py-2 mt-auto">
                <small>© 2025 Your Company Name | All rights reserved</small>
            </footer>

        </Container>
    );
};

export default EmployeeLayout;
