import axios from "axios"

export const changeLanguage = language => {
    axios.defaults.headers['accept-language'] = language;
};

export const setAuthorizationHeader = ({ token, isLoggedIn }) => {
    if (isLoggedIn) {
        axios.defaults.headers['Authorization'] = `Bearer ${(token)}`;
    } else {
        delete axios.defaults.headers['Authorization'];
    }
};

export const singup = (body) => {
    return axios.post(`http://localhost:8080/api/1.0/user/${body.userRole.toLowerCase()}`, body, /*{headers:{'accept-language':'tr'}}*/)
};

export const login = (body) => {
    return axios.post('http://localhost:8080/api/1.0/auth', body); /*Basic Authorization Base64: ,{}, {auth: body} */
};

export const logout = () => {
    return axios.post('http://localhost:8080/api/1.0/logout');
}

export const getUserPagination = (page = 0, size = 5) => {
    return axios.get(`http://localhost:8080/api/1.0/user/userAll?page=${page}&size=${size}`);
};

export const getUser = username => {
    return axios.get(`http://localhost:8080/api/1.0/user/${username}`);
};

export const putUser = (body) => {
    return axios.put(`http://localhost:8080/api/1.0/user/putUser`, body);
};

export const getApiUniversities = (name) => {
    return axios.get(`http://localhost:8080/api/1.0/university/${name || "argebul_TR"}`);
};

export const getApiUniversityDepartments = () => {
    return axios.get(`http://localhost:8080/api/1.0/universityDepartment/getAll`);
};

export const postApiResumeEducation = (body) => {
    return axios.post('http://localhost:8080/api/1.0/resume/education', body)
};

export const getApiResumeEducations = () => {
    return axios.get('http://localhost:8080/api/1.0/resume/education/educations')
};

export const updateApiResumeEducation = (body, educationId) => {
    return axios.put(`http://localhost:8080/api/1.0/resume/education/update/${educationId}`, body)
};

export const deleteApiResumeEducation = (educationId) => {
    return axios.delete(`http://localhost:8080/api/1.0/resume/education/delete/${educationId}`)
};

export const postApiCandidateAbout = (body) => {
    return axios.post('http://localhost:8080/api/1.0/candidate/about', body)
};

export const getApiCandidateAbout = () => {
    return axios.get('http://localhost:8080/api/1.0/candidate/about')
};

export const putApiCandidateAbout = (body) => {
    return axios.put('http://localhost:8080/api/1.0/candidate/about/update', body)
};

export const getApiCompanies = (name) => {
    return axios.get(`http://localhost:8080/api/1.0/company/getAll/${name || "argebul_Company"}`);
};

export const getApiWorkingArea = (name) => {
    return axios.get(`http://localhost:8080/api/1.0/workingArea/getAll/${name || "argebul_WorkingAreas"}`);
};

export const postApiResumeWorkExperience = (body) => {
    return axios.post('http://localhost:8080/api/1.0/resume/workExperience', body)
};

export const getApiResumeWorkExperiences = () => {
    return axios.get('http://localhost:8080/api/1.0/resume/workExperience/experiences')
};

export const updateApiResumeWorkExperience = (body, workExperienceId) => {
    return axios.put(`http://localhost:8080/api/1.0/resume/workExperience/update/${workExperienceId}`, body)
};

export const deleteApiResumeWorkExperience = (workExperienceId) => {
    return axios.delete(`http://localhost:8080/api/1.0/resume/workExperience/delete/${workExperienceId}`)
};

/* export const getApiSoftwareSkills = (name) => {
    return axios.get(`http://localhost:8080/api/1.0/softwareSkill/getAll/${name || "argebul_Skills"}`)
};

export const getApiTechnicalSkills = (name) => {
    return axios.get(`http://localhost:8080/api/1.0/technicalSkill/getAll/${name || "argebul_Skills"}`)
}; */

export const getApiSkills = (body) => {
    return axios.get(`http://localhost:8080/api/1.0/${body.skillType}/getAll/${body.inputValue || "argebul_Skills"}`)
};
//softSkill ve TechnicalSkill aynı anda kullanıldı 
export const postApiResumeSkill = (skillType, body) => {
    return axios.post(`http://localhost:8080/api/1.0/resume/${skillType}`, body)
};

export const updateApiResumeSkill = (skillType, body, resumeSkillId) => {
    return axios.put(`http://localhost:8080/api/1.0/resume/${skillType}/update/${resumeSkillId}`, body)
};

export const getApiResumeSkills = (skillType,skillType2) => {
    return axios.get(`http://localhost:8080/api/1.0/resume/${skillType}/${skillType2}`)
};

export const deleteApiResumeSkill = (skillType,skillId) => {
    return axios.delete(`http://localhost:8080/api/1.0/resume/${skillType}/delete/${skillId}`)
};

export const postApiResumeLanguage = (body) => {
    return axios.post('http://localhost:8080/api/1.0/resume/resumeLanguage', body)
};

export const getApiResumeLanguage = () => {
    return axios.get('http://localhost:8080/api/1.0/resume/resumeLanguage/language')
};

export const updateApiResumeLanguage = (body, languageId) => {
    return axios.put(`http://localhost:8080/api/1.0/resume/resumeLanguage/update/${languageId}`, body)
};

export const deleteApiResumeLanguage = (languageId) => {
    return axios.delete(`http://localhost:8080/api/1.0/resume/resumeLanguage/delete/${languageId}`)
};

export const postApiCvPdf = (body) => {
    return axios.post(`http://localhost:8080/api/1.0/employerDashboard/resumeLoad/`, body)
};