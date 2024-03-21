
import React from "react";
import universityIco from "../../../assets/university.ico";
import ProfileImageWithDefault from "../../ProfileImageWithDefault";

const swapObject = (item) => {
    return ({
        ...item,
        grade: item.grade.label,
        educationLevel: item.educationLevel.label,
        university: item.university.label,
        department: item.department.label,
    })
}
const EducateCard = ({ educate }) => {
    const { department, educationLevel, endingDate, gpa, grade, graduate, startingDate, university, image } = swapObject(educate); 

    let imageSource = universityIco;
    if (image) {
        imageSource = image;
    }

    return (<>

        <div className="w-100 ">
            <div className="d-flex align-items-center pr-11 mb-10 flex-wrap flex-sm-nowrap">
                <div className="square-72 d-block mr-8 mb-7 mb-sm-0">
                    <ProfileImageWithDefault image={imageSource} width="85" height="85" />
                </div>
                <div className="w-100 mt-n2">

                    <div className="d-flex align-items-center justify-content-md-between flex-wrap ">
                        <div className="font-size-4 text-black-2 font-weight-semibold">
                            {educationLevel}
                        </div>

                        <div className="font-size-4 text-black-2 font-weight-semibold">
                            {department}
                        </div>
                    </div>

                    <div >
                        <a className="font-size-4 text-gray line-height-2  mr-10">
                            {university}
                        </a>
                        Gpa:{gpa}
                    </div>

                    <div className="d-flex align-items-center justify-content-md-between flex-wrap">
                        <div className="font-size-4 text-gray mr-5">
                            Starting:{startingDate}
                        </div>
                        <div className="font-size-4 text-gray mr-5">
                            {graduate ?
                                <div>Ending:{endingDate}</div>
                                :
                                <div>Due:{grade} class</div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </>);
}

export default EducateCard;