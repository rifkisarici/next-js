import React, { useContext, useState, useEffect } from "react";
import ProfileImageWithDefault from "../../../components/ProfileImageWithDefault";
import Input from "../../../components/Input";
import { onChangeAllObject,postApiCalls } from "../../../shared/ComponentsEvent"
import { useApiProgress } from '../../../shared/ApiProgress';
import { putUser } from "../../../api/apiCalls";
import Spinner from '../../../components/Spinner';
import ButtonWithProgress from '../../../components/ButtonWithProgress';


const profilCard = props => {
  const [inEditMode, setInEditMode] = useState(false);
  const [user, setUser] = useState(props.user);
  const { username, lastName, image } = user; /* username undefined olmayacak */

  const [updatedLastName, setUpdatedLastName] = useState();

 
  const pendingSaveApiCall = useApiProgress('put', `http://localhost:8080/api/1.0/user/${username}`);
  useEffect(() => {
    if (!inEditMode) {
      setUpdatedLastName(undefined);
      
    } else {
      setUpdatedLastName(lastName);
    }
  }, [inEditMode, lastName]);


  const onClickSave = async () => {
    const body = {
      lastName:updatedLastName,
      username:username
    };
    
    try {
      const response = await putUser(body);
      setInEditMode(false)
      setUser(response.data);
    } catch (error) {
    }
  }
 

  return (
    <div className="card text-center">
      <div className="card-header">
        <ProfileImageWithDefault className="rounded-circle shadow" width="200" height="200" image={image} />
      </div>
      <div className="card-body">
        {!inEditMode &&
          <>
            <h3>
              {username}{" "}{lastName}
            </h3>
            <button className="btn btn-success d-inline-flex" onClick={() => setInEditMode(true)}>
              <i className="material-icons">edit</i>
              Edit
            </button>
          </>
        }
        {inEditMode && <>
          <Input
            name="updatelastName"
            label='Change Last Name'
            defaultValue={lastName}
            onChange={event => { setUpdatedLastName(event.target.value)}}
          />
          
          <Input type="file" />
          <ButtonWithProgress className="btn btn-light d-inline-flex ml-1" onClick={onClickSave} text={"save"} pendingApiCall={pendingSaveApiCall} disabled={pendingSaveApiCall} />
          <ButtonWithProgress className="btn btn-light d-inline-flex ml-1" onClick={() => setInEditMode(false)} text={"cancel"} pendingApiCall={pendingSaveApiCall} disabled={pendingSaveApiCall} />

        </>}

      </div>
    </div>

  );
}

export default profilCard;