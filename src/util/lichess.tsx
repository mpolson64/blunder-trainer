import axios from "axios";
import { Game } from "../types/lichess-types";

const LIMIT = 100;

export const fetchGamesWithAnalysis = async (
  username: string,
  since: number
): Promise<Game[]> => {
  const response = await axios.request<string>({
    url: `https://lichess.org/api/games/user/${username}`,
    headers: { Accept: "application/x-ndjson" },
    params: {
      since,
      max: LIMIT,
      analysed: true,
      evals: true,
      perfType: "ultrabullet,bullet,blitz,rapid,classical",
    },
  });

  // When only one game exists the NDJSON is automatically parsed by AXIOS
  if (response.data.replace === undefined) {
    return [(response.data as unknown) as Game];
  }

  const commaSeparated = response.data.replace(/\n/g, ",");
  const json = `[${commaSeparated.slice(0, -1)}]`;

  return JSON.parse(json) as Game[];
};
