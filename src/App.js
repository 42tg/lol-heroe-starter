import React from "react";

import "./App.css";

function SearchField({ onSubmit }) {
  const [value, setValue] = React.useState("");

  return (
    <form
      className="search-field"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(value);
      }}
    >
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      ></input>
      <button type="submit">Filter</button>
    </form>
  );
}

const Heroe = ({ name, tags }) => {
  const [owned, setOwned] = React.useState(false);

  return (
    <tr>
      <td>{name}</td>
      <td>{tags.join(", ")}</td>
      <td>
        <input
          type="checkbox"
          checked={owned}
          onChange={() => setOwned(!owned)}
        ></input>
      </td>
    </tr>
  );
};

function HeroeList({ heroes }) {
  const [value, setValue] = React.useState("");

  return (
    <div className="heroe-list">
      <SearchField onSubmit={(value) => setValue(value)} />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Tags</th>
            <th>Owned</th>
          </tr>
        </thead>
        <tbody>
          {heroes
            .filter((heroe) =>
              heroe.name.toLowerCase().includes(value.toLowerCase())
            )
            .map((heroe) => (
              <Heroe name={heroe.name} tags={heroe.tags}></Heroe>
            ))}
        </tbody>
      </table>
    </div>
  );
}

function App() {
  const [heroes, setHeroes] = React.useState([]);

  React.useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/ngryman/lol-champions/master/champions.json"
    )
      .then((res) => res.json())
      .then((json) => {
        setHeroes(json);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header"></header>
      <HeroeList heroes={heroes}></HeroeList>
    </div>
  );
}

export default App;
