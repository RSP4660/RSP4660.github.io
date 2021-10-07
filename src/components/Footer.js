import React from 'react'

const departments = [
    {
        name: "CSE",
        description: "Computer Science and Engineering",
        imgLink: "https://www.tutorialandexample.com/wp-content/uploads/2021/06/CSE-Full-Form-1.jpg",
    },
    {
        name: "IT",
        description: "Information Technology",
        imgLink: "https://www.sharda.ac.in/blog/wp-content/uploads/2019/06/vs-sample-CSE-IT-1024x536.jpg",
    }
]

const Footer = () => {
    return (
        <footer class="footer bg-dark" style={{paddingTop: "40px"}}>
            <div class="container text-white">
                <div class="row">
                    <div class="col-12 col-md-4">
                        <h5 class="py-1">Links</h5>
                        <ul class="list-unstyled">
                            <li class="py-1"><a class="a-dark-bg" href="/">Home</a></li>
                            <li class="py-1"><a class="a-dark-bg" href="/contact">Contact</a></li>
                        </ul>
                    </div>
                    <div class="col-12 col-md-4">
                        <h5 class="py-1">Departments</h5>
                        <ul class="list-unstyled">
                            {departments.map((item, index) => {
                                return (
                                    <li class="py-1">
                                        <a class="a-dark-bg" href="/Dept/{{ department.DName }}">{item.description}</a>
                                    </li>
                                )
                            })} 
                        </ul>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <div class="copyright" style={{textAlign: "center"}}>
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
