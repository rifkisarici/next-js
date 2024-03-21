import React, { useContext } from "react";
import CandidateDashboardWrapper from "../../components/Candidate/CandidateDashboardWrapper";
import CandidateContext from "../../context/CandidateContext";
import About from "../../components/Candidate/About/About";
import Education from "../../components/Candidate/Education/Education";
import WorkExperience from "../../components/Candidate/WorkExperience/WorkExperience";
import Language from "../../components/Candidate/Language/Language";
import TechnicalSkill from "../../components/Candidate/Skill/TechnicalSkill";
import SoftwareSkill from "../../components/Candidate/Skill/SoftwareSkill";


const CandidateResume = () => {
    const candContext = useContext(CandidateContext);


    return (
        <CandidateDashboardWrapper>
            <h5 className="font-size-6 font-weight-semibold mb-11">
                {candContext.t("Update_Resume")}
            </h5>

            <div className="contact-form bg-white shadow-8 rounded-4 pl-sm-10 pl-4 pr-sm-11 pr-4 pt-15 pb-13">
                <About />
                <Education />
                <WorkExperience />
                <TechnicalSkill />
                <SoftwareSkill />
                <Language />
            </div>
        </CandidateDashboardWrapper>
    );


}

export default CandidateResume;