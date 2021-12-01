import React, { useEffect, useState } from 'react'
import { Button, Container, Form, FormControl, Modal, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import departments from '../constants/departments'
import { getUser, LogIn, signUp } from '../services/service'
import logo from '../static/img/logo.png'


const CustomNavbar = () => {

    const [user, setUser] = useState(null);

    const [signUpState, setSignUpState] = useState(false);
    const closeSignUp = () => setSignUpState(false);
    const showSignUp = () => setSignUpState(true);

    const [logInState, setLogInState] = useState(false);
    const closeLogIn = () => setLogInState(false);
    const showLogIn = () => setLogInState(true);

    useEffect(() => {
        getUser()
        .then((user) => {
            setUser(user)
        })  
    }, []);

    const handleSignUp = async (e) => {
        e.preventDefault();

        if(e.target['password'].value!==e.target['cnfpassword'].value) {
            alert("Passwords do not match!")
            return
        }
        
        const response = await signUp(
            e.target['firstname'].value,
            e.target['lastname'].value,
            e.target['username'].value,
            e.target['email'].value,
            e.target['password'].value
        )

        if(response.token) {
            localStorage.setItem('token', response.token)
            setSignUpState(false)
            getUser()
            .then((user) => {
                setUser(user)
            }) 
        }
        else {
            alert(response.error)
        }
    }

    const handleLogIn = async (e) => {
        e.preventDefault();

        const response = await LogIn(
            e.target['email'].value,
            e.target['password'].value
        )

        if(response.token) {
            localStorage.setItem('token', response.token)
            setLogInState(false)
            getUser()
            .then((user) => {
                setUser(user)
            }) 
        }
        else {
            alert(response.error)
        }
    }

    const handleLogOut = async () => {
        localStorage.clear()
        setUser(null)
    }

    return (
        <div>
            <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand><img src={logo} height="75" width="75" alt="img" /></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Link to="/" className="nav-link mx-3">Home</Link>
                            <NavDropdown title="Departments" id="collasible-nav-dropdown">
                                {departments.map((item, index) => {
                                    return (
                                        <NavDropdown.Item key={index}>
                                            <Link to={`/department/${item.id}`}>{item.name}</Link>
                                        </NavDropdown.Item>
                                    )
                                })}
                            </NavDropdown>
                        </Nav>

                        <Form inline>
                            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        </Form>

                        {user
                            ?
                            <ul className="navbar-nav order-3">
                                <NavDropdown title={user.username} id="collasible-nav-dropdown">
                                    <NavDropdown.Item onClick={handleLogOut}>Log Out</NavDropdown.Item>
                                </NavDropdown>
                            </ul>
                            :
                            <ul className="navbar-nav order-3">
                                <Nav>
                                    <Button className="mr-sm-2" onClick={showLogIn} variant="primary">Login</Button>
                                </Nav>
                                <Nav>
                                    <Button onClick={showSignUp} variant="secondary">Sign Up</Button>
                                </Nav>
                            </ul>
                        }
                        
                    </Navbar.Collapse>
                </Container>
            </Navbar>


            <Modal show={logInState} onHide={closeLogIn} centered>
                <div className="modal-header">
					<h4 className="modal-title" id="exampleModalLongTitle">Log In</h4>
					<button type="button" className="close" onClick={closeLogIn}>
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div className="modal-body">
                    <form onSubmit={handleLogIn}>
                        <div className="form-group">
                            <label for="Email">Email</label>
                            <input type="email" className="form-control" id="Email" aria-describedby="emailHelp"
                                name="email" placeholder="Enter email" required />
                        </div>
                        <div className="form-group">
                            <label for="Password">Password</label>
                            <input type="password" className="form-control" id="Password" name="password"
                                placeholder="Password" required />
                        </div>
                        <button type="submit" className="btn btn-primary">Log In</button>
                    </form>	
				</div>
            </Modal>


            <Modal show={signUpState} onHide={closeSignUp} centered>
                <div className="modal-header">
					<h4 className="modal-title" id="exampleModalLongTitle">Sign Up</h4>
					<button type="button" className="close" onClick={closeSignUp}>
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div className="modal-body">
                    <form onSubmit={handleSignUp}>
                        <div className="form-group">

                            <label for="Usename">Username</label>
                            <input type="text" className="form-control" id="Username" name="username"
                                aria-describedby="emailHelp" placeholder="Enter Username" required />

                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-6">
                                    <label for="FirstName">First Name</label>
                                    <input type="text" className="form-control" id="FirstName" name="firstname"
                                        aria-describedby="emailHelp" placeholder="Enter FirstName" required />
                                </div>
                                <div className="col-6">
                                    <label for="LastName">Last Name</label>
                                    <input type="text" className="form-control" id="LastName" name="lastname"
                                        aria-describedby="emailHelp" placeholder="Enter LastName" />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label for="Email">Email address</label>
                            <input type="email" className="form-control" id="Email" aria-describedby="emailHelp"
                                name="email" placeholder="Enter email" required />
                        </div>
                        <div className="form-group">
                            <label for="Password">Password</label>
                            <input type="password" className="form-control" id="Password" name="password"
                                placeholder="Password" required />
                        </div>
                        <div className="form-group">
                            <label for="CnfPassword">Confirm Password</label>
                            <input type="password" className="form-control" id="CnfPassword" name="cnfpassword"
                                placeholder="Confirm Password" required />
                        </div>

                        <button type="submit" className="btn btn-primary">Sign Up</button>
                    </form>	
				</div>
            </Modal>
        </div>
    )
}

export default CustomNavbar
