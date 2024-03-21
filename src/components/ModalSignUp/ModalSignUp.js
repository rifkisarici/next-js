import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { Modal } from "react-bootstrap";
import GlobalContext from "../../context/GlobalContext";
import { signupHandler } from "../../context/authActions";
import { useApiProgress } from '../../shared/ApiProgress';
import Input from "../Input";
import ButtonWithProgress from "../ButtonWithProgress"

const ModalStyled = styled(Modal)`
  /* &.modal {
    z-index: 10050;
  } */
`;

const ModalSignUp = () => {
  const gContext = useContext(GlobalContext);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({});

  const handleClose = () => {
    gContext.toggleSignUpModal();
  };  

  useEffect(() => {
    setForm({userRole: gContext.signUpModalVisible.type});
    setErrors({})
  }, [gContext.signUpModalVisible.visible]);

  const onChange = (event) => {
    const { name, value } = event.target;
    setErrors((previousErrors) => ({ ...previousErrors, [name]: undefined }));
    setForm((previousForm) => ({ ...previousForm, [name]: value }));
  };

  const onClickSignup = async () => {
    try {
      await signupHandler(form, gContext)
      handleClose()
    } catch (error) {
      if (error?.response?.data?.validationErrors) {
        setErrors(error.response.data.validationErrors);        
      }else{
        console.log("Beklenmedik internet bağlantısında yada serverlarda bir hata oluştu");
      }      
    }
    
  };

  const pendingApiCallSignup = useApiProgress('post', 'http://localhost:8080/api/1.0/user');
  const pendingApiCallLogin = useApiProgress('post', 'http://localhost:8080/api/1.0/auth'); // kayıt olduktan hemen sonra login olduğu için takip edilir.
  const pendingApiCall = pendingApiCallSignup || pendingApiCallLogin;

  const { name: nameError, surname: surnameError, username: userNameError, password: passwordError, companyName: companyNameError, taxNo: taxNoError } = errors;
  let passwordRepeatError;
  if (form.password !== form.passwordRepeat) {
    passwordRepeatError = gContext.t('Password mismatch');
  }


  return (
    <ModalStyled
      /* size="lg" */
      centered
      show={gContext.signUpModalVisible.visible}
      onHide={gContext.toggleSignUpModal}
    >
      <Modal.Body className="p-0">
        <button
          type="button"
          className="circle-32 btn-reset bg-white pos-abs-tr mt-n6 mr-lg-n6 focus-reset shadow-10"
          onClick={handleClose}
        >
          <i className="fas fa-times"></i>
        </button>
        <div >
          <div className="bg-white-2 h-100 px-11 pt-11 pb-7">
            <div className="row">
              <div className="col-4 col-xs-12">
                <div className="font-size-4 font-weight-semibold position-relative text-white bg-poppy h-px-48 flex-all-center w-100 px-6 rounded-5 mb-4">
                  <span >{gContext.signUpModalVisible.type} Sign Up</span>
                </div>
              </div>
            </div>


            <form action="/">
              {gContext.signUpModalVisible.type == "CANDIDATE" ?
                <div>
                  <div className="row">
                    <div className="col ">
                      <Input label="Name" name="name" error={nameError} onChange={onChange} placeholder="Name" />
                    </div>
                    <div className="col ">
                      <Input label="Surname" name="surname" error={surnameError} onChange={onChange} placeholder="Surname" />
                    </div>
                  </div>

                </div>
                :
                <div>
                  <div className="row">
                    <div className="col ">
                      <Input label="Name Surname" name="name" error={nameError} onChange={onChange} placeholder="Name Surname" />
                    </div>
                    <div className="col ">
                      <Input label="Company Name" name="companyName" error={companyNameError} onChange={onChange} placeholder="company Name" />
                    </div>
                  </div>
                  <Input label="Tax No" name="taxNo" error={taxNoError} onChange={onChange} placeholder="tax No"
                    onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()} maxLength={10} />
                </div>
              }

              <Input label="E-mail" name="username" error={userNameError} onChange={onChange} placeholder="example@gmail.com" />
              <Input label={gContext.t("Password")} name="password" error={passwordError} onChange={onChange} placeholder="Enter password" />
              <Input label="Confirm Password" name="passwordRepeat" error={passwordRepeatError} onChange={onChange} placeholder="Enter password" />

              <div className="form-group mb-8">
                <ButtonWithProgress className="btn btn-primary btn-medium w-100 rounded-5 text-uppercase"
                  onClick={onClickSignup}
                  disabled={pendingApiCall || passwordRepeatError !== undefined}
                  pendingApiCall={pendingApiCall}
                  text={gContext.t('Sign Up')}
                />
              </div>


            </form>
          </div>
        </div>
      </Modal.Body>
    </ModalStyled>
  );
};


export default ModalSignUp;
