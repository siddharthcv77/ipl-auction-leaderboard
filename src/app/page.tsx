import { getLeaderboard } from "@/lib/getLeaderboard";
import Leaderboard from "@/components/Leaderboard";
import RefreshButton from "@/components/RefreshButton";

export default async function Home() {
  const standings = await getLeaderboard();

  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">IPL Auction Leaderboard</h1>
          <p className="text-slate-400 text-sm mt-1">
            Last updated: {new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
          </p>
        </div>
        <RefreshButton />
      </div>
      <Leaderboard standings={standings} />
    </main>
  );
}
