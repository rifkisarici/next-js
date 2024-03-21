import React, { useState, useContext, useEffect } from "react";
import CandidateContext from "../../../context/CandidateContext";
import EducationModal from "./EducationModal";
import EducateCard from "./EducateCard";
import AddIco from "../../../assets/add.ico"
import EditIco from "../../../assets/edit.ico"
import Trash from "../../../assets/Trash.ico"
import { getApiResumeEducations, deleteApiResumeEducation } from "../../../api/apiCalls";
import { swapItemToSelectBox} from "../../../shared/ComponentsEvent"
import { useApiProgress } from '../../../shared/ApiProgress';
import Spinner from '../../../components/Spinner';
import ApiError from "../../ApiError";


const Education = () => {
    const candContext = useContext(CandidateContext);
    const [educateList, setEducateList] = useState([]);
    const [updateEduItem, SetUpdateEduItem] = useState(null);
    const [errorEduLoading, setErrorEduLoading] = useState(false);
    const [errorDeleteEdu, setErrorDeleteEdu] = useState(false);

    const addEducate = () => {
        SetUpdateEduItem(null);
        candContext.toggleEducationModal();
    }

    const editEducate = (item) => {
        SetUpdateEduItem(item);
        candContext.toggleEducationModal();
    }

    //EducateModal'dan çağrılır.
    const showEducaties = (form) => {
        //loadEducations() yapmadan(backend den tüm liste çağrılmadan) frontend listeleri günceler.
        /* 
         if (updateEduIndex != null) {
             educateList[updateEduIndex] = form
         } else {
             // setEducateList(previousItem => [...previousItem, form]); 
            
         } */

        loadEducations()
    }

    /* education listesinin backend en alınmasını takip eder. */
    const pendingEducations = useApiProgress('get', 'http://localhost:8080/api/1.0/resume/education/educations');

    useEffect(() => {
        loadEducations();
    }, []);

    /* <<<<<<<<<< REQUEST >>>>>>>>>> eğitim listesi  backend den alınır*/
    const loadEducations = async () => {
        try {
            const response = await getApiResumeEducations();
            setEducateList(response.data.map((item) => swapObjectToItemforEducateModal(item)))
            setErrorEduLoading(false);
        } catch (error) {
            setErrorEduLoading(<ApiError text={"Hata oluştu Eğitim Bilgileri yüklenemedi"} />);
        }
    }

    //educateList dil değiştiğinde tekrar swaplanır
    useEffect(async() => {        
        setEducateList(educateList.map((item) => (swapObjectToItemforEducateModal(item))))       
    }, [candContext.i18n.language]);

    
    //backenden gelen obje listesi Edit yapılabilmesi için uygun hale getirir.
    const swapObjectToItemforEducateModal = (item) => {
        return ({
            ...item,
            grade: swapItemToSelectBox(item.grade),
            educationLevel: swapItemToSelectBox(item.educationLevel),
            university: swapItemToSelectBox(item.university),
            department: swapItemToSelectBox(item.department),
        })
    }

    const pendingDeleteEducation = useApiProgress('delete', 'http://localhost:8080/api/1.0/resume/education/delete');

    const EduDelete = async (index) => {
        //backenden sildikten sonra, backend tekrar request "loadEducations();" edilebilinir. yada frontenden silinr.       
        try {
            await deleteApiResumeEducation(educateList[index].id);
            //fronteden siler. tekrar "loadEducations();" yapılmadı
                const newEducateList = [...educateList];
                newEducateList.splice(index, 1)
                setEducateList(newEducateList)

            setErrorDeleteEdu(false)
        } catch (error) {
            setErrorDeleteEdu(<ApiError text={"Hata oluştu Eğitim Bilgileri silinemdi"} />);
        }
    }


    return (<>
        {candContext.educationModalVisible && <EducationModal editEducationItem={updateEduItem} showEducaties={loadEducations} />}

        <div className="border-top pr-xl-0 pr-xxl-14 p-5 pl-xs-12 pt-7 pb-5">
            <div className="d-flex align-items-center justify-content-md-between flex-wrap">
                <h4 className="font-size-6 mb-7 mt-5 text-black-2 font-weight-semibold">
                    {candContext.t("Education")}
                </h4>
                <a
                    href="/#"
                    onClick={(e) => {
                        e.preventDefault();
                        addEducate();
                    }}
                >
                    <img src={AddIco.src} alt="" width={23} height={25} />

                </a>
            </div>


            {pendingEducations ? <Spinner/> : educateList.map((item, index) => (
                <div className="row form-group list-group-item-action">
                    <div key={index} className="col-lg-9 ">
                        <EducateCard educate={item} />
                    </div>

                    <div className="col-lg-3">
                        <a className="mr-8" href="/#" onClick={(e) => { e.preventDefault(); editEducate(item); }}>
                            <img src={EditIco.src} alt="" width={23} height={25} />
                        </a>

                        {pendingDeleteEducation ? <Spinner/> : <a href="/#" onClick={(e) => { e.preventDefault(); EduDelete(index); }}>
                            <img src={Trash.src} alt="" width={23} height={25} />
                        </a>
                        }
                    </div>
                    {errorDeleteEdu}
                </div>
            ))}
            {errorEduLoading}

        </div>
    </>);
}

export default Education;