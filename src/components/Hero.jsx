export default function Hero() {
  return (
    <>
      <h1>
        Coffee Tracking for Coffee{" "}
        <abbr title="An enthusiast or devotee">Friends</abbr>
      </h1>
      <div className="benefits-list">
        <h3 className="font-bolder">
          Try <span className="text-gradient">Caffiend</span> and start...
        </h3>
        <p>&#x2705; Tracking every coffee</p>
        <p>&#x2705; Measuring your blood caffeine levels</p>
        <p>&#x2705; Costing and quantifying your addiction</p>
      </div>
      <div className="card info-card">
        <div>
          <i className="fa-solid fa-circle-info" />
          <h3>Did you know...</h3>
        </div>
        <h5>That caffeine&apos;s half-life is about 5 hours?</h5>
        <p>This means that after 5 hours, half the caffeine you consumed is still in your system, keeping you alert longer! So if you drink a cup of coffee with 200 mg of caffeine, 5 hours later, you&apos;ll still have about 100 mg of caffeine in your system.</p>
      </div>
    </>
  );
}
