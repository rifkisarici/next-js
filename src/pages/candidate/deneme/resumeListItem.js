import Link from "next/link";
import ProfileImageWithDefault from "../../../components/ProfileImageWithDefault";


const resumeListItem = props => {
    const { user } = props;
    const { username,  image } = user;

    return (
        <Link href={{pathname:"/Candidate/deneme/userPage",query: { username: `${username}` } }} >
        <a className="list-group-item list-group-item-action">

            <ProfileImageWithDefault className="rounded-circle" width="32" image={image}  />
            <span className="pl-3 ">{username} </span>

            <button onClick={(e) => deletes(index)}> delete </button>
        </a>
    </Link>
    );
}

export default resumeListItem;