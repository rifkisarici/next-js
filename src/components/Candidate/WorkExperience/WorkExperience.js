import React, { useState, useContext, useEffect } from "react";
import CandidateContext from "../../../context/CandidateContext";
import WorkExperienceModal from "./WorkExperienceModal";
import WorkExperienceCard from "./WorkExperienceCard";
import AddIco from "../../../assets/add.ico"
import EditIco from "../../../assets/edit.ico"
import Trash from "../../../assets/Trash.ico"
import { getApiResumeWorkExperiences, deleteApiResumeWorkExperience } from "../../../api/apiCalls";
import { swapItemToSelectBox } from "../../../shared/ComponentsEvent"
import { useApiProgress } from '../../../shared/ApiProgress';
import Spinner from '../../../components/Spinner';
import ApiError from "../../ApiError";

const WorkExperience = () => {
    const candContext = useContext(CandidateContext);
    const [experienceList, setExperienceList] = useState([]);
    const [updateExpItem, setUpdateExpItem] = useState(null);
    const [errorExpLoading, setErrorExpLoading] = useState(false);
    const [errorDeleteExp, setErrorDeleteExp] = useState(false);   

    const addExperience = () => {
        candContext.toggleWorkExperienceModal();
        setUpdateExpItem(null);
    }

    const editExperience = (index) => {
        setUpdateExpItem(index);
        candContext.toggleWorkExperienceModal();
    }

    const pendingExperiences = useApiProgress('get', 'http://localhost:8080/api/1.0/resume/workExperience/experiences');

    useEffect(() => {
        loadExperience();
    }, []);
    
    const loadExperience = async () => {
        try {
            const response = await getApiResumeWorkExperiences();            
            setExperienceList(response.data.map((item) => swapObjectToItemforWorkExperienceModal(item)))
            setErrorExpLoading(false);
        } catch (error) {
            setErrorExpLoading(<ApiError text={"Hata oluştu Deneyim Bilgileri yüklenemedi"} />);
        }
    }

    useEffect(() => {
        setExperienceList(experienceList.map((item) => (swapObjectToItemforWorkExperienceModal(item))))
    }, [candContext.i18n.language]);
    

    //backenden gelen obje listesi Edit yapılabilmesi için uygun hale getirir.
    const swapObjectToItemforWorkExperienceModal = (item) => {
        return ({
            ...item,
            experienceLevel: swapItemToSelectBox(item.experienceLevel),
            company: swapItemToSelectBox(item.company),
            workingArea: swapItemToSelectBox(item.workingArea),
        })
    }


    const pendingDeleteExperiences = useApiProgress('delete', 'http://localhost:8080/api/1.0/resume/workExperience/delete');
    const ExpDelete = async (item) => {  
        try {
            await deleteApiResumeWorkExperience(item.id);
            loadExperience();
            setErrorDeleteExp(false)
        } catch (error) {
            setErrorDeleteExp(<ApiError text={"Hata oluştu Deneyim Bilgileri silinemdi"} />);
        }
    }


    return (<>

        {candContext.workExperienceModalVisible &&
            <WorkExperienceModal editExperienceItem={updateExpItem} showWorkExperiences={loadExperience} />}

        <div className="border-top pr-xl-0 pr-xxl-14 p-5 pl-xs-12 pt-7 pb-5">
            <div className="d-flex align-items-center justify-content-md-between flex-wrap">
                <h4 className="font-size-6 mb-7 mt-5 text-black-2 font-weight-semibold">
                    {candContext.t("Work Experience")}
                </h4>
                <a
                    href="/#"
                    onClick={(e) => {
                        e.preventDefault();
                        addExperience();
                    }}
                >
                    <img src={AddIco.src} alt="" width={23} height={25} />

                </a>
            </div>


            {pendingExperiences ? <Spinner /> : experienceList.map((item, index) => (
                <div className="row form-group">
                    <div key={index} className="col-lg-9">
                        <WorkExperienceCard experience={item} />
                    </div>

                    <div className="col-lg-2">
                        <a className="mr-8" href="/#"
                            onClick={(e) => { e.preventDefault(); editExperience(item); }}
                        >
                            <img src={EditIco.src} alt="" width={23} height={25} />
                        </a>

                        {pendingDeleteExperiences? <Spinner/> : <a href="/#" onClick={(e) => { e.preventDefault(); ExpDelete(item); }}
                        >
                            <img src={Trash.src} alt="" width={23} height={25} />
                        </a>}

                    </div>
                    {errorDeleteExp}
                </div>
            ))}
            {errorExpLoading}

        </div>
    </>);
}

export default WorkExperience;