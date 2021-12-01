import React from 'react'
import { Link } from 'react-router-dom'
import departments from '../constants/departments'

const Footer = () => {
    return (
        <footer className="footer bg-dark" style={{paddingTop: "40px"}}>
            <div className="container text-white">
                <div className="row">
                    <div className="col-12 col-md-4">
                        <h5 className="py-1">Links</h5>
                        <ul className="list-unstyled">
                            <li className="py-1"><Link to="/" className="a-dark-bg">Home</Link></li>
                        </ul>
                    </div>
                    <div className="col-12 col-md-4">
                        <h5 className="py-1">Departments</h5>
                        <ul className="list-unstyled">
                            {departments.map((item, index) => {
                                return (
                                    <li className="py-1" key={index}>
                                        <Link to={`/department/${item.id}`} className="a-dark-bg">{item.name}</Link>
                                    </li>
                                )
                            })} 
                        </ul>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="copyright" style={{textAlign: "center"}}>
                            <p>

                                Copyright &copy;
                                <script>document.write(new Date().getFullYear());</script> All rights reserved |
                                ResourceSharingPortal.com

                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
