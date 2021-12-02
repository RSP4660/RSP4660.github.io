import axios from 'axios'

const url = "https://rsp-api.herokuapp.com"
// const url = "http://localhost:3001"

const getUser = async () => {
    try {
        const user = await axios.get(`${url}/auth/user`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        });
        console.log(user.data)
        return user.data;
    } 
    catch (e){
        if (e.response) {
            return e.response.data;
        }
        return { error: "Encountered an exception! Please try again after sometime!"};
    }

}

const LogIn = async (email, password) => {
    try {
        const LogInStatus = await axios.post(`${url}/auth/login`, {email, password});
        return LogInStatus.data
    }
    catch (e){
        if (e.response) {
            return e.response.data;
        }
        return { error: "Encountered an exception! Please try again after sometime!"};
    }
}

const signUp = async (firstname, lastname, username, email, password) => {
    try {
        const signUpStatus = await axios.post(`${url}/auth/signup`, {firstname, lastname, username, email, password});
        return signUpStatus.data
    }
    catch (e){
        if (e.response) {
            return e.response.data;
        }
        return { error: "Encountered an exception! Please try again after sometime!"};
    }
}

const getCourseByCode = async (CourseCode) => {
    try {
        const courseStatus = await axios.get(`${url}/course/${CourseCode}`);
        return courseStatus.data;
    }
    catch {
        return null;
    }
}

const getCourseByBranch = async (branchId) => {
    try {
        const courseStatus = await axios.get(`${url}/courses/${branchId}`);
        return courseStatus.data;
    }
    catch {
        return [];
    }
}

const getResourceByCourse = async (courseId) => {
    try {
        const resourceStatus = await axios.get(`${url}/resources/${courseId}`);
        return resourceStatus.data;
    }
    catch {
        return {resources: []};
    }
}

const addResource = async (courseId, formData) => {
    try {
        const resourceStatus = await axios.post(`${url}/resources/${courseId}`, formData, {
            headers: {
                "Content-Type": 'multipart/form-data',
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })

        return resourceStatus.data;
    }
    catch (e) {
        if (e.response) {
            return {error: e.response.data.error};
        }
        return { error: "Encountered an exception! Please try again after sometime!"};
    }
}

export {
    getUser,
    LogIn,
    signUp,
    getCourseByCode,
    getCourseByBranch,
    getResourceByCourse,
    addResource,
}