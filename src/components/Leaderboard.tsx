import { TeamStanding } from "@/lib/types";
import TeamCard from "./TeamCard";

export default function Leaderboard({
  standings,
}: {
  standings: TeamStanding[];
}) {
  return (
    <div className="flex flex-col gap-4">
      {standings.map((team, index) => (
        <TeamCard key={team.teamName} team={team} rank={index} />
      ))}
    </div>
  );
}
