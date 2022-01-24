import competitions from "./modules/competitions.js";
import teams from "./modules/teams.js";
import matches from "./modules/matches.js";
import teammatches from "./modules/teammatches.js";

export default [
  {
    name: "Home",
    path: "/",
    props: true,
    redirect: () => {
      return {
        name: "CompetitionsTo",
      };
    },
  },
  ...competitions,
  ...matches,
  ...teams,
  ...teammatches,
];
