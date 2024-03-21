import React, { useState, useContext } from "react";
import EmployerContext from "../../context/EmployerContext";
import JobTypeModal from "./JobTypeModal";
import AddIco from "../../assets/add.ico"

const JobType = () => {
    const empContext = useContext(EmployerContext);
    const [typeList, setTypeList] = useState([]);
    const [updateTypeIndex, SetUpdateTypeId] = useState(null);

    const addType = () => {
        empContext.toggleTypeModal();
        SetUpdateTypeId(null);
    }

    const SaveType = async (form) => {
        //try catch ApiProgress gerekli


        if (updateTypeIndex != null) {
            typeList[updateTypeIndex] = form
        } else {
            setTypeList(previousItem => [...previousItem, form]);
        }

        empContext.toggleTypeModal(); //handleClose()
    }

    const FillUpdate = (index) => {
        empContext.toggleTypeModal();
        SetUpdateTypeId(index);
    }

    return ( <>
    <JobTypeModal /*edit için tekrar gönderir*/ fillUpdateTypeItem={[updateTypeIndex]} SaveType={SaveType} />

    <div className="border-top pr-xl-0 pr-xxl-14 p-5 pl-xs-12 pt-7 pb-5">
        <div className="d-flex align-items-center justify-content-md-between flex-wrap">
            <h4 className="font-size-6 mb-7 mt-5 text-black-2 font-weight-semibold">
                Job Type
            </h4>
            <a
                href="/#"
                onClick={(e) => {
                    e.preventDefault();
                    addType();
                }}
            >
                <img src={AddIco.src} alt="" width={23} height={25} />

            </a>

        </div>

    </div>
    
    
    
    
    </> );
}
 
export default JobType;