import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import {Modal } from "react-bootstrap";
import CandidateContext from "../../../context/CandidateContext";
import { Select } from "../../Core";
import DateForm from "../../DateForm.js";
import Label from "../../Label";
import { initialize } from "./initialize";
import { onChangeAllObject, searchItemSelect } from "../../../shared/ComponentsEvent"
import { useApiProgress } from '../../../shared/ApiProgress';
import { postApiResumeWorkExperience, updateApiResumeWorkExperience, getApiCompanies, getApiWorkingArea } from "../../../api/apiCalls";
import ApiError from "../../ApiError";
import Spinner from '../../../components/Spinner';
import ButtonWithProgress from "../../ButtonWithProgress";

const ModalStyled = styled(Modal)`
  /* &.modal {
    z-index: 10050;
  } */
`;

const CandidateWorkExperienceModal = ({ editExperienceItem, showWorkExperiences }) => {
  const { experienceLevels, ListOfCompany, pendingCompany, ListOfWorkingArea, pendingWorkingArea } = initialize();
  const candContext = useContext(CandidateContext);
  const [saveError, setSaveError] = useState(false);
  const [errors, setErrors] = useState({});
  const selectSpinner = [{ label: <Spinner /> }]

  const [form, setForm] = useState(editExperienceItem || {
    company: null,
    experienceLevel: null,
    workingArea: null,
    startingDate: null,
    endingDate: null,
    onGoing: true,
  })


  const onChange = (event, selectName) => {
    onChangeAllObject(event, selectName, setForm)
  };

  let startingDateAndEndDateFail;
  if (!form.onGoing && Math.floor(((new Date(form.endingDate) - new Date(form.startingDate))) / (1000 * 60 * 60 * 24)) < 0) {
    startingDateAndEndDateFail = candContext.t('StaringDateAndEndDateFail');
  }

  let emptyError;
  if (!form.company || !form.experienceLevel || !form.workingArea || !form.startingDate || (!form.endingDate && !form.onGoing)) {
    emptyError = candContext.t("must_not_be_empty")
  }

  const { companyId: companyError, experienceLevel: experienceLevelError, workingAreaId: workingAreaError, startingDate: startingDateError } = errors;

  const handleClose = () => {
    candContext.toggleWorkExperienceModal()
    setSaveError(false)
  }

  /* <<<<<<<<<< REQUEST >>>>>>>>>> */
  /* <<<<<<<<<< SAVE >>>>>>>>>>*/

  const pendingApiCallSave = useApiProgress('post', 'http://localhost:8080/api/1.0/resume/workExperience');
  const pendingApiCallUpdate = useApiProgress('put', `http://localhost:8080/api/1.0/resume/workExperience/update/${editExperienceItem?.id}`);
  const pendinApiCall = pendingApiCallSave || pendingApiCallUpdate

  const onClickSave = async () => {
    const body = {
      companyId: form.company.value,
      companyName: form.company.label,
      experienceLevel: form.experienceLevel.value,
      workingAreaId: form.workingArea.value,
      startingDate: form.startingDate,
      endingDate: form.endingDate,
      onGoing: form.onGoing,
    };

    try {
      if (!editExperienceItem) //save
        await postApiResumeWorkExperience(body);
      else //update
        await updateApiResumeWorkExperience(body, editExperienceItem.id);
      showWorkExperiences()
      handleClose();
    } catch (error) {
      if (error?.response?.data?.validationErrors) {
        setErrors(error.response.data.validationErrors);
      } else {
        setSaveError(<ApiError text={"internet bağlantısında yada serverlarda Beklenmedik bir hata oluştu"} />)
      }
    }
  }

  const [searchWorkingArea, setSearchWorkingArea] = useState();
  const workingAreaInputChange = (inputValue) => {
    searchItemSelect(getApiWorkingArea, setSearchWorkingArea, inputValue )
  }

  const [searchCompany, setSearchCompany] = useState(null);
  const companyInputChange = (inputValue) => {
    searchItemSelect(getApiCompanies, setSearchCompany, inputValue)
  }


  return (
    <ModalStyled
      size="lg"
      centered
      show={candContext.workExperienceModalVisible}
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
            <Label title={"Experience Level"} />
            <Select
              onChange={(e) => onChange(e, "experienceLevel")}
              options={experienceLevels}
              className="form-control pl-0 arrow-3 w-100 font-size-4 d-flex align-items-center w-100 "
              border={false}
              //placeholder="Select..."
              defaultValue={form.experienceLevel}
              error={(!form.experienceLevel && emptyError) || experienceLevelError}
            />
          </div>



          <div className="form-group position-relative">
            <Label title={"Company"} />
            <Select
              options={(pendingCompany && selectSpinner) || searchCompany || ListOfCompany}
              onInputChange={(inputValue) => companyInputChange(inputValue)}
              onChange={(e) => onChange(e, "company")}
              className="form-control pl-0 arrow-3 w-100 font-size-4 d-flex align-items-center w-100 "
              border={false}
              defaultValue={form.company}
              error={(!form.company && emptyError) || companyError}
            />
          </div>



          <div className="form-group position-relative">
            <Label title={"Working Area"} />
            <Select
              options={(pendingWorkingArea && selectSpinner) || searchWorkingArea || ListOfWorkingArea}
              onInputChange={(inputValue) => workingAreaInputChange(inputValue)}
              onChange={(e) => onChange(e, "workingArea")}
              className="form-control pl-0 arrow-3 w-100 font-size-4 d-flex align-items-center w-100 "
              border={false}
              defaultValue={form.workingArea}
              error={(!form.workingArea && emptyError) || workingAreaError}
            />
          </div>

          <div className="row form-group position-relative">
            <div className="col-lg-3 pl-9">
              <DateForm label="Starting Date" name="startingDate" onChange={onChange}
                defaultValue={form.startingDate}
                error={(!form.startingDate && emptyError) || startingDateError}
              />
            </div>

            <div className="col-lg-3">
              <label >
                <input type="checkbox" name="onGoing" id="terms-check" onChange={onChange}
                  value="true"
                  defaultChecked={form.onGoing} />
                {"  "}  onGoing
              </label>
            </div>

            <div className="col-lg-4">
              {!form.onGoing &&
                <DateForm label="Ending Date" name="endingDate" onChange={onChange}
                  defaultValue={form.endingDate} // form.onGoing checkbox değiştiğinde
                  startDateDisable={form.startingDate}
                  error={!form.endingDate ? emptyError : startingDateAndEndDateFail}
                />
              }
            </div>
          </div>



          <ButtonWithProgress className="btn btn-primary btn-medium w-100 rounded-5 text-uppercase"
            onClick={onClickSave}
            disabled={pendinApiCall || startingDateAndEndDateFail || emptyError}
            pendingApiCall={pendinApiCall}
            text={candContext.t("Save")}
          />
          {saveError}


        </div>
      </Modal.Body>
    </ModalStyled>);
}

export default CandidateWorkExperienceModal;