import React, { useEffect, useState } from 'react'
import { Button, Modal, Nav, Navbar, NavDropdown } from 'react-bootstrap'
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
                <Navbar.Brand><img src={logo} height="75" width="75" alt="img" /></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mx-auto">
                        <Link to="/" className="nav-link">Home</Link>
                        <NavDropdown title="Departments" id="collasible-nav-dropdown">
                            {departments.map((item) => {
                                return (
                                    <Link to={`/department/${item.id}`}>
                                        <NavDropdown.Item href="#action/3.1">{item.name}</NavDropdown.Item>
                                    </Link>
                                )
                            })}
                        </NavDropdown>
                    </Nav>
                    {user
                        ?
                        <ul class="navbar-nav mr-5 order-3">
                            <NavDropdown title={user.username} id="collasible-nav-dropdown">
                                <NavDropdown.Item onClick={handleLogOut}>Log Out</NavDropdown.Item>
                            </NavDropdown>
                        </ul>
                        :
                        <ul class="navbar-nav mr-5 order-3">
                            <Nav>
                                <Button onClick={showLogIn}>Login</Button>
                            </Nav>
                            <Nav>
                                <Button onClick={showSignUp}>Sign Up</Button>
                            </Nav>
                        </ul>
                    }
                    
                </Navbar.Collapse>
            </Navbar>


            <Modal show={logInState} onHide={closeLogIn} centered>
                <div class="modal-header">
					<h4 class="modal-title" id="exampleModalLongTitle">Log In</h4>
					<button type="button" class="close" onClick={closeLogIn}>
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
                    <form onSubmit={handleLogIn}>
                        <div class="form-group">
                            <label for="Email">Email</label>
                            <input type="email" class="form-control" id="Email" aria-describedby="emailHelp"
                                name="email" placeholder="Enter email" required />
                        </div>
                        <div class="form-group">
                            <label for="Password">Password</label>
                            <input type="password" class="form-control" id="Password" name="password"
                                placeholder="Password" required />
                        </div>
                        <button type="submit" class="btn btn-primary">Log In</button>
                    </form>	
				</div>
            </Modal>


            <Modal show={signUpState} onHide={closeSignUp} centered>
                <div class="modal-header">
					<h4 class="modal-title" id="exampleModalLongTitle">Sign Up</h4>
					<button type="button" class="close" onClick={closeSignUp}>
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
                    <form onSubmit={handleSignUp}>
                        <div class="form-group">

                            <label for="Usename">Username</label>
                            <input type="text" class="form-control" id="Username" name="username"
                                aria-describedby="emailHelp" placeholder="Enter Username" required />

                        </div>
                        <div class="form-group">
                            <div class="row">
                                <div class="col-6">
                                    <label for="FirstName">First Name</label>
                                    <input type="text" class="form-control" id="FirstName" name="firstname"
                                        aria-describedby="emailHelp" placeholder="Enter FirstName" required />
                                </div>
                                <div class="col-6">
                                    <label for="LastName">Last Name</label>
                                    <input type="text" class="form-control" id="LastName" name="lastname"
                                        aria-describedby="emailHelp" placeholder="Enter LastName" />
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="Email">Email address</label>
                            <input type="email" class="form-control" id="Email" aria-describedby="emailHelp"
                                name="email" placeholder="Enter email" required />
                        </div>
                        <div class="form-group">
                            <label for="Password">Password</label>
                            <input type="password" class="form-control" id="Password" name="password"
                                placeholder="Password" required />
                        </div>
                        <div class="form-group">
                            <label for="CnfPassword">Confirm Password</label>
                            <input type="password" class="form-control" id="CnfPassword" name="cnfpassword"
                                placeholder="Confirm Password" required />
                        </div>

                        <button type="submit" class="btn btn-primary">Sign Up</button>
                    </form>	
				</div>
            </Modal>
        </div>
    )
}

export default CustomNavbar
