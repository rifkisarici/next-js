import React, { useState, useContext, useEffect } from "react";
import AboutModal from "./AboutModal";
import EditIco from "../../../assets/edit.ico"
import CandidateContext from "../../../context/CandidateContext";
import ApiError from "../../ApiError";
import { useApiProgress } from '../../../shared/ApiProgress';
import {getApiCandidateAbout} from "../../../api/apiCalls";
import Spinner from '../../../components/Spinner';

const About = () => {
    const candContext = useContext(CandidateContext);
    const [aboutText, setAboutText] = useState(null);
    const [errorAboutLoading, setErrorAboutLoading] = useState(false);

    /* education listesinin backend en alınmasını takip eder. */
    const pendingAbout = useApiProgress('get', 'http://localhost:8080/api/1.0/candidate/about');
    useEffect(() => {
        loadAbout();
    }, []);

    /* <<<<<<<<<< REQUEST >>>>>>>>>> eğitim listesi  backend den alınır*/
    const loadAbout = async () => {
        try {
            const response = await getApiCandidateAbout();
            setAboutText(response.data);
        } catch (error) {
            setErrorAboutLoading(<ApiError text={"Hata oluştu About Bilgileri yüklenemedi"} />);
        }
    }

    return (<>
        {candContext.aboutModalVisible && <AboutModal editAbout={aboutText} showAbout={loadAbout} />}
        <div className="border-top pr-xl-0 pr-xxl-14 p-5 px-xs-12 pt-7 pb-5">

            <div className="d-flex align-items-center justify-content-md-between flex-wrap">
                <h4 className="font-size-6 mb-7 mt-5 text-black-2 font-weight-semibold">
                    About
                </h4>
                <a
                    href="/#"
                    onClick={(e) => {
                        e.preventDefault();
                        candContext.toggleAboutModal();
                    }}
                >
                    <img src={EditIco.src} alt="" width={23} height={25} />

                </a>
            </div>


            {errorAboutLoading}
            {pendingAbout ? <Spinner /> : <>

                {!aboutText && !errorAboutLoading ? (
                    <p className="font-size-4 mb-8">
                        Describe about the you what make you unique
                    </p>
                ) :
                    <p >{aboutText}</p>
                }
            </>}
        </div>

    </>);
}

export default About;