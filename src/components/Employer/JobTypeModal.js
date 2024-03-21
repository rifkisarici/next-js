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

  const JobType = [
    { value: "JobType1", label: "At the Workplace", id: 10 },
    { value: "JobType4", label: "Remote", id: 30 },
    { value: "JobType2", label: "Mixed", id: 20 },
   
  ];
  const JobTypeModal = ({ fillUpdateJobItem, SaveType }) => {
    const employerContext = useContext(EmployerContext);
    const [errors, setErrors] = useState({});
    
    
  
    const [form, setForm] = useState({
      JobType: null,
    })

  
    useEffect(() => {// update için kutucukları dolu halede gelmini saglar
      setForm(fillUpdateJobItem);
     
    }, [employerContext.typeModalVisible]);
  
    
    const onClickSave = () => {
      SaveType(form);
      handleClose();
    }
  
    const handleClose = () => {
      //setForm(null);
      //setCheckGraduate(false)
      employerContext.toggleTypeModal()
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


    return ( <><ModalStyled
        size="lg"
        centered
        show={employerContext.typeModalVisible}
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
  
            <div className="form-group type-relative">
            <Label title={"Job Type"} info={" And here's some dsfdsff content. And here's some dsfdsff content. It's very engaging asf saasfa asfsaf   right?asdasd sadsad sads saddsac sadasd sadsac sadsa  aasdsa asdafasfsaf asda sadas fas asfddsa asfsa asfsaIt's very engaging asf saasfa asfsaf   right?asdasd sadsad sads saddsac sadasd sadsac sadsa  aasdsa asdafasfsaf asda sadas fas asfddsa asfsa asfsa"}/>
              <Select
                onChange={(e) => onChange(e, "JobType")}
                options={JobType}
                className="form-control pl-0 arrow-3 w-100 font-size-4 d-flex align-items-center w-100 "
                border={false}
                onInputChange={(inputValue) => { !inputValue == "" && handleInputChange(inputValue,JobType ) }}
                //placeholder="Select..."
                defaultValue={fillUpdateJobItem && fillUpdateJobItem.JobType}
                isMulti
              />
            </div>
  
            <Button onClick={(e) => { e.preventDefault(); onClickSave(); }}>save</Button>
          </div>
        </Modal.Body>
      </ModalStyled>
    
    
    
    </> );
}
 
export default JobTypeModal;