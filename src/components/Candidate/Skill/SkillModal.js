import React, { useContext, useState } from "react";
import styled from "styled-components";
import { Modal } from "react-bootstrap";
import CandidateContext from "../../../context/CandidateContext";
import { useApiProgress } from '../../../shared/ApiProgress';
import { Select } from "../../Core";
import { initialize } from "./initialize";
import 'react-bootstrap-accordion/dist/index.css';
import Accordion2 from "../../Accordion2";
import Accordion from 'react-bootstrap/Accordion';
import Spinner from '../../../components/Spinner';
import ApiError from "../../ApiError";
import { getApiSkills, postApiResumeSkill, updateApiResumeSkill, deleteApiResumeSkill } from "../../../api/apiCalls";
import { onChangeAllObject, searchItemSelect } from "../../../shared/ComponentsEvent"
import ButtonWithProgress from "../../ButtonWithProgress";

const ModalStyled = styled(Modal)`
  /* &.modal {
    z-index: 10050;
  } */
`;

const SkillModal = ({ skillType, updateSkillItem, showSkill, setModalRender }) => {
  const { pendingSkill, listOfSkills } = initialize(skillType);
  const candContext = useContext(CandidateContext);
  const [errors, setErrors] = useState({});
  const [saveError, setSaveError] = useState(false);
  const selectSpinner = [{ label: <Spinner /> }]



  const [form, setForm] = useState(updateSkillItem || {
    skill: null,
    explainEducation: null,
    explainWork: null,
    explainInternship: null,
    explainTraining: null,
  });

  const onChange = (event, selectName) => {
    onChangeAllObject(event, selectName, setForm)
  };

  const { softwareSkillsId: softwareSkillError, technicalSkillsId: technicalSkillError } = errors;


  const pendingApiCallSave = useApiProgress('post', `http://localhost:8080/api/1.0/resume/${skillType.type3}`);
  const pendingApiCallUpdate = useApiProgress('put', `http://localhost:8080/api/1.0/resume/${skillType.type3}/update/${updateSkillItem?.id}`);
  const pendinApiCall = pendingApiCallSave || pendingApiCallUpdate

  const onClickSave = async () => {
    const body = {
      technicalSkillId: form.skill.value,
      technicalSkillName: form.skill.label,
      softwareSkillId: form.skill.value,
      softwareSkillName: form.skill.label,

      explainEducation: form.explainEducation,
      explainWork: form.explainWork,
      explainInternship: form.explainInternship,
      explainTraining: form.explainTraining,
    };

    try {
      if (!updateSkillItem) //save
        await postApiResumeSkill(skillType.type3, body);
      else //update
        await updateApiResumeSkill(skillType.type3, body, updateSkillItem.id);
      showSkill()
      handleClose();
    } catch (error) {
      if (error?.response?.data?.validationErrors) {
        setErrors(error.response.data.validationErrors);
      } else {
        setSaveError(<ApiError text={"internet bağlantısında yada serverlarda Beklenmedik bir hata oluştu"} />)
      }
    }
  }

  const pendingDeleteSkill = useApiProgress('delete', `http://localhost:8080/api/1.0/resume/Skill/${skillType.type3}`);
  const SkillDelete = async () => {
    try {
      await deleteApiResumeSkill(skillType.type3, updateSkillItem.id);
      showSkill()
      handleClose()
    } catch (error) {
      setErrors(<ApiError text={"Hata oluştu Deneyim Bilgileri silinemdi"} />);
    }
  }

  const handleClose = () => {
    setModalRender(false)
    candContext.toggleSkillModal();
    setSaveError(false)
  };


  const [searchSkill, setSearchSkill] = useState();
  const handleInputChange = (inputValue) => {
    searchItemSelect(getApiSkills, setSearchSkill, {inputValue:inputValue, skillType:skillType.type2})
  }


  return (
    <ModalStyled
      size="lg"
      centered
      show={candContext.skillModalVisible}
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
            <label
              htmlFor="select3"
              className="d-block text-black-2 font-size-4 font-weight-semibold mb-4"
            >
              Select Skill{" "}
            </label>

            <Select
              onChange={(e) => onChange(e, "skill")}
              options={(pendingSkill && selectSpinner) || searchSkill || listOfSkills}
              onInputChange={(inputValue) => { handleInputChange(inputValue) }}
              placeholder="Select..."
              className="form-control pl-0 arrow-3 w-100 font-size-4 d-flex align-items-center w-100 "
              border={false}
              defaultValue={form.skill}
              error={softwareSkillError || technicalSkillError}
            />
          </div>

          <label
            htmlFor="select3"
            className="d-block text-black-2 font-size-4 font-weight-semibold mb-4"
          >
            Select Skill{" "}
          </label>

          <Accordion>
            <Accordion2 tittle={"Education"} onChange={onChange} name={"explainEducation"} eventKey={"0"} defaultValue={form.explainEducation} />
            <Accordion2 tittle={"Work"} onChange={onChange} name={"explainWork"} eventKey={"1"} defaultValue={form.explainWork} />
            <Accordion2 tittle={"Internship"} onChange={onChange} name={"explainInternship"} eventKey={"2"} defaultValue={form.explainInternship} />
            <Accordion2 tittle={"Training"} onChange={onChange} name={"explainTraining"} eventKey={"3"} defaultValue={form.explainTraining} />
          </Accordion>
          <br />

          <div className="upload-file mb-16 text-center">
            <div id="userActions" className="square-144 m-auto px-4 mb-5">
              <label htmlFor="fileUpload" className="mb-0 font-size-4 text-smoke">
                Adding a file
              </label>
              <input type="file" id="fileUpload" className="sr-only" />
            </div>
          </div>

          <div >
            <ButtonWithProgress className="btn btn-primary btn-medium rounded-5 text-uppercase"
              onClick={onClickSave}
              disabled={pendinApiCall}
              pendingApiCall={pendinApiCall}
              text={candContext.t("Save")}
            />
            {saveError}

            {updateSkillItem && <ButtonWithProgress className="btn btn-danger btn-medium  rounded-5 text-uppercase"
              onClick={SkillDelete}
              disabled={pendingDeleteSkill}
              pendingApiCall={pendingDeleteSkill}
              text={candContext.t("Delete")}
            />}
          </div>
        </div>
      </Modal.Body>
    </ModalStyled >);
}

export default SkillModal;