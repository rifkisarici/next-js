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

const skillList = [
    { value: "skillName1", label: "Bachelor's Degree", id: 10 },
    { value: "skillName2", label: "Master's", id: 20 },
    { value: "skillName3", label: "Associate Degree", id: 30 },
    { value: "skillName4", label: "PhD", id: 40 },
    { value: "skillName1", label: "Bachelor's Degree", id: 10 },
    { value: "skillName2", label: "Master's", id: 20 },
    { value: "skillName3", label: "Associate Degree", id: 30 },
    { value: "skillName4", label: "PhD", id: 40 },
    { value: "skillName1", label: "Bachelor's Degree", id: 10 },
    { value: "skillName2", label: "Master's", id: 20 },
    { value: "skillName3", label: "Associate Degree", id: 30 },
    { value: "skillName4", label: "PhD", id: 40 },
    { value: "skillName1", label: "Bachelor's Degree", id: 10 },
    { value: "skillName2", label: "Master's", id: 20 },
    { value: "skillName3", label: "Associa1te Degree", id: 30 },
    { value: "skillName4", label: "PhD", id: 40 },
  ];
  const techType = [
    { value: "techType1", label: "Mechanical Desinger", id: 10 },
    { value: "techType2", label: "Project Engineer", id: 20 },
    { value: "techType3", label: "System Engineer", id: 30 },
    { value: "techType4", label: "Full Stack Developer", id: 40 },
    { value: "techType5", label: "Mechanical22 Desinger", id: 10 },
    { value: "techType6", label: "Project En22gineer", id: 20 },
    { value: "techType7", label: "System Engi22neer", id: 30 },
    { value: "techType8", label: "Full Stack De22veloper", id: 40 },
  ];

  const JobTechModal = ({ fillUpdateJobItem, SaveTech }) => {
    const employerContext = useContext(EmployerContext);
    const [errors, setErrors] = useState({});
    
    
  
    const [form, setForm] = useState({
      techType: null,
    })

    console.log("form",form);
  
    useEffect(() => {// update için kutucukları dolu halede gelmini saglar
      setForm(fillUpdateJobItem);
     
    }, [employerContext.techModalVisible]);
  
    
    const onClickSave = () => {
      SaveTech(form);
      handleClose();
    }
  
    const handleClose = () => {
      //setForm(null);
      //setCheckGraduate(false)
      employerContext.toggleTechModal()
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



    return ( <> <ModalStyled
        size="lg"
        centered
        show={employerContext.techModalVisible}
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
  
            <div className="form-group tech-relative">
            <Label title={"Technical Skill"} info={"Select the technical skills required by the given job posting."}/>
              <Select
                onChange={(e) => onChange(e, "techType")}
                options={techType}
                className="form-control pl-0 arrow-3 w-100 font-size-4 d-flex align-items-center w-100 "
                border={false}
                onInputChange={(inputValue) => { !inputValue == "" && handleInputChange(inputValue,techType ) }}
                //placeholder="Select..."
                defaultValue={fillUpdateJobItem && fillUpdateJobItem.techType}
                isMulti
              />
            </div>
  
           
            <ul className="list-unstyled d-flex align-items-center flex-wrap">
                {skillList.map((item, index) => (
                    <li key={index}>

                        <a className="bg-polar text-black-2  mr-6 px-7 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center" href="/#"
                            onClick={(e) => {
                                e.preventDefault();
                               
                            }}>
                            {item.label}
                        </a>

                    </li>
                )
                )}
            </ul>
  
            <Button onClick={(e) => { e.preventDefault(); onClickSave(); }}>Save</Button>
          </div>
        </Modal.Body>
      </ModalStyled>
    
   
    
    
    </> );
}
 
export default JobTechModal;