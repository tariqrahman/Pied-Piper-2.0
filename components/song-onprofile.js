export default function SongOnProfile({ ...props }) {
  // const userLikedTracks = props.userLikedTracks;
  //const currentSong = props.count;
  // assuming we are going to need to pass a num to specify which one to show on the page

  const userLikedTracks = props.userLikedTracks[0];
  //holds an array of at most 10 tracks
  const trackArr = userLikedTracks.items;
  console.log(userLikedTracks.items);
  //probably use a prop to select which track to display or
  const trackOfInterest = trackArr[0].track;
  console.log(trackOfInterest);

  //track Obj holds image, songname, and artist
  const trackObj = [];
  var curTrack;
  for (let i = 0; i < trackArr.length; i++) {
    //cur Track is an object
    var curTrack = trackArr[i];
    var tracks = Object.values(curTrack);
    console.log("cur track: " + tracks);
    console.log(tracks[0].name);
    //albumData
    var albumData = tracks[0].album;
    var albumName = albumData.name;
    var albumLink = "https://open.spotify.com/search/"+albumName;
    console.log(albumName);
    //image data
    var imageData = albumData.images[1];
    var imgWidth = imageData.width;
    var imgHeight = imageData.height;
    var imgSrc = imageData.url;
    console.log(imgSrc);
    //track name
    var trackName = tracks[0].name;
    var trackLink = "https://open.spotify.com/search/"+trackName;
    console.log(trackName);
    //artist Data
    var artistData = tracks[0].artists[0];
    var artistName = artistData.name;
    var artistLink = "https://open.spotify.com/search/"+artistName;
    trackObj.push(
      <div className="flex flex-col w-32 align-middle hover:rounded-xl gap-1 min-w-min shrink-0 hover:bg-zinc-700 hover:scale-105 ">
        <a href={albumLink}><img className=" h-32 bg-cover" src={imgSrc} alt="albumcover"></img></a>
        <a href={trackLink}><div className="flex text-md company-text bold">
          {trackName}
        </div></a>
        <a href={artistLink}><div className="flex text-sm company-text text-zinc-400">
          {artistName}
        </div></a>
      </div>
    );
  }

  return trackObj;
}
