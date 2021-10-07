import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import departments from '../constants/departments'
import { getCourseByBranch } from '../services/service'


const Department = () => {

    const {deptId} = useParams()
    const [courses, setCourses] = useState([])

    useEffect(() => {
        getCourseByBranch(deptId)
        .then((response) => {
            setCourses(response.courses)
        })
    }, [deptId]);

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li class="breadcrumb-item active" aria-current="page">{departments[deptId].code}</li>
                </ol>
            </nav>

            <div class="container" style={{marginTop: "100px", marginBottom: "100px"}}>
                <div class="row row-content">
                    <h1 class="display-4 mb-5">{departments[deptId].name}</h1>
                </div>
                <div class="row row-content">
                    <div class="col-12">
                        <img src={departments[deptId].imgLink} alt="" class="course-preview" />
                    </div>
                </div>
                <div class="row row-content">
                    <p style={{marginTop: "70px", marginBottom: "50px"}}>
                        {departments[deptId].description}
                    </p>
                </div>
            </div>

            <div style={{backgroundColor: "#E9ECEF", paddingTop: "30px", paddingBottom: "30px"}}>
                <div class="container" style={{marginTop: "100px", marginBottom: "100px"}}>
                    <div class="row row-content">
                    <div class="col-12" style={{textAlign: "center"}}>
                        {courses.length 
                            ? <h1 class="display-4">Available Courses</h1>
                            : <h2 style={{marginTop: "30px"}}> Unfortunately No Courses Available for this Department </h2>
                        }
                    </div>
                    </div>
                    <div class="row row-content">
                        {courses.map((course) => {
                            return (
                                <div class="col-12 col-md-4">
                                    <div class="card card-dept">
                                        <Link to={`/course/${course.code}`}>
                                            <div class="card-body">
                                                <h5 class="card-title">{course.code}</h5>
                                                <h6 class="card-subtitle mb-2 text-muted">{course.name}</h6>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>  

            <div class="container" style={{marginTop: "150px", marginBottom: "100px"}}>
                <div class=" row row-section1">
                    <div class="col">
                    <h1 style={{fontSize: "45px"}}>Didn't find your Course?</h1>
                    </div>
                </div>
                <div class="row row-section1">
                    <div class="col">
                    <p>Drop a Request. We'll make it available for you</p>
                    </div>
                </div>
                <div class="row row-content justify-content-center">
                    <div class="col-md-6">
                        <div class="card card-form">
                            <div class="card-header bg-dark text-white">
                                <h2>Drop Request</h2>
                            </div>
                            <div class="card-body">
                                <form action="/deprequest" method="post" enctype="multipart/form-data">
                                    <div class="form-group">
                                        <label for="Usename">Username</label>
                                        <input type="text" class="form-control" id="Username" name="username" placeholder="Enter Username"
                                            required />
                                    </div>
                                    <div class="form-group">
                                        <label for="reqdes">Requested Course</label>
                                        <input class="form-control" type="text" id="reqdes" placeholder="Requested Course" name="reqdes"
                                            required />
                                    </div>
                                    <div class="form-group">
                                        <label for="exampleInputPassword1">Password</label>
                                        <input type="password" class="form-control" id="exampleInputPassword1" name="password"
                                            placeholder="Password" required />
                                    </div>
                                    <div class="form-group">
                                        <button type="submit" class="btn btn-dark">Make Request</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Department
