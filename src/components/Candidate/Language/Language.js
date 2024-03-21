import React, { useState, useContext, useEffect } from "react";
import LanguageModal from "./LanguageModal";
import CandidateContext from "../../../context/CandidateContext";
import AddIco from "../../../assets/add.ico"
import { getApiResumeLanguage } from "../../../api/apiCalls";
import { swapItemToSelectBox } from "../../../shared/ComponentsEvent"
import { useApiProgress } from '../../../shared/ApiProgress';
import Spinner from '../../../components/Spinner';
import ApiError from "../../ApiError";

const Language = () => {
    const candContext = useContext(CandidateContext);
    const [languageList, setLanguageList] = useState([]);
    const [updateLanguageItem, SetUpdateLanguageItem] = useState(null);
    const [errorLanguageLoading, setErrorLanguageLoading] = useState(false);

    const addLanguage = () => {
        candContext.toggleLanguageModal();
        SetUpdateLanguageItem(null);
    }

    const updateLanguage = (item) => {
        SetUpdateLanguageItem(item);
        candContext.toggleLanguageModal();
    }

    const pendingLanguage= useApiProgress('get', 'http://localhost:8080/api/1.0/resume/resumeLanguage/language');

    useEffect(() => {
        loadLanguage();
    }, []);
    
    const loadLanguage = async () => {
        try {
            const response = await getApiResumeLanguage();
            setLanguageList(response.data.map((item) => ({
                ...item,
                language: swapItemToSelectBox(item.language),
                languageLevel: swapItemToSelectBox(item.languageLevel)               
            })))
            setErrorLanguageLoading(false);
        } catch (error) {
            setErrorLanguageLoading(<ApiError text={"Hata oluştu Deneyim Bilgileri yüklenemedi"} />);
        }
    }
    
    return (<>
       {candContext.languageModalVisible && <LanguageModal updateLanguageItem={updateLanguageItem} showLanguage={loadLanguage} />}
        <div className="border-top pr-xl-0 pr-xxl-14 p-5 pl-xs-12 pt-7 pb-5">
            <div className="d-flex align-items-center justify-content-md-between flex-wrap">
                <h4 className="font-size-6 mb-7 mt-5 text-black-2 font-weight-semibold">
                    Language
                </h4>
                <a
                    href="/#"
                    onClick={(e) => {
                        e.preventDefault();
                        addLanguage();
                    }}
                >
                    <img src={AddIco.src} alt="" width={23} height={25} />
                </a>
            </div>

            {pendingLanguage ? <Spinner /> :
            <ul className="list-unstyled d-flex align-items-center flex-wrap">
                {languageList.map((item, index) => (
                    <li key={index}>
                        <a className="bg-polar text-black-2  mr-6 px-7 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center" href="/#"
                            onClick={(e) => {
                                e.preventDefault();
                                updateLanguage(item);
                            }}>
                            {item.language.name}
                        </a>
                    </li>
                ))}
            </ul>}
            {errorLanguageLoading}


        </div>
    </>
    );
}

export default Language;