import React, { useContext, useState,useEffect} from "react";
import Input from "../../Input";
import DateForm from "../../DateForm.js";
import { Select } from "../../Core";
import Label from "../../Label";
import Accordion from 'react-bootstrap/Accordion';
import 'react-bootstrap-accordion/dist/index.css';
import {onChangeAllObject} from "../../../shared/ComponentsEvent"
import EmployerContext from "../../../context/EmployerContext";
import { assign } from "lodash";

const universityNames = [
    { value: "universityName1", label: "", id: 0 },
    { value: "universityName0", label: "All Universities(Global)", id: 1111 },
    { value: "universityName0", label: "All Universities(Turkey)", id: 2222 },
    { value: "universityName2", label: "Hacettepe", id: 1 },
    { value: "universityName3", label: "ODTÜ", id: 2 },
    { value: "universityName4", label: "İTÜ", id: 3 },
    { value: "universityName5", label: "Gazi", id: 4 },
    { value: "universityName6", label: "Bilkent", id: 5 },
    { value: "universityName7", label: "TOBB", id: 6 },
];

const department = [
    { value: "departman", label: "", id: 10 },
    { value: "departman1", label: "computer müh", id: 10 },
    { value: "departman2", label: "makina müh", id: 20 },
    { value: "departman3", label: "elektronik müh", id: 30 },
];


const educationalStatus = [
    { value: "departman1", label: "Graduated", id: 10 },
    { value: "departman2", label: "Course Semester", id: 20 },
    { value: "departman3", label: "Thesis Semester", id: 30 },
];


const master = ({title ,fillUpdateEduItem}) => {
    const empContext = useContext(EmployerContext);

    const [form, setForm] = useState({});  

    const onChange = (event, selectName) => {        
        onChangeAllObject(event, selectName, setForm);
        /* const values = onChangeAllObject(event, selectName);
        setForm((previousForm) =>({ ...previousForm, [values[0]]: values[1]})); */          
    };

    useEffect(() => {
        empContext.setEducateForm( (previousForm1) => ({ ...previousForm1, [title]: form})); 
    }, [form])

    useEffect(() => {        
        {fillUpdateEduItem && setForm(fillUpdateEduItem)}        
    }, [empContext.educationModalVisible])
    
    return (<>

        <Accordion>
            <Accordion.Item>
                <Accordion.Header>{title}</Accordion.Header>
                <Accordion.Body>
                    <div className="form-group">
                        <Label title={"Department"} />
                        <Select
                            options={department}
                            onChange={(e) => onChange(e, "department")}
                            className="form-control pl-0 arrow-3 w-100 font-size-4 d-flex align-items-center w-100 "
                            border={false}
                            isMulti
                            defaultValue={fillUpdateEduItem && fillUpdateEduItem.department}
                        />
                    </div>

                    <div className="form-group">
                        <Label title={"University"}  />
                        <Select
                            options={universityNames}
                            onChange={(e) => onChange(e, "universityName")}
                            className="form-control pl-0 arrow-3 w-100 font-size-4 d-flex align-items-center w-100 "
                            border={false}
                            isMulti
                            defaultValue={fillUpdateEduItem && fillUpdateEduItem.universityName}
                        />
                    </div>

                    <div className="row form-group" >
                        <div className="col-lg-3   pr-1">
                            <Label title={"Educational Status"} />
                            <Select
                                options={educationalStatus}
                                onChange={(e) => onChange(e, "educationalStatus")}
                                className="form-control pl-0 arrow-3 w-100 font-size-4 d-flex align-items-center w-100 "
                                border={false}
                                defaultValue={fillUpdateEduItem && fillUpdateEduItem.educationalStatus}
                            />
                        </div>

                        <div className="pl-7  ">
                            <label >
                                <input type="checkbox" name="phdAbroadEduCheck" id="terms-check"  onChange={onChange}
                                 defaultChecked={fillUpdateEduItem && fillUpdateEduItem.phdAbroadEduCheck}
                                />
                                {"  "} Abroad Education
                            </label>
                        </div>

                    </div>


                    <textarea
                        name="studyField"
                        id="skillTextarea"
                        cols="30"
                        rows="4"
                        className="border border-mercury text-gray w-100 pt-4 pl-6"
                        placeholder={`In general, please indicate your desired  ${title} study field.`}
                        defaultValue={fillUpdateEduItem && fillUpdateEduItem.studyField}
                    onChange={onChange} 
                    maxLength={280}
                    
                    >
                    </textarea>



                </Accordion.Body>
            </Accordion.Item>
        </Accordion>





    </>);
}

export default master;