export default function SongsFromFollow({ ...props }) {
  const trackObj = [];
  const unprocessedList = props.followTrackList;
  console.log(unprocessedList)
  const processed1 = unprocessedList[0];
  console.log(processed1);
  const processed2 = Object.values(processed1);
  console.log(processed2);
  const userArr = processed2[1];
  console.log(userArr);
  const trackArr = processed2[0];
  console.log(trackArr)
  for(var i = 0; i< userArr.length && i < trackArr.length; i++){
    const curTrackArr = Object.values(trackArr);
    console.log("something" + curTrackArr);
  //const UserName = Object.values(curTrackArr[0]==null?[1,1,1]:curTrackArr[0])[1];// should be i
  const curTrackList = Object.values(curTrackArr[0]==null?[1,1,1]:curTrackArr[0])[1];// should be i
  console.log(curTrackList);
  const trackList = curTrackList.items;
  console.log(trackList);
  var curTrack;
  for (let j = 0; j < trackList.length; j++) {
    //cur Track is an object
    var curTrack = trackList[j];
    var tracks = Object.values(curTrack);
    console.log("cur track: " + tracks);
    console.log(tracks[1]);
    const trackCurrent = tracks[1];
    console.log(trackObj.name)
    //albumData
    var albumData = trackCurrent.album;
    var albumName = albumData.name;
    var albumLink = 'https://open.spotify.com/search/' + albumName;
    console.log(albumName);
    //image data
    var imageData = albumData.images[1];
    var imgWidth = imageData.width;
    var imgHeight = imageData.height;
    var imgSrc = imageData.url;
    console.log(imgSrc);
    //track name
    var trackName = trackCurrent.name;
    var trackLink = "https://open.spotify.com/search/" + trackName;
    console.log(trackName);
    //artist Data
    var artistData = trackCurrent.artists[0];
    var artistName = artistData.name;
    var artistLink = 'https://open.spotify.com/search/' + artistName;
    trackObj.push(
      <div className="flex flex-col w-32 align-middle hover:rounded-xl gap-1 min-w-min shrink-0 hover:bg-zinc-700 hover:scale-105 ">
        <a href={albumLink}><img className=" h-32 bg-cover" src={imgSrc} alt="albumcover"></img></a>
        <a href={trackLink}><div className="flex text-md company-text bold" href={albumLink}>
          {trackName}
        </div></a>
        <a href={artistLink}><div className="flex text-sm company-text text-zinc-400" href={artistLink}>
          {artistName}
        </div></a>
      </div>
    );
  }
  }

  return trackObj;
}
