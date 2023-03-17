import {useRouter} from "next/router"
import Link from "next/link"

function UserId(){
    const router = useRouter()
    const userId = router.query.userId
    return (
        <div>
            <h1> user Id: {userId}</h1>
            <Link>
                <h2> profile </h2>
            </Link>
        </div>
    )
}

export default UserId
