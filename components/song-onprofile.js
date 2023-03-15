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
    var albumLink = albumData.href;
    console.log(albumName);
    //image data
    var imageData = albumData.images[1];
    var imgWidth = imageData.width;
    var imgHeight = imageData.height;
    var imgSrc = imageData.url;
    console.log(imgSrc);
    //track name
    var trackName = tracks[0].name;
    console.log(trackName);
    //artist Data
    var artistData = tracks[0].artists[0];
    var artistName = artistData.name;
    var artistLink = artistData.href;
    trackObj.push(
      <div className="flex flex-col w-32 align-middle hover:rounded-xl gap-1 min-w-min shrink-0 hover:bg-zinc-700 hover:scale-105 ">
        <img className=" h-32 bg-cover" src={imgSrc} alt="albumcover"></img>
        <div className="flex text-md company-text bold" href={albumLink}>
          {trackName}
        </div>
        <div className="flex text-sm company-text text-zinc-400" href={artistLink}>
          {artistName}
        </div>
      </div>
    );
  }

  return trackObj;
}
