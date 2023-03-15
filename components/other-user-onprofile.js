import Link from "next/link";
import Router, { useRouter } from "next/router";
export default function UserOnProfile({ ...props }) {
  const router = useRouter();
  //will give this a prop that holds a list of all users to print  
  const users = props.userlist;
  console.log(users);
  var usersArr = users[0].follow_display;

  var componentArr = [];
  for(var i = 0; i < usersArr.length; i++){
    const curUser = Object.values(usersArr[i]);
    console.log(curUser);
    const display_name = curUser[1];
    const id = curUser[5];
    const profileRoute = "/users/"+id+"/profile";
    const imageData = Object.values(curUser[6][0]);
    const imgSrc = imageData[1];
    componentArr.push(
      <Link href={profileRoute} prefetch={false}>
        <div className="p-1 flex flex-col w-32 align-middle hover:rounded-xl gap-1 min-w-min shrink-0 hover:bg-zinc-700 hover:scale-105">
        <img
          className="h-32 bg-cover rounded-full"
          src={imgSrc}
          alt="user profile image"
        ></img>
        <div className="text-center text-md company-text text-white">{display_name}</div>
        </div>
      </Link>
    )
  }
  //find more users 
  componentArr.push(
    <Link href='/users' prefetch={false}>
        <div className="flex flex-col w-32 align-middle hover:rounded-xl gap-1 min-w-min shrink-0 hover:bg-zinc-700 hover:scale-105">
        <img
          className="h-32 bg-sky-500 bg-cover rounded-full"
          src=""
          alt=""
        ></img>
        <div className="text-center text-md company-text text-white">Find Others</div>
        </div>
      </Link>
  )
  
  return (
      componentArr
    );
  }