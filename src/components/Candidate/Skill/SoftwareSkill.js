
import Skill from "./Skill";


const skillType ={
  type1:"SoftwareSkill",
  type2:"softwareSkill",
  type3:"resumeSoftwareSkill",
}

const SoftwareSkill = () => {

    return (<>

      <Skill title={"Software Skills"} skillType={skillType} />
     
    </>);
}

export default SoftwareSkill;