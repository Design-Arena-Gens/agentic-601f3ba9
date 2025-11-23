import { powerTable } from "@/lib/predictor";

type PowerRow = ReturnType<typeof powerTable>[number];

const rows: PowerRow[] = powerTable()
  .sort((a: PowerRow, b: PowerRow) => b.rating - a.rating)
  .slice(0, 12);

export const PowerLeaderboard = () => {
  return (
    <section className="rounded-3xl border border-purple-500/20 bg-purple-500/10 p-6">
      <header className="mb-5">
        <p className="text-xs uppercase tracking-[0.3em] text-purple-200/90">Power Index</p>
        <h2 className="mt-2 text-2xl font-semibold text-white">Cross-League Rating Board</h2>
        <p className="mt-1 text-sm text-purple-100/80">
          Normalized composite rating across attack, defense, coaching, and rolling form.
        </p>
      </header>

      <div className="overflow-hidden rounded-2xl border border-purple-500/20">
        <table className="min-w-full divide-y divide-purple-500/10 text-left text-sm text-purple-50">
          <thead className="bg-purple-500/10 text-xs uppercase tracking-[0.3em]">
            <tr>
              <th className="px-4 py-3">Rank</th>
              <th className="px-4 py-3">Team</th>
              <th className="px-4 py-3">League</th>
              <th className="px-4 py-3">Rating</th>
              <th className="px-4 py-3">Form</th>
              <th className="px-4 py-3">Attack</th>
              <th className="px-4 py-3">Defense</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-purple-500/10 bg-slate-950/60">
            {rows.map((row: PowerRow, index: number) => (
              <tr key={row.team} className="hover:bg-purple-500/10">
                <td className="px-4 py-3 text-xs uppercase tracking-[0.25em] text-purple-200/80">#{index + 1}</td>
                <td className="px-4 py-3 font-semibold text-white">{row.team}</td>
                <td className="px-4 py-3 text-purple-200/80">{row.league}</td>
                <td className="px-4 py-3 font-medium text-white">{row.rating.toFixed(1)}</td>
                <td className="px-4 py-3 text-purple-200/80">{row.form}%</td>
                <td className="px-4 py-3 text-purple-200/80">{row.attack}</td>
                <td className="px-4 py-3 text-purple-200/80">{row.defense}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
