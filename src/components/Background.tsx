// Minimal monochrome backdrop — a single faint fixed grid. Purely decorative.
export function Background() {
  return (
    <div className="bg" aria-hidden>
      <div className="grid" />
    </div>
  );
}
