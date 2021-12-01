import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import departments from '../constants/departments'
import { addResource, getCourseByCode, getResourceByCourse } from '../services/service'
import Loader from './Loader'


const Course = () => {

    const {courseCode} = useParams()

    const [course, setCourse] = useState(null)
    const [resources, setResources] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getCourseByCode(courseCode)
        .then((response) => {
            console.log(response.course)
            setCourse(response.course)

            getResourceByCourse(response.course._id)
            .then((res) => {
                setResources(res.resources)
            })
        })
        
        setLoading(false)
    }, [courseCode]);

    const uploadResource = async (e) => {
        setLoading(true)

        e.preventDefault()
        
        const formData = new FormData();
        formData.append('file', e.target['file'].files[0]);
        formData.append('title', e.target['title'].value);
        formData.append('description', e.target['description'].value);
        
        const status = await addResource(
            course._id,
            formData
        )

        if(status.message) {
            alert(status.message)
            getResourceByCourse(course._id)
            .then((response) => {
                setResources(response.resources)
            })
        }
        else {
            alert(status.error)
        }

        setLoading(false)
    }

    if(course==null || loading) {
        return <Loader/>
    }
    else {
        return (
            <div>
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="/">Home</a></li>
                        {}
                        <li class="breadcrumb-item">
                            <Link to={`/department/${departments[course.branch].id}`}>{departments[course.branch].code}</Link>
                        </li>
                        <li class="breadcrumb-item active" aria-current="page">
                            {course.code}
                        </li>
                    </ol>
                </nav>

                <div class="container" style={{marginTop: "100px", marginBottom: "100px"}}>
                    <div class="row row-content">
                        <h1 className="col-12 mb-2">{course.name}</h1>
                        <h3 className="col-12 text-muted">{course.code}</h3>
                    </div>
                    <div class="row row-content" style={{marginTop: "50px", marginBottom: "50px"}}>
                        <div className="col-12">
                            <h3 style={{marginBottom: "30px"}}>Content</h3>
                            <p>
                                {course.description}
                            </p>
                        </div>
                    </div>
                </div>

                <div style={{backgroundColor: "#E9ECEF", paddingTop: "30px", paddingBottom: "30px"}}>
                    <div class="container" style={{marginTop: "100px", marginBottom: "100px"}}>
                        <div class="row row-content">
                        <div class="col-12" style={{textAlign: "center"}}>
                            {resources.length 
                                ? <h1 class="display-4">Available Resources</h1>
                                : <h2 style={{marginTop: "30px"}}> Unfortunately No Resources Available for this Course</h2>
                            }
                        </div>
                        </div>
                        <div class="row row-content justify-content-center">
                            {resources.map((resource) => {
                                return (
                                    <div class="col-12 col-md-4 d-flex">
                                        <div class="card card-dept" style={{width: "100%"}}>
                                            <div class="card-header">
                                                <h4>
                                                {resource.title}
                                                </h4>
                                            </div>
                                            <div class="card-body">
                                                <h6 class="card-subtitle mb-2 text-muted">{resource.description}</h6>
                                            </div>
                                            <div class="card-footer">
                                                <a href={resource.link} target="_blank" rel="noreferrer"><button class="btn btn-dark" value=" {{ resource.RNo }} " name="Resource_no" type="submit">Download </button></a>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                
                <div class="container" style={{marginTop: "100px", marginBottom: "100px"}}>
                    <div class="row row-content">
                        <div class="col-12" style={{textAlign: "center"}}>
                        <h1>Upload Resource</h1>
                        </div>
                    </div>
                    <div class="row row-content justify-content-center">
                        <div class="col-md-6">
                            <div class="card card-form">
                                <div class="card-header bg-dark text-white">
                                    <h2>Resource for {course.code}</h2>
                                </div>
                                <div class="card-body">
                                    <form onSubmit={uploadResource}>
                                        <div class="form-group">
                                            <label for="rname">Resource Title</label>
                                            <input class="form-control" type="text" id="title" placeholder="Resource Title" name="title" required />
                                        </div>
                                        <div class="form-group">
                                            <label for="rdes">Resource Description</label>
                                            <input class="form-control" type="text" id="description" placeholder="Resource Description" name="description"
                                                required />
                                        </div>
                                        <div class="form-group">
                                            <input type="file" name="file" required />
                                        </div>
                                        <div class="form-group">
                                            <button type="submit" class="btn btn-dark">Submit</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="container" style={{marginTop: "150px", marginBottom: "100px"}}>
                    <div class=" row row-section1">
                        <div class="col">
                        <h1 style={{fontSize: "45px"}}>Didn't find the required Resource?</h1>
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
                                            <label for="reqdes">Requested Resource</label>
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
}

export default Course
