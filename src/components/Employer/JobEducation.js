import React, { useState, useContext } from "react";
import EmployerContext from "../../context/EmployerContext";
import JobEducationModal from "./JobEducationModal";
import EduCard from "./education/eduCard";
import AddIco from "../../assets/add.ico"
import EditIco from "../../assets/edit.ico"

const JobEducation = () => {
    const empContext = useContext(EmployerContext);
    const [educateList, setEducateList] = useState([]);
    const [updateEduIndex, SetUpdateEduId] = useState(null);


    const addEducate = () => {
        empContext.toggleEducationModal();
        empContext.setEducateForm({});
        SetUpdateEduId(null);
    }

    const SaveEducate = () => {
        //try catch ApiProgress gerekli      
        //console.log( "empContext.educateForm111",empContext.educateForm);
      if (updateEduIndex != null) {
            educateList[updateEduIndex] = empContext.educateForm
        } else {
            setEducateList(previousItem => [...previousItem, empContext.educateForm]);
        } 
    }

    const FillUpdate = (index) => {
        empContext.toggleEducationModal();
        SetUpdateEduId(index);
    }

    const EduDelete = async (index) => {
        //educateList[index]=null
        //setEducateList(prev => prev.filter(prev=> fruit !== elementToRemove ))
        console.log("educateAll", educateAll);
    }

    return (<>
        <JobEducationModal /*edit için tekrar gönderir*/ fillUpdateEduItem={educateList[updateEduIndex]} SaveEducate={SaveEducate} />

        <div className="border-top pr-xl-0 pr-xxl-14 p-5 pl-xs-12 pt-7 pb-5">
            <div className="d-flex align-items-center justify-content-md-between flex-wrap">
                <h4 className="font-size-6 mb-7 mt-5 text-black-2 font-weight-semibold">
                    Education
                </h4>
                <a
                    href="/#"
                    onClick={(e) => {
                        e.preventDefault();
                        addEducate();
                    }}
                >
                    <img src={AddIco.src} alt="" width={23} height={25} />
                </a>
            </div>



            {/* {educateList.map((item, index) => (
                <div key={index}>
                    <EduCard educateAll={educateList} />
                </div>                
            )
            )}
 */}
            <ul className="list-unstyled d-flex align-items-center flex-wrap">
                {educateList.map((item, index) => (
                    <li key={index}>

                        <a className="bg-polar text-black-2  mr-6 px-7 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center" href="/#"
                            onClick={(e) => {
                                e.preventDefault();
                                FillUpdate(index);
                            }}>
                            {item.educationLevel.label}
                        </a>

                    </li>
                )
                )}


            </ul>
        </div>
    </>);
}

export default JobEducation;