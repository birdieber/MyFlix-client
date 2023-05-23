import { Container, Nav, Navbar, NavDropdown, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export const NavigationBar = ({ user, onLoggedOut }) => {
	return (
		<Navbar
			bg="dark"
			variant="dark"
			expand="lg"
		>
			<Container
				style={{
					"margin-left": "42px",
					"margin-right": "42px",
					padding: "5px",
				}}
			>
				<Navbar.Brand
					as={Link}
					to="/"
				>
					My Movie List
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						{/* <NavDropdown
							title="Dropdown"
							id="basic-nav-dropdown"
						> */}
						{/* if user is not logged in */}
						{!user && (
							<>
								{" "}
								<Nav.Link
									as={Link}
									to="/login"
								>
									Login
								</Nav.Link>
								<Nav.Link
									as={Link}
									to="/signup"
								>
									Signup
								</Nav.Link>
							</>
						)}
						{/* if user is logged in */}
						{user && (
							<>
								{" "}
								<Nav.Link
									as={Link}
									to="/"
								>
									Home
								</Nav.Link>
								<Nav.Link
									className=""
									Logout
									onClick={onLoggedOut}
								>
									Logout
								</Nav.Link>{" "}
							</>
						)}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default NavigationBar;
