import type { AccuracySnapshot } from "@/lib/predictor";

type Props = {
  snapshots: AccuracySnapshot[];
};

export const AccuracyPanel = ({ snapshots }: Props) => {
  return (
    <section className="rounded-3xl border border-emerald-500/20 bg-emerald-500/5 p-6">
      <header className="mb-6">
        <p className="text-xs uppercase tracking-[0.3em] text-emerald-300/80">Validation Layer</p>
        <h2 className="mt-2 text-2xl font-semibold text-emerald-100">Back-tested Accuracy Dashboard</h2>
        <p className="mt-1 text-sm text-emerald-200/80">
          Metrics derived from rolling 30-day samples. Hit-rate reflects binary success, Brier captures calibration.
        </p>
      </header>

      <div className="grid gap-5 lg:grid-cols-2">
        {snapshots.map((snapshot: AccuracySnapshot) => (
          <article key={snapshot.league.id} className="rounded-2xl border border-emerald-500/20 bg-slate-950/60 p-5">
            <header className="mb-4 flex items-baseline justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">{snapshot.league.name}</h3>
                <p className="text-xs uppercase tracking-[0.25em] text-emerald-200/60">
                  {snapshot.league.sport} · {snapshot.league.season} · n={snapshot.sampleSize}
                </p>
              </div>
              <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-200">
                Hit {Math.round(snapshot.hitRate * 100)}%
              </span>
            </header>

            <div className="grid gap-3 md:grid-cols-3">
              <dl className="rounded-xl border border-emerald-500/10 bg-slate-900/80 p-3">
                <dt className="text-xs uppercase tracking-[0.25em] text-emerald-200/70">Hit Rate</dt>
                <dd className="mt-2 text-xl font-semibold text-white">{(snapshot.hitRate * 100).toFixed(1)}%</dd>
              </dl>
              <dl className="rounded-xl border border-emerald-500/10 bg-slate-900/80 p-3">
                <dt className="text-xs uppercase tracking-[0.25em] text-emerald-200/70">Brier</dt>
                <dd className="mt-2 text-xl font-semibold text-white">{snapshot.brierScore.toFixed(3)}</dd>
              </dl>
              <dl className="rounded-xl border border-emerald-500/10 bg-slate-900/80 p-3">
                <dt className="text-xs uppercase tracking-[0.25em] text-emerald-200/70">Log Loss</dt>
                <dd className="mt-2 text-xl font-semibold text-white">{snapshot.logLoss.toFixed(3)}</dd>
              </dl>
            </div>

            <div className="mt-4">
              <p className="text-xs uppercase tracking-[0.25em] text-emerald-200/50">Calibration Check</p>
              <div className="mt-3 grid gap-2 text-xs text-emerald-100 sm:grid-cols-2">
                {snapshot.calibrationBuckets.map((bucket: AccuracySnapshot["calibrationBuckets"][number]) => (
                  <div
                    key={`${snapshot.league.id}-${bucket.label}`}
                    className="rounded-lg border border-emerald-500/10 bg-emerald-500/5 px-3 py-2"
                  >
                    <p className="text-[11px] uppercase tracking-[0.35em] text-emerald-200/60">{bucket.label}</p>
                    <p className="mt-1 font-semibold text-white">
                      Observed {(bucket.observed * 100).toFixed(1)}% · Expected {(bucket.expected * 100).toFixed(1)}%
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
