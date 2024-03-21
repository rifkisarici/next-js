
import Skill from "./Skill";

const skillType ={
    type1:"TechnicalSkill",
    type2:"technicalSkill",
    type3:"resumeTechnicalSkill",
  }

const TechnicalSkill = () => {

    return (<>
       
       <Skill title={"Technical Skills"} skillType={skillType} />

       
    </>);
}

export default TechnicalSkill;