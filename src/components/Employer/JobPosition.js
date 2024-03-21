import React, { useState, useContext } from "react";
import EmployerContext from "../../context/EmployerContext";
import JobPositionModal from "./JobPositionModal";
import AddIco from "../../assets/add.ico"
import { isEmpty } from "lodash";


const JobPosition = () => {
    const empContext = useContext(EmployerContext);
    const [positionList, setPositionList] = useState([]);
    const [updatePositionIndex, SetUpdatePositionId] = useState(null);

    const addPosition = () => {
        empContext.togglePositionModal();
        SetUpdatePositionId(null);
    }

    console.log("positionList",positionList);

    const SavePosition = async (form) => {
        //try catch ApiProgress gerekli


        if (updatePositionIndex != null) {
            positionList[updatePositionIndex] = form
        } else {
            setPositionList(previousItem => [...previousItem, form]);
        }

        empContext.togglePositionModal(); //handleClose()
    }

    const FillUpdate = (index) => {
        empContext.togglePositionModal();
        SetUpdatePositionId(index);
    }

    return (<>
        <JobPositionModal /*edit için tekrar gönderir*/ fillUpdatePositionItem={[updatePositionIndex]} SavePosition={SavePosition} />

        <div className="border-top pr-xl-0 pr-xxl-14 p-5 pl-xs-12 pt-7 pb-5">
            <div className="d-flex align-items-center justify-content-md-between flex-wrap">
                <h4 className="font-size-6 mb-7 mt-5 text-black-2 font-weight-semibold">
                    Position
                </h4>


             {positionList.length == 0  ?  <a
                    href="/#"
                    onClick={(e) => {
                        e.preventDefault();
                        addPosition();
                    }}
                >
                    <img src={AddIco.src} alt="" width={23} height={25} />

                </a>:""} 

            </div>


            <ul className="list-unstyled d-flex align-items-center flex-wrap">
                {positionList.map((item, index) => (
                    <li key={index}>

                        <a className="bg-polar text-black-2  mr-6 px-7 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center" href="/#"
                            onClick={(e) => {
                                e.preventDefault();
                                FillUpdate(index);
                            }}>
                            {item.positionType.label}
                        </a>

                    </li>
                )
                )}
            </ul>


        </div>
    </>);
}


export default JobPosition;