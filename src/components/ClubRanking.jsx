import React, { useEffect, useState } from "react";
import axios from "axios";

const LeagueTable = ({ leagueName, apiUrl }) => {
  // خواندن API Key از env
  const apiKey = import.meta.env.VITE_FOOTBALL_API_KEY;
  const [loading, setLoading] = useState(true);
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://thingproxy.freeboard.io/fetch/${apiUrl}`,
          {
            headers: { "X-Auth-Token": apiKey },
          }
        );

        const standings = response.data.standings[0].table;
        const formattedClubs = standings.map((team) => ({
          name: team.team.name,
          logo: team.team.crest,
          played: team.playedGames,
          won: team.won,
          drawn: team.draw,
          lost: team.lost,
          goalsFor: team.goalsFor,
          goalsAgainst: team.goalsAgainst,
          points: team.points,
          goalDifference: team.goalDifference,
        }));

        setClubs(formattedClubs);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiUrl, apiKey]);

  return (
    <div className="bg-[#262626]/10 p-2 sm:p-3 md:p-4 rounded-lg h-full overflow-y-auto w-full">
      <h4 className="text-xl sm:text-2xl md:text-3xl text-[#262626] mb-3">
        {leagueName}
      </h4>

      {loading ? (
        <div className="flex justify-center items-center h-[200px]">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#262626]"></div>
        </div>
      ) : (
        <table className="w-full text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-[#262626]/20">
              <th className="py-2 text-left">#</th>
              <th className="py-2 text-left">Club</th>
              <th className="py-2 text-center">P</th>
              <th className="py-2 text-center">W</th>
              <th className="py-2 text-center">D</th>
              <th className="py-2 text-center">L</th>
              <th className="py-2 text-center">GF</th>
              <th className="py-2 text-center">GA</th>
              <th className="py-2 text-center">GD</th>
              <th className="py-2 text-center">Pts</th>
            </tr>
          </thead>
          <tbody>
            {clubs.map((club, index) => (
              <tr key={index} className="border-b border-[#262626]/10">
                <td className="py-2 text-center">{index + 1}</td>
                <td className="py-2 flex items-center gap-2 truncate">
                  {club.logo && (
                    <img
                      src={club.logo}
                      alt={club.name}
                      className="w-5 h-5 sm:w-6 sm:h-6"
                      onError={(e) => (e.target.style.display = "none")}
                    />
                  )}
                  <span className="truncate">{club.name}</span>
                </td>
                <td className="py-2 text-center">{club.played}</td>
                <td className="py-2 text-center">{club.won}</td>
                <td className="py-2 text-center">{club.drawn}</td>
                <td className="py-2 text-center">{club.lost}</td>
                <td className="py-2 text-center">{club.goalsFor}</td>
                <td className="py-2 text-center">{club.goalsAgainst}</td>
                <td className="py-2 text-center">{club.goalDifference}</td>
                <td className="py-2 text-center font-semibold">{club.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const NewsAndRankingSection = () => {
  const [selectedLeague, setSelectedLeague] = useState("PL");

  const leagues = {
    PL: {
      name: "Premier League",
      url: "https://api.football-data.org/v4/competitions/PL/standings",
    },
    SA: {
      name: "Serie A",
      url: "https://api.football-data.org/v4/competitions/SA/standings",
    },
    PD: {
      name: "La Liga",
      url: "https://api.football-data.org/v4/competitions/PD/standings",
    },
  };

  return (
    <div className="mx-4 sm:mx-8 md:mx-16 lg:mx-24 xl:mx-32 my-8">
      <h4 className="text-2xl sm:text-3xl md:text-4xl text-[#262626] mb-5">
        Club Ranking
      </h4>

      {/* انتخاب لیگ */}
      <div className="mb-4">
        <select
          value={selectedLeague}
          onChange={(e) => setSelectedLeague(e.target.value)}
          className="p-2 border border-[#262626]/30 rounded-md"
        >
          {Object.keys(leagues).map((key) => (
            <option key={key} value={key}>
              {leagues[key].name}
            </option>
          ))}
        </select>
      </div>

      {/* جدول لیگ انتخابی */}
      <LeagueTable
        leagueName={leagues[selectedLeague].name}
        apiUrl={leagues[selectedLeague].url}
      />
    </div>
  );
};

export default NewsAndRankingSection;
