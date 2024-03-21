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

  const JobTravel = [
    { value: "JobTravel1", label: "Domestic", id: 10 },
    { value: "JobTravel4", label: "Abroad", id: 30 },
    { value: "JobTravel2", label: "Mixed", id: 20 },
    { value: "JobTravel2", label: "None", id: 20 },
   
  ];
  const JobTravelModal = ({ fillUpdateJobItem, SaveTravel }) => {
    const employerContext = useContext(EmployerContext);
    const [errors, setErrors] = useState({});
    
    
  
    const [form, setForm] = useState({
      JobTravel: null,
    })

  
    useEffect(() => {// update için kutucukları dolu halede gelmini saglar
      setForm(fillUpdateJobItem);
     
    }, [employerContext.travelModalVisible]);
  
    
    const onClickSave = () => {
      SaveTravel(form);
      handleClose();
    }
  
    const handleClose = () => {
      //setForm(null);
      //setCheckGraduate(false)
      employerContext.toggleTravelModal()
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
        show={employerContext.travelModalVisible}
        onHide={handleClose}
      >
  
        <Modal.Body className="p-0">
          <button
            travel="button"
            className="circle-32 btn-reset bg-white pos-abs-tr mt-md-n6 mr-lg-n6 focus-reset z-index-supper"
            onClick={handleClose}
          >
            <i className="fas fa-times"></i>
          </button>
          <div className="bg-white-2 h-100 px-11 pt-11 pb-7">
  
            <div className="form-group travel-relative">
            <Label title={"Travel Status"} info={" And here's some dsfdsff content. And here's some dsfdsff content. It's very engaging asf saasfa asfsaf   right?asdasd sadsad sads saddsac sadasd sadsac sadsa  aasdsa asdafasfsaf asda sadas fas asfddsa asfsa asfsaIt's very engaging asf saasfa asfsaf   right?asdasd sadsad sads saddsac sadasd sadsac sadsa  aasdsa asdafasfsaf asda sadas fas asfddsa asfsa asfsa"}/>
              <Select
                onChange={(e) => onChange(e, "JobTravel")}
                options={JobTravel}
                className="form-control pl-0 arrow-3 w-100 font-size-4 d-flex align-items-center w-100 "
                border={false}
                onInputChange={(inputValue) => { !inputValue == "" && handleInputChange(inputValue,JobTravel ) }}
                //placeholder="Select..."
                defaultValue={fillUpdateJobItem && fillUpdateJobItem.JobTravel}
                isMulti
              />
            </div>
  
            <Button onClick={(e) => { e.preventDefault(); onClickSave(); }}>save</Button>
          </div>
        </Modal.Body>
      </ModalStyled>
    
    
    
    </> );
}
 
export default JobTravelModal;