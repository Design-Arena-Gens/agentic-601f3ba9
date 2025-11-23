"use client";

import { useMemo } from "react";
import type { League } from "@/data/leagues";
import { HeroSection } from "@/components/HeroSection";
import { PredictionForm } from "@/components/PredictionForm";
import { CuratedPredictions } from "@/components/CuratedPredictions";
import { AccuracyPanel } from "@/components/AccuracyPanel";
import { PowerLeaderboard } from "@/components/PowerLeaderboard";
import { curatedPredictions, evaluateHistorical, listLeagues } from "@/lib/predictor";

const Page = () => {
  const spotlight = useMemo(() => curatedPredictions(), []);
  const leagueSnapshots = useMemo(
    () => listLeagues().map((league: League) => evaluateHistorical(league.id)),
    []
  );

  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-10 md:py-16">
      <HeroSection />
      <CuratedPredictions predictions={spotlight} />
      <PredictionForm />
      <AccuracyPanel snapshots={leagueSnapshots} />
      <PowerLeaderboard />
      <footer className="py-10 text-center text-xs text-slate-500">
        EdgeScore uses synthetic yet realistic data to demonstrate prediction accuracy. For wagering, verify with live data sources.
      </footer>
    </main>
  );
};

export default Page;
