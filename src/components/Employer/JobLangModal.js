import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { Button, Form, Modal } from "react-bootstrap";
import { Select } from "../Core";
import EmployerContext from "../../context/EmployerContext";
import Label from "../Label";

const ModalStyled = styled(Modal)`
  /* &.modal {
    z-index: 10050;
  } */
`;

const selectLanguage = [
    { value: "english", label: "English" },
    { value: "german", label: "German" },
    { value: "french", label: "French" },
    { value: "spanish", label: "Spanish" },
    { value: "chinese", label: "Chinese" },
    { value: "russian", label: "Russian" },
  ];
const languageLevel = [
    { value: "beginner", label: "Beginner" },
    { value: "preIntermediate", label: "Pre Intermediate" },
    { value: "intermediate", label: "Intermediate" },  
    { value: "upperIntermediate", label: "Upper Intermediate" },
    { value: "advanced", label: "Advanced" },
    { value: "proficient", label: "Proficient" },
    { value: "native", label: "Native" },
  ];

const JobLangModal = ({ fillUpdateJobItem, SaveJobLang }) => {
    const employerContext = useContext(EmployerContext);
    const [errors, setErrors] = useState({});
    const [checkGraduate, setCheckGraduate] = useState(false);


    const [form, setForm] = useState({
        langType: null,
    })

    useEffect(() => {// update için kutucukları dolu halede gelmini saglar
        setForm(fillUpdateJobItem);

    }, [employerContext.langModalVisible]);


    const onClickSave = () => {
        SaveJobLang(form);
        handleClose();
    }

    const handleClose = () => {
        //setForm(null);
        //setCheckGraduate(false)
        employerContext.toggleLangModal()
    }

    const onChange = (event, selectName) => {
        let name = null, value = null;
        if (event.target === undefined) {//select için
            name = selectName;
            value = event
        } else if (event.target.type == "checkbox") {
            name = event.target.name;
            value = event.target.checked;
            setCheckGraduate(value)
        } else {
            name = event.target.name;
            value = event.target.value;
        }

        setForm((previousForm) => ({ ...previousForm, [name]: value }));

    };


    const handleInputChange = (inputValue, liste) => {
        const body = { label: inputValue, value: "otherInput" }
        liste[0] = body
    };



    return (<>
        <ModalStyled
            size="lg"
            centered
            show={employerContext.langModalVisible}
            onHide={handleClose}
        >

            <Modal.Body className="p-0">
                <button
                    type="button"
                    className="circle-32 btn-reset bg-white pos-abs-tr mt-md-n6 mr-lg-n6 focus-reset z-index-supper"
                    onClick={handleClose}
                >
                    <i className="fas fa-times"></i>
                </button>
                <div className="bg-white-2 h-100 px-11 pt-11 pb-7">

                    <div className="px-7  mb-9 feature-cardOne-adjustments">
                        <ul className="list-unstyled mb-1 card-tag-list">
                            <li className="  text-black-2 font-size-6 font-weight-semibold mb-4">
                                TURKISH
                            </li>

                            <li>

                                <Label title={"Turkish Level"} info={" And here's some dsfdsff content. And here's some dsfdsff content. It's very engaging asf saasfa asfsaf   right?asdasd sadsad sads saddsac sadasd sadsac sadsa  aasdsa asdafasfsaf asda sadas fas asfddsa asfsa asfsaIt's very engaging asf saasfa asfsaf   right?asdasd sadsad sads saddsac sadasd sadsac sadsa  aasdsa asdafasfsaf asda sadas fas asfddsa asfsa asfsa"} />
                                <Select
                                    onChange={(e) => onChange(e, "languageLevel")}
                                    options={languageLevel}
                                    className="form-control pl-0 arrow-3 w-100 font-size-4 d-flex align-items-center w-100 "
                                    border={false}
                                    onInputChange={(inputValue) => { !inputValue == "" && handleInputChange(inputValue, languageLevel) }}
                                    //placeholder="Select..."
                                    defaultValue={fillUpdateJobItem && fillUpdateJobItem.languageLevel}
                                />

                            </li>

                            <li>
                                <input type="checkbox" name="graduate" id="terms-check" onChange={onChange}
                                    defaultChecked={fillUpdateJobItem && fillUpdateJobItem.graduate} />
                                {"  "} Turkish is not required

                            </li>
                        </ul>
                    </div>
                    </div>
                    <div className="bg-white-2 h-100 px-11 pt-11 pb-7">

                        <div className="px-7  mb-9 feature-cardOne-adjustments">
                            <ul className="list-unstyled mb-1 card-tag-list">
                                <li>
                                    <Label title={"Language"} info={" And here's some dsfdsff content. And here's some dsfdsff content. It's very engaging asf saasfa asfsaf   right?asdasd sadsad sads saddsac sadasd sadsac sadsa  aasdsa asdafasfsaf asda sadas fas asfddsa asfsa asfsaIt's very engaging asf saasfa asfsaf   right?asdasd sadsad sads saddsac sadasd sadsac sadsa  aasdsa asdafasfsaf asda sadas fas asfddsa asfsa asfsa"} />
                                    <Select
                                        onChange={(e) => onChange(e, "selectLanguage")}
                                        options={selectLanguage}
                                        className="form-control pl-0 arrow-3 w-100 font-size-4 d-flex align-items-center w-100 "
                                        border={false}
                                        onInputChange={(inputValue) => { !inputValue == "" && handleInputChange(inputValue, selectLanguage) }}
                                        //placeholder="Select..."
                                        defaultValue={fillUpdateJobItem && fillUpdateJobItem.selectLanguage}
                                    />
                                </li>

                                <li>

                                    <Label title={"Language Level"} info={" And here's some dsfdsff content. And here's some dsfdsff content. It's very engaging asf saasfa asfsaf   right?asdasd sadsad sads saddsac sadasd sadsac sadsa  aasdsa asdafasfsaf asda sadas fas asfddsa asfsa asfsaIt's very engaging asf saasfa asfsaf   right?asdasd sadsad sads saddsac sadasd sadsac sadsa  aasdsa asdafasfsaf asda sadas fas asfddsa asfsa asfsa"} />
                                    <Select
                                        onChange={(e) => onChange(e, "languageLevel")}
                                        options={languageLevel}
                                        className="form-control pl-0 arrow-3 w-100 font-size-4 d-flex align-items-center w-100 "
                                        border={false}
                                        onInputChange={(inputValue) => { !inputValue == "" && handleInputChange(inputValue, languageLevel) }}
                                        //placeholder="Select..."
                                        defaultValue={fillUpdateJobItem && fillUpdateJobItem.languageLevel}
                                    />

                                </li>

                                <li>
                                    <input type="checkbox" name="graduate" id="terms-check" onChange={onChange}
                                        defaultChecked={fillUpdateJobItem && fillUpdateJobItem.graduate} />
                                    {"  "} Proof Required

                                </li>
                            </ul>
                        </div>


                        <Button onClick={(e) => { e.preventDefault(); onClickSave(); }}>save</Button>
                    </div>
            </Modal.Body>
        </ModalStyled>




    </>);
}

export default JobLangModal;