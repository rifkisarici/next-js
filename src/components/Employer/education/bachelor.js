import React, { useContext, useState, useEffect } from "react";
import { Select } from "../../Core";
import { Button, Form, Modal } from "react-bootstrap";
import Label from "../../Label";
import Master from "./master";
import EmployerContext from "../../../context/EmployerContext";
import { onChangeAllObject } from "../../../shared/ComponentsEvent"

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
    { value: "departman11", label: "computer müh", id: 10 },
    { value: "departman2", label: "makina müh", id: 20 },
    { value: "departman3", label: "elektronik müh", id: 30 },
];
const educationalStatus = [
    { value: "departman1", label: "Graduated", id: 10 },
    { value: "departman3", label: "4th Year ", id: 30 },
    { value: "departman3", label: "3rd Year and Lower ", id: 30 },


];
const cumulativeGPAs = [
    { value: "departman1", label: "No GPA requirement ", id: 10 },
    { value: "departman3", label: "2.50 at least", id: 30 },
    { value: "departmans3", label: "2.75 at least", id: 30 },
    { value: "departman2", label: "3.00 at least", id: 20 },
    { value: "departman2", label: "3.50 at least", id: 20 },
];

{/*col-lg-3 => col:colon lg:large(ekran küçültüğündeki boyutu) 3:boyut */ }
{/* pr:sağına boşluk pl-0:soluna boşluk */ }


const bachelor = ({ fillUpdateEduItem }) => {
    const empContext = useContext(EmployerContext);

    const [errors, setErrors] = useState({});
    const [form, setForm] = useState({});
    console.log("form111", form);

    const onChange = (object, selectName) => {
        onChangeAllObject(object, selectName, setForm);
        /* const values = onChangeAllObject(object, selectName);
        setForm((previousForm) => ({ ...previousForm, [values[0]]: values[1] })); */
    };

    useEffect(() => { /*   onchance ederken son değer eklenmiyordu  */
        empContext.setEducateForm((previousForm) => ({ ...previousForm, "Bachelor": form }));
    }, [form])

    useEffect(() => {
        { fillUpdateEduItem && setForm(fillUpdateEduItem.Bachelor) }
    }, [empContext.educationModalVisible])

    const checkboxToOptionbox = (object) => {   /*  multi checkboxı optionbox a cevirir       */
        var myCheckbox = document.getElementsByName(object.target.name)
        Array.prototype.forEach.call(myCheckbox, function (el) {
            if (el.id != object.target.id)
                el.checked = false;
            else {
                object.target.checked = true;
                el.target = "optionbox"
                onChange(el)
            }
        });
    };


    return (<>
        <div className="form-group">
            <Label title={"Department"} />
            <Select
                options={department}
                onChange={(e) => onChange(e, "department")}
                className="form-control pl-0 arrow-3 w-100 font-size-4 d-flex align-items-center w-100 "
                border={false}
                isMulti
                defaultValue={fillUpdateEduItem && fillUpdateEduItem.Bachelor.department}
            />
        </div>

        <div className="form-group">
            <Label title={"University"} />
            <Select
                options={universityNames}
                onChange={(e) => onChange(e, "universityName")}
                className="form-control pl-0 arrow-3 w-100 font-size-4 d-flex align-items-center w-100 "
                border={false}
                defaultValue={fillUpdateEduItem && fillUpdateEduItem.Bachelor.universityName}
            />
        </div>


        <label >
            <input type="checkbox" name="abroadEduCheck" onChange={onChange}
                defaultChecked={fillUpdateEduItem && fillUpdateEduItem.Bachelor.abroadEduCheck}
            />
            {"  "}
            <Label text={"Abroad Education"} info={"h"} />
        </label>

        <div className="row form-group" >
            <div className="col-lg-3  pr-1">
                <Label title={"CGPA Requirement"} />
                <Select
                    options={cumulativeGPAs}
                    onChange={(e) => onChange(e, "cumulativeGPA")}
                    className="form-control pl-0 arrow-3 w-100 font-size-4 d-flex align-items-center w-100 "
                    border={false}
                    defaultValue={fillUpdateEduItem && fillUpdateEduItem.Bachelor.cumulativeGPA}
                />
            </div>

            <div className="col-lg-3">
                <Label title={"Educational Status"} />
                <Select
                    options={educationalStatus}
                    onChange={(e) => onChange(e, "educationalStatus")}
                    className="form-control pl-0 arrow-3 w-100 font-size-4 d-flex align-items-center w-100 "
                    border={false}
                    defaultValue={fillUpdateEduItem && fillUpdateEduItem.Bachelor.educationalStatus}
                />
            </div>



        </div>

        <div className="form-group">
            A master's degree is required for this position.<br></br>
            <label className="col-lg-2">
                <input type="checkbox" id="masterRequiredCheck" name="masterCheck" onChange={checkboxToOptionbox} defaultChecked={fillUpdateEduItem && fillUpdateEduItem.Bachelor.masterCheck == "masterRequiredCheck"}
                />
                {"  "}Required
            </label>
            {"  "}
            <label className="col-lg-2">
                <input type="checkbox" id="masterWishedCheck" name="masterCheck" onChange={checkboxToOptionbox} defaultChecked={fillUpdateEduItem && fillUpdateEduItem.Bachelor.masterCheck == "masterWishedCheck"}
                />
                {"  "}Wished
            </label>
            {"  "}
            <label className="col-lg-3">
                <input type="checkbox" id="masterNotRequiredCheck" name="masterCheck" onChange={checkboxToOptionbox} defaultChecked={fillUpdateEduItem && fillUpdateEduItem.Bachelor.masterCheck == "masterNotRequiredCheck"}
                />
                {"  "}not Required
            </label>
            {(form.masterCheck == "masterRequiredCheck" || form.masterCheck == "masterWishedCheck") && <Master title="Master" fillUpdateEduItem={fillUpdateEduItem && fillUpdateEduItem.Master} />}
        </div>

        <div className="form-group">
            A PhD is required for this position.<br></br>
            <label className="col-lg-2">
                <input type="checkbox" id="phdRequiredCheck" name="phdCheck" onChange={checkboxToOptionbox} defaultChecked={fillUpdateEduItem && fillUpdateEduItem.Bachelor.phdCheck == "phdRequiredCheck"}
                />
                {"  "}Required
            </label>
            {"  "}
            <label className="col-lg-2">
                <input type="checkbox" id="phdWishedCheck" name="phdCheck" onChange={checkboxToOptionbox} defaultChecked={fillUpdateEduItem && fillUpdateEduItem.Bachelor.phdCheck == "phdWishedCheck"}
                />
                {"  "}Wished
            </label>
            {"  "}
            <label className="col-lg-3">
                <input type="checkbox" id="phdNotRequiredCheck" name="phdCheck" onChange={checkboxToOptionbox} defaultChecked={fillUpdateEduItem && fillUpdateEduItem.Bachelor.phdCheck == "phdNotRequiredCheck"}
                />
                {"  "}not Required
            </label>
            {(form.phdCheck == "phdRequiredCheck" || form.phdCheck == "phdWishedCheck") && <Master title="PhD" fillUpdateEduItem={fillUpdateEduItem && fillUpdateEduItem.PhD} />}
        </div>

    </>);
}

export default bachelor;