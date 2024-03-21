import React, { useContext, useState } from "react";
import styled from "styled-components";
import { Modal } from "react-bootstrap";
import CandidateContext from "../../../context/CandidateContext";
import { Select } from "../../Core";
import Input from "../../Input";
import DateForm from "../../DateForm.js";
import Label from "../../Label";
import { onChangeAllObject,  searchItemSelect } from "../../../shared/ComponentsEvent"
import { useApiProgress } from '../../../shared/ApiProgress';
import { postApiResumeEducation, updateApiResumeEducation, getApiUniversities } from "../../../api/apiCalls";
import Spinner from '../../../components/Spinner';
import { initialize } from "./initialize";
import ApiError from "../../ApiError";
import ButtonWithProgress from "../../ButtonWithProgress";

const departmans = [
  { value: "departman", label: "", id: 10 },
  { value: "departman1", label: "computer müh", id: 10 },
  { value: "departman2", label: "makina müh", id: 20 },
  { value: "departman3", label: "elektronik müh", id: 30 },
];

const ModalStyled = styled(Modal)`
  /* &.modal {
    z-index: 10050;
  } */
`;


const CandidateEducationModal = ({ editEducationItem, showEducaties }) => {
  const { listOfUniversities, pendingUniversities, pendingDepartment, listOfDepartments, educationLevels, gradeList } = initialize()
  const candContext = useContext(CandidateContext);
  const [saveError, setSaveError] = useState(false);
  const [errors, setErrors] = useState({});
  const selectSpinner = [{ label: <Spinner /> }]

  const [form, setForm] = useState(editEducationItem || {
    graduate: true,
    university: null,
    educationLevel: null,
    department: null,
    startingDate: null,
    endingDate: null,
    gpa: null,
    grade: null,
  });
  console.log("form",form);

  const onChange = (event, selectName) => {
    onChangeAllObject(event, selectName, setForm)
  };

  /* iki tarih varsa, ikinci tarihin sonra gelmesini için hata üretir.*/
  let startDateAndEndDateFail;
  if (form.graduate && Math.floor(((new Date(form.endingDate) - new Date(form.startingDate))) / (1000 * 60 * 60 * 24)) < 0) {
    startDateAndEndDateFail = candContext.t('startDateAndEndDateFail');
  }

  /* boş değer olmaması için hata üretir */
  //Frontend error
  let emptyError;
  if (!form.university || !form.educationLevel || !form.department || !form.startingDate || !form.gpa || (!form.endingDate && form.graduate) || (!form.grade && !form.graduate)) {
    emptyError = candContext.t("must_not_be_empty")
  }

  //backend error
  const { universityId: universityError, educationLevel: educationLevelError, universityDepartmentId: departmentError, startingDate: startingDateError, endingDate: endingDateError, graduate: graduateError } = errors;


  const handleClose = () => {
    candContext.toggleEducationModal()
    setSaveError(false)
  }

  /* <<<<<<<<<< REQUEST >>>>>>>>>> */
  /* <<<<<<<<<< SAVE >>>>>>>>>>*/
  const pendingApiCallSave = useApiProgress('post', 'http://localhost:8080/api/1.0/resume/education');
  const pendingApiCallUpdate = useApiProgress('put', `http://localhost:8080/api/1.0/resume/education/update/${editEducationItem?.id}`);
  const pendinApiCall = pendingApiCallSave || pendingApiCallUpdate

  const onClickSave = async () => {
    const body = {
      educationLevel: form.educationLevel.value,
      universityId: form.university.value,
      universityName: form.university.label,
      universityDepartmentId: form.department.value,
      startingDate: form.startingDate,
      endingDate: form.endingDate,
      gpa: form.gpa,
      graduate: form.graduate,
      grade: form.grade && form.grade.value,
    };

    try {
      if (!editEducationItem) //save
        await postApiResumeEducation(body);
      else //update
        await updateApiResumeEducation(body, editEducationItem.id);
      showEducaties()
      handleClose();
    } catch (error) {
      if (error?.response?.data?.validationErrors) {
        setErrors(error.response.data.validationErrors);
      } else {
        setSaveError(<ApiError text={"internet bağlantısında yada serverlarda Beklenmedik bir hata oluştu"} />)
      }
    }
  }

  //select kutusundan veritabnından veri aratma
  const [searchUni, setSearchUni] = useState();
  const searchUniversity = (inputValue) => {
    searchItemSelect(getApiUniversities, setSearchUni, inputValue )
  }



  return (
    <ModalStyled
      size="lg"
      centered
      show={candContext.educationModalVisible}
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
            <Label title={candContext.t("Education_Level")} info={"lorem ipsum"} />
            <Select
              onChange={(e) => onChange(e, "educationLevel")}
              options={educationLevels}
              className="form-control pl-0 arrow-3 w-100 font-size-4 d-flex align-items-center w-100 "
              border={false}
              //placeholder="Select..."
              defaultValue={form.educationLevel}
              error={(!form.educationLevel && emptyError) || educationLevelError}

            />
          </div>


          <div className="form-group position-relative">
            <Label title={candContext.t("University")} />
            <Select
              options={(pendingUniversities && selectSpinner) || searchUni || listOfUniversities}
              onInputChange={(inputValue) => { searchUniversity(inputValue) }}
              onChange={(e) => onChange(e, "university")}
              className="form-control pl-0 arrow-3 w-100 font-size-4 d-flex align-items-center w-100 "
              border={false}
              defaultValue={form.university}
              error={(!form.university && emptyError) || universityError}
            />
          </div>

          {pendingDepartment ? <Spinner /> :
            <div className="form-group position-relative">
              <Label title={candContext.t("Department_Names")} />
              <Select
                options={listOfDepartments}
                onChange={(e) => onChange(e, "department")}
                className="form-control pl-0 arrow-3 w-100 font-size-4 d-flex align-items-center w-100 "
                border={false}
                defaultValue={form.department}
                error={(!form.department && emptyError) || departmentError}
              />
            </div>}

          <div className="row form-group position-relative">
            <div className="col-lg-3 pl-9">
              <DateForm label="Starting Date" name="startingDate" onChange={onChange}
                defaultValue={form.startingDate}
                error={(!form.startingDate && emptyError) || startingDateError}
              />
            </div>

            <div className="col-lg-3">
              <label >
                <input type="checkbox" name="graduate" id="terms-check" onChange={onChange}
                  value="true"
                  defaultChecked={form.graduate} />
                {"  "} Graduated
              </label>
            </div>

            <div className="col-lg-4">
              {form.graduate ?
                <DateForm label="Ending Date" name="endingDate" onChange={onChange}
                  defaultValue={form.endingDate} // form.graduate checkbox değiştiğinde
                  startDateDisable={form.startingDate}
                  error={!form.endingDate ? emptyError : startDateAndEndDateFail}
                />
                :
                <div >
                  <Label title={candContext.t("Grade")} />
                  <Select
                    options={gradeList}
                    //onInputChange={(inputValue) => { !inputValue == "" && handleInputChange(inputValue, departmans) }}
                    onChange={(e) => onChange(e, "grade")}
                    className="form-control pl-0 arrow-3 w-100 font-size-4 d-flex align-items-center w-100 "
                    border={false}
                    defaultValue={form.grade} // form.graduate checkbox değiştiğinde form daki değeri alır
                    error={!form.grade && emptyError}
                  />
                </div>
              }
            </div>
          </div>

          <div className="col-lg-4 px-0 ">
            <Input label="Cumulative GPA" name="gpa" onChange={onChange} placeholder="on the 4th system"
              defaultValue={form.gpa}
              onKeyPress={(e) => !/[,0-9]/.test(e.key) && e.preventDefault()}
              maxLength={4}
              error={!form.gpa ? emptyError : undefined}
            />
          </div>


          <div className="upload-file mb-16 text-center">
            <div
              id="userActions"
              className="square-144 m-auto px-4 mb-5"
            >
              <label
                htmlFor="fileUpload"
                className="mb-0 font-size-4 text-smoke"
              >
                Add Transcript and Other Files
              </label>
              <input type="file" id="fileUpload" className="sr-only"
              />
            </div>
          </div>



          <ButtonWithProgress className="btn btn-primary btn-medium w-100 rounded-5 text-uppercase"
            onClick={onClickSave}
            disabled={pendinApiCall || startDateAndEndDateFail || emptyError}
            pendingApiCall={pendinApiCall}
            text={candContext.t("Save")}
          />
          {saveError}


        </div>
      </Modal.Body>
    </ModalStyled>);
}

export default CandidateEducationModal;