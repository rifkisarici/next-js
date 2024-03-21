
import defaultPicture from "../assets/profileImageDefault.ico";

const ProfileImageWithDefault = props => {
    const { image, tempimage } = props;

    let imageSource = defaultPicture;
    if (image) {
        imageSource =  image;
    }
    
    return (
        <img
            alt={`Profile`}
            src={tempimage || imageSource.src}
            {...props} 
            /* onError={event => {
                event.target.src = defaultPicture;
            }} */
        />
    );
};

export default ProfileImageWithDefault;