import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { Button, Form, Modal } from "react-bootstrap";
import EmployerContext from "../../context/EmployerContext";
import { Select } from "../Core";
import Label from "../Label";
import Master from "./education/master";
import Bachelor from "./education/bachelor";
import TechSchool from "./education/techHighSchool";
import { onChangeAllObject } from "../../shared/ComponentsEvent"

const educationLevels = [
  { value: "educateLevel1", label: "Bachelor's Degree", id: 10 },
  { value: "educateLevel3", label: "Associate Degree", id: 30 },
  { value: "educateLevel4", label: "Technical Highschool", id: 50 },
];

const ModalStyled = styled(Modal)`
  /* &.modal {
    z-index: 10050;
  } */
`;

const JobEducationModal = ({ fillUpdateEduItem, SaveEducate }) => {
  const empContext = useContext(EmployerContext);
  const [errors, setErrors] = useState({});

  const [modalSize, setModalSize] = useState("lg");
  const [eduLevelCompanet, setEduLevelComponent] = useState();

  /*  console.log("fillUpdateEduItem.educationLevel", fillUpdateEduItem); */

  const eduLevelSelect = (event, selectName) => {
    if (event.label == "Bachelor's Degree") {
      setModalSize("lg")
      setEduLevelComponent(<Bachelor fillUpdateEduItem={fillUpdateEduItem} />)
    } else if (event.label == "Associate Degree") {
      setModalSize("lg")
      setEduLevelComponent(<Master />)
    } else if (event.label == "Technical Highschool") {
      setModalSize("lg")
      setEduLevelComponent(<TechSchool/>)
    }

    onChangeAllObject(event, selectName, empContext.setEducateForm)
    /* const values = onChangeAllObject(event, selectName);
    empContext.setEducateForm((previousForm) => ({ ...previousForm, [values[0]]: values[1] })); */
  }

  useEffect(() => {// update için kutucukları dolu halede gelmini saglar
    //setForm(fillUpdateEduItem);
    /* setCheckGraduate(fillUpdateEduItem && fillUpdateEduItem.graduate) */
  }, [empContext.educationModalVisible]);

  //console.log("eduLevelCompanet",empContext.educateForm);

  const onClickSave = () => {
    SaveEducate();
    handleClose();
    //console.log("deneme",empContext.bachelorForm);
  }

  const handleClose = () => {
    //setForm(null);
    //setCheckGraduate(false)
    setEduLevelComponent()
    empContext.toggleEducationModal()
  }

  return (
    <ModalStyled
      size={modalSize}
      centered
      show={empContext.educationModalVisible}
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

          <div className="form-group position-relative">
            <Label title={" Education Level"} info={"Select the education level(s) required by the job posting."} />
            <Select
              onChange={(e) => eduLevelSelect(e, "educationLevel")}
              options={educationLevels}
              className="form-control pl-0 arrow-3 w-100 font-size-4 d-flex align-items-center w-100 "
              border={false}
              //placeholder="Select..."
              defaultValue={fillUpdateEduItem && fillUpdateEduItem.educationLevel}
            />
          </div>


          {eduLevelCompanet}

          <Button onClick={(e) => { e.preventDefault(); onClickSave(); }}>Save</Button>
        </div>
      </Modal.Body>
    </ModalStyled>);
}

export default JobEducationModal;