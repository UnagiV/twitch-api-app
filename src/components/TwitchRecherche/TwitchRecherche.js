import React, { useState } from "react";
import Display from "../Display/Display.js";

function TwitchRecherche() {
  let [recherche, setRecherche] = useState("");
  let [responseObjStreams, setResponseObjStreams] = useState(null);
  let [responseObjGames, setResponseObjGames] = useState(null);
  let [responseObjChannels, setResponseObjChannels] = useState(null);
  let [loadingGames, setLoadingGames] = useState(false);
  let [loadingStreams, setLoadingStreams] = useState(false);
  let [loadingChannels, setLoadingChannels] = useState(false);
  let [errorGames, setErrorGames] = useState(false);
  let [errorStreams, setErrorStreams] = useState(false);
  let [errorChannels, setErrorChannels] = useState(false);

  const api_key = process.env.REACT_APP_API_ID;

  function rechercheFunction(e) {
    e.preventDefault();
    setLoadingStreams(true);
    setLoadingGames(true);
    setLoadingChannels(true);
    fetch(
      `https://api.twitch.tv/kraken/search/streams?query=${recherche}&limit=8`,
      {
        method: "GET",
        headers: {
          "client-id": api_key,
          accept: "application/vnd.twitchtv.v5+json"
        }
      }
    )
      .then(response => response.json())
      .then(response => {
        if (response.status) {
          throw new Error(response.error + " : " + response.message);
        }
        setResponseObjStreams(response);

        setLoadingStreams(false);
        setErrorStreams(false);
      })
      .catch(err => {
        setErrorStreams(true);
        setLoadingStreams(false);
        console.log(err.message);
      });
    fetch(
      `https://api.twitch.tv/kraken/search/games?query=${recherche}&limit=8`,
      {
        method: "GET",
        headers: {
          "client-id": api_key,
          accept: "application/vnd.twitchtv.v5+json"
        }
      }
    )
      .then(response => response.json())
      .then(response => {
        if (response.status) {
          throw new Error(response.error + " : " + response.message);
        }
        setResponseObjGames(response);

        setLoadingGames(false);
        setErrorGames(false);
      })
      .catch(err => {
        setErrorGames(true);
        setLoadingGames(false);
        console.log(err.message);
      });
    fetch(
      `https://api.twitch.tv/kraken/search/channels?query=${recherche}&limit=8`,
      {
        method: "GET",
        headers: {
          "client-id": api_key,
          accept: "application/vnd.twitchtv.v5+json"
        }
      }
    )
      .then(response => response.json())
      .then(response => {
        if (response.status) {
          throw new Error(response.error + " : " + response.message);
        }
        setResponseObjChannels(response);

        setLoadingChannels(false);
        setErrorChannels(false);
      })
      .catch(err => {
        setErrorChannels(true);
        setLoadingChannels(false);
        console.log(err.message);
      });
  }

  return (
    <div>
      <form onSubmit={rechercheFunction}>
        <input
          value={recherche}
          className="form-control display-inline"
          onChange={e => setRecherche(e.target.value)}
        ></input>
        <button type="submit" className="btn btn-primary">
          Rechercher
        </button>
      </form>

      <Display
        errorStreams={errorStreams}
        loadingStreams={loadingStreams}
        responseObjStreams={responseObjStreams}
        errorGames={errorGames}
        loadingGames={loadingGames}
        responseObjGames={responseObjGames}
        errorChannels={errorChannels}
        loadingChannels={loadingChannels}
        responseObjChannels={responseObjChannels}
      />
    </div>
  );
}

export default TwitchRecherche;
