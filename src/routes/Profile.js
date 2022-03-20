import { authService, dbService } from "fbase";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const Profile = ({userObj, refreshUser }) => {
    const history = useHistory();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName)

    const onLogOutClick = () => {
        authService.signOut();
        history.push("/");
    };

    const onChange = (event) => {
        const {
            target : {value},
        } = event
        setNewDisplayName(value)
    }

/*
    const getMyNweets = async () => {
        const nweets = await dbService
        .collection("nweets")
        .where("creatorId", "==", userObj.uid)
        .orderBy("createdAt","asc")
        .get()
        console.log(nweets.docs.map((doc) => doc.data()))
    }

    useEffect(() => {getMyNweets()}, [])
*/
    const onSubmit = async (event) => {
        event.preventDefault()
        if(userObj.displayName !== newDisplayName){
            await userObj.updateProfile({displayName : newDisplayName})
            refreshUser()
        }
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <input onChange={onChange}  type="text" placeholder="Display Name" value={newDisplayName}></input>
                <input type="submit" value="Update Profile"></input>
            </form>
            <button onClick={onLogOutClick}>LogOut</button>
        </>
    );
};

export default Profile;