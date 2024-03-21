import React, { useState, useContext } from "react";
import EmployerContext from "../../context/EmployerContext";
import JobMilModal from "./JobMilModal";
import AddIco from "../../assets/add.ico"

const JobMil = () => {
    const empContext = useContext(EmployerContext);
    const [milList, setMilList] = useState([]);
    const [updateMilIndex, SetUpdateMilId] = useState(null);

    const addMil = () => {
        empContext.toggleMilModal();
        SetUpdateMilId(null);
    }

    const SaveMil = async (form) => {
        //try catch ApiProgress gerekli
        console.log("form",form);

        if (updateMilIndex != null) {
            milList[updateMilIndex] = form
        } else {
            setMilList(previousItem => [...previousItem, form]);
        }

        empContext.toggleMilModal(); //handleClose()
    }

    const FillUpdate = (index) => {
        empContext.toggleMilModal();
        SetUpdateMilId(index);
    }

    return (<>
        <JobMilModal /*edit için tekrar gönderir*/ fillUpdateMilItem={[updateMilIndex]} SaveMil={SaveMil} />

        <div className="border-top pr-xl-0 pr-xxl-14 p-5 pl-xs-12 pt-7 pb-5">
            <div className="d-flex align-items-center justify-content-md-between flex-wrap">
                <h4 className="font-size-6 mb-7 mt-5 text-black-2 font-weight-semibold">
                    Military Status
                </h4>
                <a
                    href="/#"
                    onClick={(e) => {
                        e.preventDefault();
                        addMil();
                    }}
                >
                    <img src={AddIco.src} alt="" width={23} height={25} />

                </a>

            </div>
            <ul className="list-unstyled d-flex align-items-center flex-wrap">
                {milList.map((item, index) => (
                    <li key={index}>

                        <a className="bg-polar text-black-2  mr-6 px-7 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center" href="/#"
                            onClick={(e) => {
                                e.preventDefault();
                                FillUpdate(index);
                            }}>
                            {item.milType.map((item2)=>(item2.label))
                            
                            }
                        </a>

                    </li>
                )
                )}
            </ul>
        </div>


    </>);
}

export default JobMil;