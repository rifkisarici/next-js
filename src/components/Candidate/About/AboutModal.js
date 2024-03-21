import React, { useContext, useState } from "react";
import styled from "styled-components";
import { Button, Modal } from "react-bootstrap";
import CandidateContext from "../../../context/CandidateContext";
import { onChangeAllObject } from "../../../shared/ComponentsEvent"
import { useApiProgress } from '../../../shared/ApiProgress';
import ButtonWithProgress from "../../ButtonWithProgress";
import { postApiCandidateAbout, putApiCandidateAbout } from "../../../api/apiCalls";
import ApiError from "../../ApiError";
const ModalStyled = styled(Modal)`
  /* &.modal {
    z-index: 10050;
  } */
`;
const CandidateAboutModal = ({ editAbout, showAbout }) => {
    const candContext = useContext(CandidateContext);
    const [saveError, setSaveError] = useState();
    const [modalAboutText, setModalAboutText] = useState();
    const [errors, setErrors] = useState();

    const onChange = (event, selectName) => {
        onChangeAllObject(event, selectName, setModalAboutText)
    };

    const pendingApiCallSave = useApiProgress('post', 'http://localhost:8080/api/1.0/candidate/about');
    const pendingApiCallEdit = useApiProgress('put', 'http://localhost:8080/api/1.0/candidate/about/update');
    const pendingApiCall = pendingApiCallSave || pendingApiCallEdit;

    const onClickSave = async () => {
        console.log("modalAboutText",modalAboutText);
        try {
            if (!editAbout) //save
                await postApiCandidateAbout(modalAboutText);
            else//update
                await putApiCandidateAbout(modalAboutText);
            showAbout()
            handleClose();
        } catch (error) {
            if (error?.response?.data?.validationErrors) {
                setErrors(error.response.data.validationErrors.about);
            } else {
                setSaveError(<ApiError text={"Beklenmedik internet bağlantısında yada serverlarda bir hata oluştu"} />)
            }
        }
    }

    const handleClose = () => {
        candContext.toggleAboutModal();
        setModalAboutText({})
    };

    return (
        <ModalStyled
            size="lg"
            centered
            show={candContext.aboutModalVisible}
            onHide={candContext.toggleAboutModal}
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
                    <textarea
                        name="about"
                        id="aboutTextarea"
                        cols="30"
                        rows="7"
                        className="border border-mercury text-gray w-100 pt-4 pl-6"
                        placeholder="Describe about the you what make you unique"
                        defaultValue={editAbout}
                        onChange={onChange}
                        maxLength={1000}
                    ></textarea>

                    <div class="text-red" >{errors}</div>

                    <ButtonWithProgress
                        onClick={onClickSave}
                        disabled={pendingApiCall || errors}
                        pendingApiCall={pendingApiCall}
                        text={candContext.t("Save")}
                    />

                    {saveError}
                </div>
            </Modal.Body>
        </ModalStyled>);
}

export default CandidateAboutModal;