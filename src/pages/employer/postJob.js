import React, { useState, useContext } from "react";
import EmployerDashboardWrapper from "../../components/Employer/EmployerDashboardWrapper";
import JobAbout from "../../components/Employer/JobAbout";
import JobEducation from "../../components/Employer/JobEducation";
import JobPosition from "../../components/Employer/JobPosition";
import JobTech from "../../components/Employer/JobTech";
import JobLang from "../../components/Employer/JobLang";
import JobMil from "../../components/Employer/JobMil";
import JobType from "../../components/Employer/JobType";
import JobTravel from "../../components/Employer/JobTravel";
import JobExp from "../../components/Employer/JobExp";

const postJob = () => {
    return (<>
        <EmployerDashboardWrapper>
            <h5 className="font-size-6 font-weight-semibold mb-11"> Post A Job</h5>
            <div className="contact-form bg-white shadow-8 rounded-4 pl-sm-10 pl-4 pr-sm-11 pr-4 pt-15 pb-13">
                
                <JobPosition />
                <JobAbout />
                <JobEducation />
                <JobTech />
                <JobLang />
                <JobExp />
                <JobMil />
                <JobType />
                <JobTravel />
               
        </div>
    </EmployerDashboardWrapper>
    </>);
}

export default postJob;