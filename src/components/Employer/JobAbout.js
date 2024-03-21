import React, { useState, useContext } from "react";
import AddIco from "../../assets/add.ico"
import EmployerContext from "../../context/EmployerContext";

import AboutModal from "../../components/Employer/JobAboutModal";

const JobAbout = () => {
    const empContext = useContext(EmployerContext);

    

    const [aboutText, setAboutText] = useState(null);


    return (<>
        <AboutModal aboutText={aboutText} setAboutText={setAboutText} />
        <div className="border-top pr-xl-0 pr-xxl-14 p-5 pl-xs-12 pt-7 pb-5">
            <div className="d-flex align-items-center justify-content-md-between flex-wrap">
                <h4 className="font-size-6 mb-7 mt-5 text-black-2 font-weight-semibold">Job Description</h4>
                <a
                    href="/#"
                    onClick={(e) => {
                        e.preventDefault();
                        empContext.toggleAboutModal();
                    }}
                >
                    <img src={AddIco.src} alt="" width={23} height={25} />
                    
                </a>


            </div>
            {!aboutText ? (
                <p className="font-size-4 mb-8">
                </p>
            ) :
            <pre >{aboutText.slice(0,80)}</pre>
                
            }

        </div>
    </>);
}

export default JobAbout;