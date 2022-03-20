import { useEffect, useState } from "react";
import { dbService } from 'fbase';
import Nweet from "components/Nweet";
import NweetFactory from "components/NweetFactory";

const Home = ({userObj}) => {
//    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
//    const [attachment, setAttachment] = useState("")

    // const getNweets = async () => {
    //     const dbNweets = await dbService.collection("nweets").get();
    //     dbNweets.forEach((document) => {
    //         const nweetObject = {... document.data(), id: document.id}
    //         setNweets((prev) => [nweetObject, ...prev])
    //     })
    // }

    useEffect(() => {
        // getNweets()
        dbService.collection("nweets").onSnapshot((snapshot) => {
            const newArray = snapshot.docs.map((document) => ({
                id: document.id,
                ... document.data(),
            }))
            setNweets(newArray)
        })
    }, [])


/*
    이미지 업로드 할때 
    FirebaseError: Missing or insufficient permissions.
    이 에러가 발생이 하게 되는 경우가 있는데
    firestore를 사용하면 프로젝트 초기에 권한 설정할때 일반권한으로 1달용으로 사용을 하게 된다.
    timestamp를 기준으로 설정이 되는데 기간이 만료되면 나온다.
    storage - rule - timestamp comment처리하고 - 아래와 같이 주석처리를 한다.
 //     allow read, write: if false;
        allow read, write: if request.auth.uid != null;

*/

    // const onSubmit = async (event) => {
    //     event.preventDefault();
    //     let attachmentUrl = ""
    //     if(attachment !== ""){
    //     const attachmentRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`)
    //     const response = await attachmentRef.putString(attachment, "data_url")
    //     attachmentUrl = await response.ref.getDownloadURL()}
    //     await dbService.collection("nweets").add({
    //         text : nweet,
    //         createdAt: Date.now(),
    //         creatorId: userObj.uid,
    //         attachmentUrl,
    //     })
    //     setNweet("")
    //     setAttachment("") 
    // }

    // const onChange = (event) => {
    //     event.preventDefault();
    //     const {
    //         target : {value},
    //     } = event;
    //     setNweet(value)
    // }

    // const onFileChange = (event) => {
    //     const {
    //         target : {files},
    //     } = event
    //     const theFile = files[0]
    //     const reader = new FileReader()
    //     reader.onloadend = (finishedEvent) => {
    //         const {
    //             currentTarget : {result},
    //         } = finishedEvent
    //         setAttachment(result)
    //     }
    //     reader.readAsDataURL(theFile)
    // }

    // const onClearAttachment = () => setAttachment("")

    return (
        <>
        {/* <form onSubmit={onSubmit}>
            <input value={nweet}
            onChange={onChange}
            type="text"
            placeholder="What's on your mind?"
            maxLength={120}
            />
            <input type="file" accept="image/*" onChange={onFileChange}/>
            <input type="submit" value="Nweet"/>
            {attachment && (
                <div>
                    <img src={attachment} width="50px" height="50px"/>
                    <button onClick={onClearAttachment}>Clear</button>
                </div>
                )}
        </form> */}
        <NweetFactory userObj={userObj}/>
        <div>
            {nweets.map((nweet) => (
                <Nweet 
                key={nweet.id} 
                nweetObj={nweet}
                isOwner={nweet.creatorId === userObj.uid}
                />
            ))}
        </div>
        </>
    )
};

export default Home;