import React, { useContext, useState } from "react";
import styled from "styled-components";
import { Modal } from "react-bootstrap";
import CandidateContext from "../../../context/CandidateContext";
import { Select } from "../../Core";
import Label from "../../Label";
import { language_Levels, languages } from "../../../shared/staticValues";
import { useApiProgress } from '../../../shared/ApiProgress';
import ApiError from "../../ApiError";
import { postApiResumeLanguage, updateApiResumeLanguage, deleteApiResumeLanguage } from "../../../api/apiCalls";
import { onChangeAllObject, swapItemToSelectBox } from "../../../shared/ComponentsEvent"
import ButtonWithProgress from "../../ButtonWithProgress";

const ModalStyled = styled(Modal)`
  /* &.modal {
    z-index: 10050;
  } */
`;

const LanguageModal = ({ updateLanguageItem, showLanguage }) => {
  const languageLevels = (language_Levels.map((item) => (swapItemToSelectBox(item))))
  const languages2 = (languages.map((item) => (swapItemToSelectBox(item))))

  const candContext = useContext(CandidateContext);
  const [saveError, setSaveError] = useState(false);
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState(updateLanguageItem || {
    language: null,
    languageLevel: null,
  });

  const onChange = (event, selectName) => {
    onChangeAllObject(event, selectName, setForm)
  };

  const { language: languageError, languageLevel: languageLevelError } = errors;

  const pendingApiCallSave = useApiProgress('post', 'http://localhost:8080/api/1.0/resume/resumeLanguage');
  const pendingApiCallUpdate = useApiProgress('put', `http://localhost:8080/api/1.0/resume/resumeLanguage/update/${updateLanguageItem?.id}`);
  const pendinApiCall = pendingApiCallSave || pendingApiCallUpdate

  const onClickSave = async () => {
    const body = {
      language: form.language?.value,
      languageLevel: form.languageLevel?.value,
    };

    try {
      if (!updateLanguageItem) //save
        await postApiResumeLanguage(body);
      else //update
        await updateApiResumeLanguage(body, updateLanguageItem.id);
      showLanguage()
      handleClose();
    } catch (error) {
      if (error?.response?.data?.validationErrors) {
        setErrors(error.response.data.validationErrors);
      } else {
        setSaveError(<ApiError text={"internet bağlantısında yada serverlarda Beklenmedik bir hata oluştu"} />)
      }
    }
  }

  const pendingDeleteLanguage = useApiProgress('delete', `http://localhost:8080/api/1.0/resume/resumeLanguage/${updateLanguageItem?.id}`);
  const LanguageDelete = async () => {
    try {
      await deleteApiResumeLanguage(updateLanguageItem.id);
      showLanguage()
      handleClose()
    } catch (error) {
      setErrors(<ApiError text={"Hata oluştu Deneyim Bilgileri silinemdi"} />);
    }
  }

  const handleClose = () => {
    candContext.toggleLanguageModal()
    setSaveError(false)
  }

  return (
    <ModalStyled
      size="lg"
      centered
      show={candContext.languageModalVisible}
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

            <Label title={"Select Language"} />
            <Select
              onChange={(e) => onChange(e, "language")}
              options={languages2}
              className="form-control pl-0 arrow-3 w-100 font-size-4 d-flex align-items-center w-100 "
              border={false}
              defaultValue={form.language}
              error={languageError}
            />
          </div>
          <div className="form-group position-relative">
            <Label title={"Language Level"} />
            <Select
              onChange={(e) => onChange(e, "languageLevel")}
              options={languageLevels}
              className="form-control pl-0 arrow-3 w-100 font-size-4 d-flex align-items-center w-100 "
              border={false}
              defaultValue={form.languageLevel}
              error={languageLevelError}
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
                Adding a language test result
              </label>
              <input type="file" id="fileUpload" className="sr-only"
              />
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

            {updateLanguageItem && <ButtonWithProgress className="btn btn-danger btn-medium  rounded-5 text-uppercase"
              onClick={LanguageDelete}
              disabled={pendingDeleteLanguage}
              pendingApiCall={pendingDeleteLanguage}
              text={candContext.t("Delete")}
            />}

          </div>
        </div>
      </Modal.Body>
    </ModalStyled>);
}

export default LanguageModal;