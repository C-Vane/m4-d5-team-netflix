import React, {useState} from 'react'
import "../App.css";
import Searchmf from "./Searchmf"
import axios from 'axios'
import Result from './Result'
import Results from './Results'
import Popup from './Popup'

function Searchfetch() {
  const[state, setState] = useState({
    s: "",
    results: [],
    selected: {}
})

const apiurl = "http://www.omdbapi.com/?apikey=ff133ca5";
console.log(apiurl)
const search = (e) => {
  if (e.key === "Enter") {
    axios(apiurl + "&s=" + state.s).then(({ data }) => {
      let results = data.Search;

      setState(prevState => {
        return { ...prevState, results: results }
      })
    });
  }
}

const handleInput = (e) => {
  let s = e.target.value;

  setState(prevState => {
    return { ...prevState, s: s }
  });
}

const openPopup = id => {
  axios(apiurl + "&i=" + id).then(({ data }) => {
    let result = data;

    console.log(result);

    setState(prevState => {
      return { ...prevState, selected: result }
    });
  });
}

const closePopup = () => {
  setState(prevState => {
    return { ...prevState, selected: {} }
  });
}

return (
  <div className="App">
    <header>
      <h1>Movie Database</h1>
    </header>
    <main>
      <Searchmf handleInput={handleInput} search={search} />

      <Results results={state.results} openPopup={openPopup} />

      {(typeof state.selected.Title != "undefined") ? <Popup selected={state.selected} closePopup={closePopup} /> : false}
    </main>
  </div>
);
}

export default Searchfetch;
