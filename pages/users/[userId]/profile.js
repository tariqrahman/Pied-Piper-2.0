import {useRouter} from "next/router"


function Profile(){
    const router = useRouter()
    const userId = router.query.userId
    return (
	    <h1> Profile for user {userId}</h1>    
    )
}

export default Profile
