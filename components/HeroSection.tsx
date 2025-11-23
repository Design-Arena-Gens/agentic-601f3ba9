export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-900/70 via-slate-950 to-slate-950 p-10 shadow-[0_20px_80px_-40px] shadow-blue-900/80">
      <div className="absolute -left-10 -top-10 h-48 w-48 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="absolute -right-10 bottom-0 h-52 w-52 rounded-full bg-cyan-400/10 blur-3xl" />
      <div className="relative z-10 grid gap-10 lg:grid-cols-[3fr_2fr]">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-blue-200/80">EdgeScore Labs</p>
          <h1 className="mt-3 text-4xl font-semibold text-white sm:text-5xl">
            Precision Sports Predictions with Transparent Confidence
          </h1>
          <p className="mt-4 max-w-2xl text-base text-slate-200/80">
            EdgeScore blends pace-adjusted ELO, rolling efficiency, and venue context to deliver forecasts you can trust.
            Each projection is backed by calibration metrics and narrative explainers so handicappers and fans stay ahead.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-slate-200/70">
            <div className="rounded-2xl border border-blue-500/30 bg-blue-500/10 px-4 py-3 text-left">
              <p className="text-xs uppercase tracking-[0.3em] text-blue-200/60">Trailing 30-Day Hit Rate</p>
              <p className="mt-2 text-2xl font-semibold text-white">61.8%</p>
            </div>
            <div className="rounded-2xl border border-cyan-500/30 bg-cyan-500/10 px-4 py-3 text-left">
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/60">Average Edge vs Closing</p>
              <p className="mt-2 text-2xl font-semibold text-white">+4.6%</p>
            </div>
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-left">
              <p className="text-xs uppercase tracking-[0.3em] text-emerald-200/60">Brier Score</p>
              <p className="mt-2 text-2xl font-semibold text-white">0.172</p>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-0 rounded-3xl bg-slate-900/40 blur-2xl" />
          <div className="relative rounded-3xl border border-blue-500/20 bg-slate-950/70 p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-blue-200/60">Signal Stack</p>
            <h2 className="mt-2 text-xl font-semibold text-white">Model Inputs</h2>
            <ul className="mt-3 space-y-3 text-sm text-slate-200/70">
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-2.5 w-2.5 flex-none rounded-full bg-blue-400" />
                <p>
                  <strong className="text-white">Dynamic Power Rating</strong> blends schedule-adjusted offense & defense with coaching leverage.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-2.5 w-2.5 flex-none rounded-full bg-cyan-400" />
                <p>
                  <strong className="text-white">Tempo & Pace Factors</strong> normalize possessions or drives to align cross-league comparisons.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-2.5 w-2.5 flex-none rounded-full bg-emerald-400" />
                <p>
                  <strong className="text-white">Form Momentum</strong> weights the last two weeks of performance with recency decay.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-2.5 w-2.5 flex-none rounded-full bg-purple-400" />
                <p>
                  <strong className="text-white">Venue Adjustment</strong> calibrates altitude, travel, and rest differentials by league.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
