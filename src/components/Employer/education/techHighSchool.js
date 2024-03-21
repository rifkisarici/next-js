import React, { useContext, useState} from "react";
import Input from "../../Input";
import DateForm from "../../DateForm.js";
import { Select } from "../../Core";
import Label from "../../Label";
import Accordion from 'react-bootstrap/Accordion';
import 'react-bootstrap-accordion/dist/index.css';
import {onChangeAllObject} from "../../../shared/ComponentsEvent"
import EmployerContext from "../../../context/EmployerContext";

const techHSNames = [
    { value: "universityName1", label: "", id: 0 },
    { value: "universityName0", label: "All Departments", id: 1111 },
    { value: "universityName0", label: "Industrial Automation Technologies", id: 2222 },
    { value: "universityName2", label: "Electrical Electronics Technology", id: 1 },
    { value: "universityName3", label: "Information Technologies", id: 2 },
    { value: "universityName4", label: "Machine", id: 3 },
    { value: "universityName5", label: "Engine", id: 4 },
    { value: "universityName6", label: "Telecommunication", id: 5 },
    { value: "universityName7", label: "Interior Design", id: 6 },
];


{/*col-lg-3 => col:colon lg:large(ekran küçültüğündeki boyutu) 3:boyut */ }
{/* pr:sağına boşluk pl-0:soluna boşluk */ }


const TechSchool = ({title, fillUpdateEduItem}) => {
    const empContext = useContext(EmployerContext);

    const [errors, setErrors] = useState({});
  
    

    

    const onChange = (event, selectName) => {        
        onChangeAllObject(object, selectName, empContext.setTechSchoolForm);
        /* const values = onChangeAllObject(event, selectName);
        empContext.setTechSchoolForm((previousForm) => ({ ...previousForm, [values[0]]: values[1]}));     */    
    };

      
    return (<>
        

        <div className="form-group">
            <Label title={"Technical Schools"}  />
            <Select
                options={techHSNames}
                onChange={(e) => onChange(e, "techHSNames")}
                className="form-control pl-0 arrow-3 w-100 font-size-4 d-flex align-items-center w-100 "
                border={false}
                defaultValue={fillUpdateEduItem && fillUpdateEduItem.universityName}
                isMulti
            />
              
         
        </div>
       
    

    </>);
}

export default TechSchool;