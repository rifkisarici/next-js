import React, { useState, useContext } from "react";
import EmployerContext from "../../context/EmployerContext";
import JobExpModal from "./JobExpModal";
import AddIco from "../../assets/add.ico"

const JobExp = () => {
    const empContext = useContext(EmployerContext);
    const [expList, setExpList] = useState([]);
    const [updateExpIndex, SetUpdateExpId] = useState(null);

    const addExp = () => {
        empContext.toggleExpModal();
        SetUpdateExpId(null);
    }

    const SaveExp = async (form) => {
        //try catch ApiProgress gerekli


        if (updateExpIndex != null) {
            expList[updateExpIndex] = form
        } else {
            setExpList(previousItem => [...previousItem, form]);
        }

        empContext.toggleExpModal(); //handleClose()
    }

    const FillUpdate = (index) => {
        empContext.toggleExpModal();
        SetUpdateExpId(index);
    }

    return ( <>
    <JobExpModal /*edit için tekrar gönderir*/ fillUpdateExpItem={[updateExpIndex]} SaveExp={SaveExp} />

    <div className="border-top pr-xl-0 pr-xxl-14 p-5 pl-xs-12 pt-7 pb-5">
        <div className="d-flex align-items-center justify-content-md-between flex-wrap">
            <h4 className="font-size-6 mb-7 mt-5 text-black-2 font-weight-semibold">
                Experience Level
            </h4>
            <a
                href="/#"
                onClick={(e) => {
                    e.preventDefault();
                    addExp();
                }}
            >
                <img src={AddIco.src} alt="" width={23} height={25} />

            </a>

        </div>

    </div>
    
    
    
    
    </> );
}
 
export default JobExp;