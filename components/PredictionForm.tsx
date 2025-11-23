"use client";

import { useMemo, useState } from "react";
import type { TeamRating } from "@/data/leagues";
import { listLeagues } from "@/lib/predictor";
import type { MatchPrediction } from "@/lib/predictor";
import { predictMatch } from "@/lib/predictor";
import clsx from "clsx";

type Venue = "home" | "away" | "neutral";

type LeagueOption = ReturnType<typeof listLeagues>[number];

const leagueOptions: LeagueOption[] = listLeagues();

const formatProbability = (value: number) => `${(value * 100).toFixed(1)}%`;

const venueLabels: Record<Venue, string> = {
  home: "Home",
  away: "Away",
  neutral: "Neutral"
};

export const PredictionForm = () => {
  const [selectedLeagueId, setSelectedLeagueId] = useState<string>(leagueOptions[0]?.id ?? "nba");
  const [homeTeamId, setHomeTeamId] = useState<string>("");
  const [awayTeamId, setAwayTeamId] = useState<string>("");
  const [venue, setVenue] = useState<Venue>("home");
  const [prediction, setPrediction] = useState<MatchPrediction | null>(null);
  const [error, setError] = useState<string | null>(null);

  const selectedLeague = useMemo(
    () => leagueOptions.find((league) => league.id === selectedLeagueId) ?? leagueOptions[0],
    [selectedLeagueId]
  );

  const teams: TeamRating[] = useMemo(() => selectedLeague?.teams ?? [], [selectedLeague]);

  const handlePredict = () => {
    try {
      if (!selectedLeague || !homeTeamId || !awayTeamId) {
        throw new Error("Pick a league and both teams.");
      }
      if (homeTeamId === awayTeamId) {
        throw new Error("Teams must be different.");
      }
      const result = predictMatch(selectedLeague.id, homeTeamId, awayTeamId, venue);
      setPrediction(result);
      setError(null);
    } catch (ex) {
      setPrediction(null);
      setError(ex instanceof Error ? ex.message : "Unable to project matchup.");
    }
  };

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 shadow-2xl shadow-blue-900/30 backdrop-blur">
      <header className="mb-6 flex items-start justify-between gap-3">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-blue-300/80">Custom Forecast</p>
          <h2 className="mt-1 text-2xl font-semibold text-white">Simulate Any Matchup</h2>
        </div>
        <button
          type="button"
          onClick={() => {
            if (selectedLeague) {
              setHomeTeamId(selectedLeague.teams[0]?.id ?? "");
              setAwayTeamId(selectedLeague.teams[1]?.id ?? "");
              setVenue("home");
              setPrediction(null);
              setError(null);
            }
          }}
          className="rounded-full border border-blue-500/20 px-3 py-1 text-xs font-medium text-blue-200 hover:border-blue-400/50 hover:text-blue-100"
        >
          Randomize
        </button>
      </header>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm font-medium text-slate-300">
          League
          <select
            value={selectedLeagueId}
            onChange={(event) => {
              const nextLeague = event.target.value;
              setSelectedLeagueId(nextLeague);
              const league = leagueOptions.find((entry) => entry.id === nextLeague);
              if (league) {
                setHomeTeamId(league.teams[0]?.id ?? "");
                setAwayTeamId(league.teams[1]?.id ?? "");
              }
            }}
            className="rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-2 text-slate-100 outline-none transition focus:border-blue-500 focus:ring focus:ring-blue-500/30"
          >
            {leagueOptions.map((league: LeagueOption) => (
              <option key={league.id} value={league.id}>
                {league.name} · {league.sport}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium text-slate-300">
          Venue
          <div className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-950/70 p-1">
            {Object.entries(venueLabels).map(([value, label]) => (
              <button
                key={value}
                type="button"
                className={clsx(
                  "flex-1 rounded-lg px-3 py-2 text-sm font-semibold transition",
                  venue === value
                    ? "bg-blue-500 text-white shadow-lg shadow-blue-700/30"
                    : "text-slate-400 hover:text-white"
                )}
                onClick={() => setVenue(value as Venue)}
              >
                {label}
              </button>
            ))}
          </div>
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium text-slate-300">
          Home Side
          <select
            value={homeTeamId}
            onChange={(event) => setHomeTeamId(event.target.value)}
            className="rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-2 text-slate-100 outline-none transition focus:border-blue-500 focus:ring focus:ring-blue-500/30"
          >
            <option value="" disabled>
              Select team...
            </option>
            {teams.map((team: TeamRating) => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium text-slate-300">
          Opponent
          <select
            value={awayTeamId}
            onChange={(event) => setAwayTeamId(event.target.value)}
            className="rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-2 text-slate-100 outline-none transition focus:border-blue-500 focus:ring focus:ring-blue-500/30"
          >
            <option value="" disabled>
              Select opponent...
            </option>
            {teams.map((team: TeamRating) => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <button
        type="button"
        onClick={handlePredict}
        className="mt-6 w-full rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 py-3 text-center text-sm font-semibold uppercase tracking-widest text-white shadow-lg shadow-blue-800/50 transition hover:from-blue-400 hover:to-cyan-400"
      >
        Generate Projection
      </button>

      {error ? (
        <p className="mt-4 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
          {error}
        </p>
      ) : null}

      {prediction ? (
        <article className="mt-6 rounded-3xl border border-blue-500/10 bg-slate-950/80 p-6">
          <header className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
            <div>
              <h3 className="text-xl font-semibold text-white">
                {prediction.homeTeam.name} vs {prediction.awayTeam.name}
              </h3>
              <p className="text-sm text-slate-400">{selectedLeague.name}</p>
            </div>
            <span
              className={clsx(
                "rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-widest",
                prediction.riskBand === "High" && "bg-emerald-500/10 text-emerald-300",
                prediction.riskBand === "Medium" && "bg-amber-500/10 text-amber-300",
                prediction.riskBand === "Cautious" && "bg-slate-500/20 text-slate-200"
              )}
            >
              {prediction.riskBand} Confidence
            </span>
          </header>

          <div className="grid gap-6 md:grid-cols-3">
            <dl className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
              <dt className="text-xs uppercase tracking-[0.3em] text-blue-300/70">Win Probability</dt>
              <dd className="mt-3 text-3xl font-semibold text-white">
                {formatProbability(prediction.probabilities.home)}{" "}
                <span className="text-sm font-normal text-slate-400">vs</span>{" "}
                <span className="text-xl font-medium text-slate-200">
                  {formatProbability(prediction.probabilities.away)}
                </span>
              </dd>
              <p className="mt-2 text-xs text-slate-400">
                Projected margin: {prediction.projectedMargin} · Confidence index {(prediction.confidence * 100).toFixed(0)}%
              </p>
            </dl>

            <dl className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
              <dt className="text-xs uppercase tracking-[0.3em] text-blue-300/70">Projected Score</dt>
              <dd className="mt-3 text-3xl font-semibold text-white">
                {prediction.expectedScore.home}{" "}
                <span className="text-sm font-normal text-slate-400">-</span>{" "}
                <span className="text-xl font-medium text-slate-200">{prediction.expectedScore.away}</span>
              </dd>
              <p className="mt-2 text-xs text-slate-400">
                {prediction.homeTeam.shortName} pace advantage:{" "}
                {(prediction.homeTeam.pace - prediction.awayTeam.pace).toFixed(1)}
              </p>
            </dl>

            <dl className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
              <dt className="text-xs uppercase tracking-[0.3em] text-blue-300/70">Key Factors</dt>
              <dd className="mt-3 space-y-2 text-sm text-slate-300">
                {prediction.narratives[0]?.bullets?.slice(0, 2).map((point: string) => (
                  <p key={point}>• {point}</p>
                ))}
                <p>• Venue impact: {venueLabels[venue]}</p>
              </dd>
            </dl>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {prediction.narratives.slice(1, 3).map((narrative: MatchPrediction["narratives"][number]) => (
              <article key={narrative.headline} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
                <h4 className="text-sm font-semibold text-slate-200">{narrative.headline}</h4>
                <ul className="mt-2 space-y-1 text-xs text-slate-400">
                  {narrative.bullets.map((bullet: string) => (
                    <li key={bullet}>• {bullet}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </article>
      ) : null}
    </section>
  );
};
