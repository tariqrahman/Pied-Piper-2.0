import Link from "next/link";
export default function UserDisplay({ ...props }) {
  const imgURL = props.data["user_img_url"];
  return (
    <div
      className="w-9/12"
      style={{
        display: "flex",
        gap: "20px 50px",
        marginTop: "10px",
        marginBottom: "25px",
      }}
    >
      <ProfileImage src={imgURL} />
      <UserData followUser={props.followHandler} data={props.data} />
    </div>
  );
}

export function ProfileImage({ ...props }) {
  return (
    <div className="mx-auto my-auto">
      <img className=" rounded-full " src={props.src} alt="logo"></img>
    </div>
  );
}

/* function should return user data in the form:
    {
      display_name:
      top_tracks: [
        {
          song_name: "",
          artist: "",
          album: "",
        },
        {...},
        {...}
      ]
    },
    {},
    {},
*/
function processData(data) {
  console.log("Processing Data...");
  const result = {};
  result["display_name"] = data["display_name"];
  result["id"] = data["userid"];
  result["user_image"] = data["user_img_url"];
  const sortedPopularity = (data["tracks"] == null ? [] : data["tracks"]).sort(
    function (a, b) {
      return b.track.popularity - a.track.popularity;
    }
  );
  const top3 = sortedPopularity.slice(0, 3);
  const topTracks = top3.map((t) => {
    return {
      song_name: t.track.name,
      artist: t.track.artists[0].name,
      album: t.track.album.name,
      image: t.track.album.images[2].url,
    };
  });
  result["top_tracks"] = topTracks;
  return result;
}

function DisplayTracks({ ...props }) {
  return (
    <div>
      {props.tracks.map((tr, idx) => {
        const song_name = tr["song_name"];
        const artist = tr["artist"];
        const album = tr["album"];
        const song_img = tr["image"];
        return (
          <div
            key={idx}
            className="flex flex-row items-center gap-2 h-fit shrink-0 pt-0.5"
          >
            <img className="h-8 w-8" src={song_img} alt="logo"></img>
            <div className="flex container flex-row justify-between">
              <div className="">{song_name}</div>
              <div className="text-zinc-400">
                {artist} | {album}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function UserData({ ...props }) {
  const displayedData = processData(props.data);
  console.log("userid here");
  console.log(displayedData["id"]);
  const id = displayedData["id"];
  const name = displayedData["display_name"];
  const tracks = displayedData["top_tracks"];
  return (
    <div
    className=""
      style={{
        flexDirection: "row",
      }}
    >
      <div
        style={{
          flexDirection: "column",
          width: "55vw",
          height: "20vh",
        }}
      >
        {/* username & follow button */}
        <div className="flex flex-row justify-between items-center text-zinc-300 text-3xl font-semibold ml-1 font-sans py-8">
          {name}
          <Link href={"http://localhost:3000/users/" + id + "/profile"}>
            <button
              className="border-zinc-300 text-zinc-300 border-2 px-3.5 py-1.5 rounded-xl text-base font-semibold leading-7 text-zinc-30 hover:scale-105"
              onClick={props.followUser}
            >
              Profile
            </button>
          </Link>
        </div>

        {/* tracks for user */}
        <div className="ml-2 p-1 pb-2 divide-y divide-solid divide-zinc-700 ">
          <div className="flex container flex-row text-zinc-300 justify-between mb-1 text-xl">
            <div className="flex font-semibold">Most Listened Tracks</div>
            <div className="flex text-blue-400 "></div>
          </div>
          {/** dynamically pull top 3 songs from spotify based on user */}
          {/* list of top 3 most listened tracks */}
          <div className=" flex flex-col text-zinc-300 justify-left gap-2 px-2 divide-y divide-solid divide-zinc-900 py-2 font-semibold">
            <DisplayTracks tracks={tracks} />
          </div>
        </div>
      </div>
    </div>
  );
}