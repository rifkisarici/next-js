import ProfileImageWithDefault from "../../ProfileImageWithDefault";
import universityIco from "../../../assets/work.ico";

const swapObject = (item) => {
    return ({
        ...item,
        experienceLevel: item.experienceLevel.label,
        company: item.company.label,
        workingArea: item.workingArea.label,
    })
}

const WorkExperienceCard = ({ experience }) => {

    const { company, experienceLevel, endingDate, onGoing, startingDate, image } = swapObject(experience);    

    let imageSource = universityIco;
    if (image) {
        imageSource = image;
    }

    let year = Math.floor(((new Date() - new Date(startingDate))) / (1000 * 60 * 60 * 24 * 30 * 12))
    let month = Math.floor(((new Date() - new Date(startingDate))) / (1000 * 60 * 60 * 24 * 30))

    if (year)
        month = month - (12 * year)
        
    return (<>

        <div className="w-100 ">
            <div className="d-flex align-items-center pr-11 mb-10 flex-wrap flex-sm-nowrap">
                <div className="square-72 d-block mr-8 mb-7 mb-sm-0">
                    <ProfileImageWithDefault image={imageSource} width="85" height="85" />
                </div>
                <div className="w-100 mt-n2">

                    <div className="d-flex align-items-center justify-content-md-between flex-wrap ">
                        <div className="font-size-4 text-black-2 font-weight-semibold">
                            {company}
                        </div>


                    </div>
                    <div className="font-size-4 text-black-2 font-weight-semibold">
                        {experienceLevel}
                    </div>
                    {/* <div >
                        <a className="font-size-4 text-gray line-height-2  mr-10">
                            {university}
                        </a>
                        Gpa:{gpa}
                    </div> */}

                    <div className="d-flex align-items-center justify-content-md-between flex-wrap">
                        <div className="font-size-4 text-gray mr-5">
                            Starting:{startingDate}
                        </div>
                        <div className="font-size-4 text-gray mr-5">
                            {onGoing ?
                                <div>Due:
                                    {year} years{" "}
                                    {month} month{" "}
                                </div>
                                :
                                <div>Ending:{endingDate}</div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </>);
}

export default WorkExperienceCard;