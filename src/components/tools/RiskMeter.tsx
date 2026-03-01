interface RiskMeterProps {
  /** 0-100 risk percentage */
  risk: number;
}

const RiskMeter = ({ risk }: RiskMeterProps) => {
  const clampedRisk = Math.min(100, Math.max(0, risk));
  const color =
    clampedRisk < 33 ? "bg-success" :
    clampedRisk < 66 ? "bg-warning" :
    "bg-danger";

  const label =
    clampedRisk < 33 ? "Low Risk" :
    clampedRisk < 66 ? "Medium Risk" :
    "High Risk";

  return (
    <div className="glass-card p-4 md:p-5">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-muted-foreground">Risk Level</p>
        <span className={`text-sm font-semibold ${
          clampedRisk < 33 ? "text-success" : clampedRisk < 66 ? "text-warning" : "text-danger"
        }`}>
          {label}
        </span>
      </div>
      <div className="h-3 rounded-full bg-secondary overflow-hidden">
        <div
          className={`h-full rounded-full ${color} transition-all duration-700 ease-out progress-animate`}
          style={{ width: `${clampedRisk}%` }}
        />
      </div>
      {clampedRisk >= 75 && (
        <p className="text-xs text-danger mt-2 animate-number">
          ⚠️ Warning: Extremely high liquidation risk
        </p>
      )}
    </div>
  );
};

export default RiskMeter;
