const React = require('react');
const Navbar = require('react-bootstrap/Navbar');
const Nav = require('react-bootstrap/Nav');
const { withRouter } = require('react-router-dom');

function TopBar({ location }) {
  return (
    <Navbar bg='primary' expand='lg' variant='dark'>
      <Navbar.Brand href='#home'>RSS App</Navbar.Brand>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='mr-auto'>
          <Nav.Link href='/' active={location.pathname == '/'}>
            Home
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
export default withRouter(TopBar);