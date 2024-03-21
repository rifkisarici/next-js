import React, { useState, useContext } from "react";
import EmployerContext from "../../context/EmployerContext";
import JobLangModal from "./JobLangModal";
import AddIco from "../../assets/add.ico"

const JobLang = () => {
    const empContext = useContext(EmployerContext);
    const [langList, setLangList] = useState([]);
    const [updateLangIndex, SetUpdateLangId] = useState(null);
   

    const addLang = () => {
        empContext.toggleLangModal();
        SetUpdateLangId(null);
    }

    const SaveLang = async (form) => {
        //try catch ApiProgress gerekli


        if (updateLangIndex != null) {
            langList[updateLangIndex] = form
        } else {
            setLangList(previousItem => [...previousItem, form]);
        }

        empContext.toggleLangModal(); //handleClose()
    }
    
    const FillUpdate = (index) => {
        empContext.toggleLangModal();
        SetUpdateLangId(index);
    }

    return ( <>
    <JobLangModal /*edit için tekrar gönderir*/ fillUpdateLangItem={[updateLangIndex]} SaveLang={SaveLang} />

<div className="border-top pr-xl-0 pr-xxl-14 p-5 pl-xs-12 pt-7 pb-5">
    <div className="d-flex align-items-center justify-content-md-between flex-wrap">
        <h4 className="font-size-6 mb-7 mt-5 text-black-2 font-weight-semibold">
            Language Skills
        </h4>
        <a
            href="/#"
            onClick={(e) => {
                e.preventDefault();
                addLang();
            }}
        >
            <img src={AddIco.src} alt="" width={23} height={25} />

        </a>  

    </div>

</div>
</>);
}
 
export default JobLang;