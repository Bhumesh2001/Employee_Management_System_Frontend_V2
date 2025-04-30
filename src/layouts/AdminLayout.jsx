import { Container, Row, Col, Navbar, Nav, Dropdown } from "react-bootstrap";
import { Routes, Route, Link } from 'react-router-dom';
import DashboardPage from '../pages/Admin/DashboardPage';
import EmployeesPage from '../pages/Admin/EmployeeListPage';
import LeavesPage from '../pages/Admin/LeaveListPage';
import PayslipsPage from '../pages/Admin/PayslipListPage';
import AttendancePage from '../pages/Admin/AttendanceListPage';
import AddEmployeePage from '../pages/Admin/AddEmployeePage';
import EditEmployeePage from '../pages/Admin/EditEmployeePage';
import { useAuth } from '../context/AuthContext';

function AdminLayout() {
    const { logout } = useAuth();

    const handleLogout = () => {
        logout('admin');
    };

    return (
        <Container fluid className="d-flex flex-column min-vh-100 p-0">

            {/* Header */}
            <Navbar bg="dark" variant="dark" expand="lg" className="px-3">
                <Navbar.Brand as={Link} to="/admin">🚀 Admin Dashboard</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse className="justify-content-end">
                    <Nav>
                        <Dropdown align="end">
                            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                👤 Profile
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item as={Link} to="/admin/profile">View Profile</Dropdown.Item>
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
                        <Nav.Link as={Link} to="/admin">🏠 Dashboard</Nav.Link>
                        <Nav.Link as={Link} to="/admin/employees">👥 Employees</Nav.Link>
                        <Nav.Link as={Link} to="/admin/leaves">📝 Leaves</Nav.Link>
                        <Nav.Link as={Link} to="/admin/payslips">💳 Payslips</Nav.Link>
                        <Nav.Link as={Link} to="/admin/attendances">📅 Attendance</Nav.Link>
                    </Nav>
                </Col>

                {/* Main Content */}
                <Col xs={12} md={9} lg={10} className="p-4">
                    <Routes>
                        <Route index element={<DashboardPage />} />
                        <Route path="employees" element={<EmployeesPage />} />
                        <Route path="add-employee" element={<AddEmployeePage />} />
                        <Route path="edit-employee/:id" element={<EditEmployeePage />} />
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

export default AdminLayout;
