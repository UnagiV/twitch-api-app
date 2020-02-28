import React from "react";
import "./Display.css";

const display = props => {
  return (
    <div>
      <h1 style={{ display: "block" }}>Streams :</h1>
      <br></br>
      {props.errorStreams && <div>No results for Streams</div>}
      {props.loadingStreams && <div className="loader" />}
      {props.responseObjStreams !== null
        ? props.responseObjStreams.streams.map((stream, index) => {
            return (
              <div key={stream._id} className="col-md-3 col-xs-6 height-all">
                <img src={stream.preview.medium} alt="du stream"></img>
                <br></br>
                <a
                  href={stream.channel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {stream.channel.status}
                </a>
              </div>
            );
          })
        : null}
      <h1 style={{ display: "block" }}>Games :</h1>
      <br></br>
      {props.errorGames && <div>No results for Games</div>}
      {props.loadingGames && <div className="loader" />}
      {props.responseObjGames !== null
        ? props.responseObjGames.games.map((game, index) => {
            if (index < 8) {
              return (
                <div key={game._id} className="col-md-3 col-xs-6 height-all">
                  <img src={game.box.medium} alt="du stream"></img>
                  <br></br>
                  <a
                    href={"https://www.twitch.tv/directory/game/" + game.name}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {game.name}
                  </a>
                </div>
              );
            } else {
              return null;
            }
          })
        : null}
      <h1 style={{ display: "block" }}>Channels :</h1>
      <br></br>
      {props.errorChannels && <div>No results for Channels</div>}
      {props.loadingChannels && <div className="loader" />}
      {props.responseObjChannels !== null
        ? props.responseObjChannels.channels.map(channel => {
            return (
              <div
                key={channel._id}
                className="col-md-3 col-xs-6 height-channels"
              >
                <img src={channel.logo} alt="du stream"></img>
                <br></br>
                <a href={channel.url} target="_blank" rel="noopener noreferrer">
                  {channel.display_name}
                </a>
              </div>
            );
          })
        : null}
    </div>
  );
};
export default display;
