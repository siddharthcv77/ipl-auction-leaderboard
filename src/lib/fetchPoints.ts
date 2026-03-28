import { PlayerConfig, PlayerPoints, FantasyApiResponse } from "./types";

function formatBuster(): string {
  const now = new Date();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  const yyyy = now.getFullYear();
  const hh = String(now.getHours()).padStart(2, "0");
  const min = String(now.getMinutes()).padStart(2, "0");
  const ss = String(now.getSeconds()).padStart(2, "0");
  return `${mm}${dd}${yyyy}${hh}${min}${ss}`;
}

async function fetchPlayerPoints(
  player: PlayerConfig
): Promise<PlayerPoints> {
  const buster = formatBuster();
  const url = `https://fantasy.iplt20.com/classic/api/feed/gameday-player/popup-cards?teamId=${player.teamId}&playerId=${player.playerId}&buster=${buster}`;

  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) {
      console.warn(`Failed to fetch ${player.name}: HTTP ${res.status}`);
      return { name: player.name, playerId: player.playerId, totalPoints: 0, matchesPlayed: 0 };
    }

    const data: FantasyApiResponse = await res.json();
    const completed = data.Data?.Value?.Completed;

    if (!completed || completed.length === 0) {
      return { name: player.name, playerId: player.playerId, totalPoints: 0, matchesPlayed: 0 };
    }

    const totalPoints = completed.reduce((sum, match) => sum + (match.GameDaypoints || 0), 0);
    return {
      name: player.name,
      playerId: player.playerId,
      totalPoints,
      matchesPlayed: completed.length,
    };
  } catch (error) {
    console.warn(`Error fetching ${player.name}:`, error);
    return { name: player.name, playerId: player.playerId, totalPoints: 0, matchesPlayed: 0 };
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchAllPoints(
  players: PlayerConfig[]
): Promise<PlayerPoints[]> {
  const results: PlayerPoints[] = [];
  const batchSize = 10;

  for (let i = 0; i < players.length; i += batchSize) {
    const batch = players.slice(i, i + batchSize);
    const batchResults = await Promise.all(batch.map(fetchPlayerPoints));
    results.push(...batchResults);

    if (i + batchSize < players.length) {
      await sleep(100);
    }
  }

  return results;
}
