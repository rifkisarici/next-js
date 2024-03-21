import React, { useState, useContext } from "react";
import EmployerDashboardWrapper from "../../components/Employer/EmployerDashboardWrapper";
import { postApiCvPdf } from "../../api/apiCalls";
import ButtonWithProgress from "../../components/ButtonWithProgress";
const uploadCv = () => {
    const [newPDF, setNewPDF] = useState();
    const [PDFName, setPDFName] = useState();

    const handleChange = (files) => {
        const file = files[0];
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
            setNewPDF(fileReader.result);
        };
        fileReader.readAsDataURL(file);
        setPDFName(file.name)
    }

    const onClickPushPDF = async () => {   
        try {          
              await postApiCvPdf({pdfBase64:newPDF});            
          } catch (error) {
           
          }
    }

    return (<>
        <EmployerDashboardWrapper>
            <h5 className="font-size-6 font-weight-semibold mb-11"> Upload CV</h5>

            <div className="upload-file mb-16 text-center">
                <div id="userActions" className="square-144 m-auto " >
                    <label
                        htmlFor="fileUpload"
                        className="mb-0 font-size-4 text-smoke"
                    >
                        Add CV PDF Files
                    </label>

                    <input type="file" id="fileUpload" className="sr-only" accept="application/pdf"
                        multiple onChange={(event) => handleChange(event.target.files)}
                    />

                </div>
                <li>{PDFName}</li>
                <ButtonWithProgress className="btn btn-primary btn-medium rounded-5 text-uppercase"
                    onClick={onClickPushPDF}
                    //disabled={pendinApiCall}
                    //pendingApiCall={pendinApiCall}
                    text={"Push"}
                />
            </div>
            <div className="contact-form bg-white shadow-8 rounded-4 pl-sm-10 pl-4 pr-sm-11 pr-4 pt-15 pb-13">

                asdasd

            </div>
        </EmployerDashboardWrapper>
    </>);
}

export default uploadCv;