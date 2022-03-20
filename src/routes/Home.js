import { useEffect, useState } from "react";
import { dbService } from 'fbase';
import Nweet from "components/Nweet";
import NweetFactory from "components/NweetFactory";

const Home = ({userObj}) => {
    const [nweets, setNweets] = useState([]);

    useEffect(() => {
        dbService.collection("nweets").orderBy("createAt","desc").onSnapshot((snapshot) => {
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

    return (
        <div className="container">
        <NweetFactory userObj={userObj}/>
        <div style={{ marginTop : 30 }}>
            {nweets.map((nweet) => (
                <Nweet 
                key={nweet.id} 
                nweetObj={nweet}
                isOwner={nweet.creatorId === userObj.uid}
                />
            ))}
        </div>
        </div>
    )
};

export default Home;