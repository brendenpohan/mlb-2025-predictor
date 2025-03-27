import React, { useState } from "react";

export default function App() {
  const divisions = {
    AL_East: ["Yankees", "Blue Jays", "Rays", "Red Sox", "Orioles"],
    AL_Central: ["Guardians", "Twins", "White Sox", "Royals", "Tigers"],
    AL_West: ["Astros", "Mariners", "Rangers", "Angels", "Athletics"],
    NL_East: ["Braves", "Phillies", "Mets", "Marlins", "Nationals"],
    NL_Central: ["Brewers", "Cardinals", "Cubs", "Reds", "Pirates"],
    NL_West: ["Dodgers", "Padres", "Giants", "Diamondbacks", "Rockies"],
  };

  const [rankings, setRankings] = useState(
    Object.fromEntries(
      Object.entries(divisions).map(([key, teams]) => [
        key,
        Object.fromEntries(teams.map((team) => [team, ""])),
      ])
    )
  );
  const [alMVP, setAlMVP] = useState("");
  const [nlMVP, setNlMVP] = useState("");
  const [alCy, setAlCy] = useState("");
  const [nlCy, setNlCy] = useState("");
  const [alRoy, setAlRoy] = useState("");
  const [nlRoy, setNlRoy] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (division, team, value) => {
    setRankings((prev) => ({
      ...prev,
      [division]: {
        ...prev[division],
        [team]: value,
      },
    }));
  };

  const handleSubmit = () => setSubmitted(true);

  return (
    <div style={{ padding: "1rem", fontFamily: "Arial", maxWidth: 800, margin: "0 auto" }}>
      <h1>MLB 2025 分區與獎項預測</h1>

      {Object.entries(divisions).map(([key, teams]) => (
        <div key={key} style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem" }}>
          <h2>{key.replace("_", " ")}</h2>
          {teams.map((team) => (
            <div key={team} style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
              <label style={{ width: "120px" }}>{team}</label>
              <select
                value={rankings[key][team]}
                onChange={(e) => handleChange(key, team, e.target.value)}
              >
                <option value="">--</option>
                {[1, 2, 3, 4, 5].map((rank) => (
                  <option key={rank} value={rank}>{rank}</option>
                ))}
              </select>
            </div>
          ))}
        </div>
      ))}

      <div style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem" }}>
        <h2>獎項預測</h2>
        <input placeholder="AL MVP" value={alMVP} onChange={(e) => setAlMVP(e.target.value)} style={{ marginBottom: 8, padding: 4, width: "100%" }} />
        <input placeholder="NL MVP" value={nlMVP} onChange={(e) => setNlMVP(e.target.value)} style={{ marginBottom: 8, padding: 4, width: "100%" }} />
        <input placeholder="AL 賽揚獎" value={alCy} onChange={(e) => setAlCy(e.target.value)} style={{ marginBottom: 8, padding: 4, width: "100%" }} />
        <input placeholder="NL 賽揚獎" value={nlCy} onChange={(e) => setNlCy(e.target.value)} style={{ marginBottom: 8, padding: 4, width: "100%" }} />
        <input placeholder="AL 新人王" value={alRoy} onChange={(e) => setAlRoy(e.target.value)} style={{ marginBottom: 8, padding: 4, width: "100%" }} />
        <input placeholder="NL 新人王" value={nlRoy} onChange={(e) => setNlRoy(e.target.value)} style={{ marginBottom: 8, padding: 4, width: "100%" }} />
      </div>

      <button onClick={handleSubmit} style={{ padding: "0.5rem 1rem", fontSize: "1rem", cursor: "pointer" }}>送出預測</button>

      {submitted && (
        <div style={{ border: "1px solid #ccc", padding: "1rem", marginTop: "1rem" }}>
          <h2>你的分區預測</h2>
          {Object.entries(rankings).map(([division, teams]) => {
            const sortedTeams = Object.entries(teams)
              .filter(([_, rank]) => rank !== "")
              .sort((a, b) => parseInt(a[1]) - parseInt(b[1]));
            return (
              <div key={division} style={{ marginBottom: "1rem" }}>
                <h3>{division.replace("_", " ")}</h3>
                <ol>
                  {sortedTeams.map(([team, rank]) => (
                    <li key={team}>{rank}. {team}</li>
                  ))}
                </ol>
              </div>
            );
          })}
          <h3>MVP、賽揚獎 & 新人王</h3>
          <p>AL MVP: {alMVP}</p>
          <p>NL MVP: {nlMVP}</p>
          <p>AL 賽揚獎: {alCy}</p>
          <p>NL 賽揚獎: {nlCy}</p>
          <p>AL 新人王: {alRoy}</p>
          <p>NL 新人王: {nlRoy}</p>
        </div>
      )}
    </div>
  );
}
