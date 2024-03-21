import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { Button, Form, Modal } from "react-bootstrap";
import { Select } from "../Core";
import EmployerContext from "../../context/EmployerContext";
import Label from "../Label";


const positionType = [
  { value: "positionType1", label: "Mechanical Desinger", id: 10 },
  { value: "positionType2", label: "Project Engineer", id: 20 },
  { value: "positionType3", label: "System Engineer", id: 30 },
  { value: "positionType4", label: "Full Stack Developer", id: 40 },
];
const ModalStyled = styled(Modal)`
  /* &.modal {
    z-index: 10050;
  } */
`;

const JobPositionModal = ({ fillUpdateJobItem, SavePosition }) => {
  const employerContext = useContext(EmployerContext);
  const [errors, setErrors] = useState({});
  
  

  const [form, setForm] = useState({
    positionType: null,
  })

  useEffect(() => {// update için kutucukları dolu halede gelmini saglar
    setForm(fillUpdateJobItem);
   
  }, [employerContext.PositionModalVisible]);

  
  const onClickSave = () => {
    SavePosition(form);
    handleClose();
  }

  const handleClose = () => {
    //setForm(null);
    //setCheckGraduate(false)
    employerContext.togglePositionModal()
  }
  const onChange = (event, selectName) => {
    let name = null, value = null;
    if (event.target === undefined) {//select için
      name = selectName;
      value = event
  
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

  return (
    <ModalStyled
      size="lg"
      centered
      show={employerContext.positionModalVisible}
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
          <Label title={"Position Type"} info={"Select for which position the given job posting is."}/>
            <Select
              onChange={(e) => onChange(e, "positionType")}
              options={positionType}
              className="form-control pl-0 arrow-3 w-100 font-size-4 d-flex align-items-center w-100 "
              border={false}
              onInputChange={(inputValue) => { !inputValue == "" && handleInputChange(inputValue,positionType ) }}
              //placeholder="Select..."
              defaultValue={fillUpdateJobItem && fillUpdateJobItem.positionType}

            />
          </div>

          <Button onClick={(e) => { e.preventDefault(); onClickSave(); }}>Save</Button>



        </div>
      </Modal.Body>
    </ModalStyled>);
}




export default JobPositionModal;