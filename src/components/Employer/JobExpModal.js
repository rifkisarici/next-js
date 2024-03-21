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

  const JobExp = [
    { value: "JobExp1", label: "0-1 Years", id: 10 },
    { value: "JobExp4", label: "2-5 Years", id: 30 },
    { value: "JobExp2", label: "6-10 Years", id: 20 },
    { value: "JobExp1", label: "+10 Years", id: 10 },

  ];
  const JobExpModal = ({ fillUpdateJobItem, SaveExp }) => {
    const employerContext = useContext(EmployerContext);
    const [errors, setErrors] = useState({});
    
    const [form, setForm] = useState({
      JobExp: null,
    })

  
    useEffect(() => {// update için kutucukları dolu halede gelmini saglar
      setForm(fillUpdateJobItem);
     
    }, [employerContext.expModalVisible]);
  
    
    const onClickSave = () => {
      SaveExp(form);
      handleClose();
    }
  
    const handleClose = () => {
      //setForm(null);
      //setCheckGraduate(false)
      employerContext.toggleExpModal()
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
        show={employerContext.expModalVisible}
        onHide={handleClose}
      >
  
        <Modal.Body className="p-0">
          <button
            exp="button"
            className="circle-32 btn-reset bg-white pos-abs-tr mt-md-n6 mr-lg-n6 focus-reset z-index-supper"
            onClick={handleClose}
          >
            <i className="fas fa-times"></i>
          </button>
          <div className="bg-white-2 h-100 px-11 pt-11 pb-7">
  
            <div className="form-group exp-relative">
            <Label title={"Experience Level"}/>
              <Select
                onChange={(e) => onChange(e, "JobExp")}
                options={JobExp}
                className="form-control pl-0 arrow-3 w-100 font-size-4 d-flex align-items-center w-100 "
                border={false}
                onInputChange={(inputValue) => { !inputValue == "" && handleInputChange(inputValue,JobExp ) }}
                //placeholder="Select..."
                defaultValue={fillUpdateJobItem && fillUpdateJobItem.JobExp}
                isMulti
              />
            </div>
  
            <Button onClick={(e) => { e.preventDefault(); onClickSave(); }}>save</Button>
          </div>
        </Modal.Body>
      </ModalStyled>
    
    </> );
}
 
export default JobExpModal;