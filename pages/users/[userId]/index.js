import {useRouter} from "next/router"

function UserId(){
    const router = useRouter()
    const userId = router.query.userId
    return (
	    <h1> user Id route {userId}</h1>
    )
}

export default UserId
