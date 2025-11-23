import type { MatchPrediction } from "@/lib/predictor";

type Props = {
  predictions: MatchPrediction[];
};

export const CuratedPredictions = ({ predictions }: Props) => {
  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur">
      <header className="mb-6">
        <p className="text-xs uppercase tracking-[0.3em] text-blue-300/80">Spotlight Picks</p>
        <h2 className="mt-2 text-2xl font-semibold text-white">EdgeScore Featured Forecasts</h2>
        <p className="mt-1 text-sm text-slate-400">
          Blended projections combining ELO-style power ratings, tempo profiles, and rolling form.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {predictions.map((prediction: MatchPrediction) => (
          <article
            key={prediction.schedule?.id ?? `${prediction.league.id}-${prediction.homeTeam.id}-${prediction.awayTeam.id}`}
            className="group rounded-3xl border border-slate-800 bg-slate-950/70 p-5 transition hover:border-blue-500/40 hover:shadow-2xl hover:shadow-blue-900/30"
          >
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-blue-300/70">
                  {prediction.league.name} · {prediction.schedule?.date ?? "TBD"}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-white">
                  {prediction.homeTeam.shortName} vs {prediction.awayTeam.shortName}
                </h3>
              </div>
              <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-200">
                {prediction.riskBand} Edge
              </span>
            </div>

            <div className="grid gap-4 text-sm text-slate-300 md:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Win Probability</p>
                <p className="mt-2 text-xl font-semibold text-white">
                  {(prediction.probabilities.home * 100).toFixed(1)}%
                </p>
                <p className="text-xs text-slate-400">
                  Confidence {Math.round(prediction.confidence * 100)}% · Margin {prediction.projectedMargin}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Projected Score</p>
                <p className="mt-2 text-xl font-semibold text-white">
                  {prediction.expectedScore.home} - {prediction.expectedScore.away}
                </p>
                <p className="text-xs text-slate-400">{prediction.schedule?.confidenceNote}</p>
              </div>
            </div>

            <ul className="mt-4 space-y-1 text-xs text-slate-400">
              {prediction.narratives[0]?.bullets.slice(0, 3).map((bullet: string) => (
                <li key={bullet}>• {bullet}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
};
