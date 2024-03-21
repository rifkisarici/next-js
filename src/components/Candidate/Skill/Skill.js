import React, { useState, useContext, useEffect } from "react";
import AddIco from "../../../assets/add.ico"
import CandidateContext from "../../../context/CandidateContext";
import SkillModal from "./SkillModal";
import { getApiResumeSkills } from "../../../api/apiCalls";
import { swapItemToSelectBox } from "../../../shared/ComponentsEvent"
import { useApiProgress } from '../../../shared/ApiProgress';
import Spinner from '../../../components/Spinner';
import ApiError from "../../ApiError";

const Skill = ({ title, skillType}) => {
    const candContext = useContext(CandidateContext);
    const [skillList, setSkillList] = useState([]);
    const [updateSkillItem, SetUpdateSkillItem] = useState(null);
    const [modalRender, setModalRender] = useState(false);
    const [errorSkillLoading, setErrorSkillLoading] = useState(false);

    const addSkill =  () => {
        setModalRender(true)
        candContext.toggleSkillModal();
        SetUpdateSkillItem(null);
    }

    const updateSkill = (item) => {
        setModalRender(true)
        SetUpdateSkillItem(item);
        candContext.toggleSkillModal();
    }

   
    const pendingSkill = useApiProgress('get', `http://localhost:8080/api/1.0/resume/${skillType.type3}/${skillType.type2}`);

    useEffect(() => {
        loadSkill();
    }, []);

    const loadSkill = async () => {
        try {
            const response = await getApiResumeSkills(skillType.type3,skillType.type2);
            setSkillList(response.data.map((item) => ({
                ...item,
                skill: swapItemToSelectBox(item.skill)
            })))
            setErrorSkillLoading(false);
        } catch (error) {
            setErrorSkillLoading(<ApiError text={"Hata oluştu Deneyim Bilgileri yüklenemedi"} />);
        }
    }

    return (<>
        {/* modalRender; Sürekli renderlanırsa iki defa cağrıldığı zamn üst üste açılır. Gereksiz redndire önler."candContext.skillModalVisible"  global olduğu için her iki skill için tru durmuna gelir*/}
        {modalRender && <SkillModal skillType={skillType} updateSkillItem={updateSkillItem} showSkill={loadSkill} setModalRender={setModalRender} />}
        <div className="border-top pr-xl-0 pr-xxl-14 p-5 pl-xs-12 pt-7 pb-5">
            <div className="d-flex align-items-center justify-content-md-between flex-wrap">
                <h4 className="font-size-6 mb-7 mt-5 text-black-2 font-weight-semibold">
                    {title}
                </h4>
                <a href="/#" onClick={(e) => { e.preventDefault(); addSkill(); }}>
                    <img src={AddIco.src} alt="" width={23} height={25} />
                </a>
            </div>

            {pendingSkill ? <Spinner /> :
            <ul className="list-unstyled d-flex align-items-center flex-wrap">
                {skillList.map((item, index) => (
                    <li key={index}>
                        <a className="bg-polar text-black-2  mr-6 px-7 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center" href="/#"
                            onClick={(e) => {
                                e.preventDefault();
                                updateSkill(item);
                            }}>
                            {item.skill.name}
                        </a>
                    </li>
                ))}
            </ul>}
            {errorSkillLoading}


        </div>

    </>);
}

export default Skill;