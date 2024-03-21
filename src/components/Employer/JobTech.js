import React, { useState, useContext } from "react";
import EmployerContext from "../../context/EmployerContext";
import JobTechModal from "./JobTechModal";
import AddIco from "../../assets/add.ico"

const JobTech = () => {
    const empContext = useContext(EmployerContext);
    const [techList, setTechList] = useState([]);
    const [updateTechIndex, SetUpdateTechId] = useState(null);

    const addTech = () => {
        empContext.toggleTechModal();
        SetUpdateTechId(null);
    }

    const SaveTech = async (form) => {
        //try catch ApiProgress gerekli


        if (updateTechIndex != null) {
            techList[updateTechIndex] = form
        } else {
            setTechList(previousItem => [...previousItem, form]);
        }

        empContext.toggleTechModal(); //handleClose()
    }

    const FillUpdate = (index) => {
        empContext.toggleTechModal();
        SetUpdateTechId(index);
    }

    return (<>
        <JobTechModal /*edit için tekrar gönderir*/ fillUpdateTechItem={[updateTechIndex]} SaveTech={SaveTech} />

        <div className="border-top pr-xl-0 pr-xxl-14 p-5 pl-xs-12 pt-7 pb-5">
            <div className="d-flex align-items-center justify-content-md-between flex-wrap">
                <h4 className="font-size-6 mb-7 mt-5 text-black-2 font-weight-semibold">
                    Technical Skills
                </h4>
                <a
                    href="/#"
                    onClick={(e) => {
                        e.preventDefault();
                        addTech();
                    }}
                >
                    <img src={AddIco.src} alt="" width={23} height={25} />

                </a>  

            </div>

        </div>
    </>);
}

export default JobTech;