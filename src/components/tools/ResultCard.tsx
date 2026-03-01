interface ResultCardProps {
  label: string;
  value: string;
  sublabel?: string;
  variant?: "default" | "primary" | "accent" | "danger";
}

const variantStyles = {
  default: "text-foreground",
  primary: "text-primary",
  accent: "text-accent",
  danger: "text-danger",
};

const ResultCard = ({ label, value, sublabel, variant = "default" }: ResultCardProps) => (
  <div className="glass-card p-4 md:p-5">
    <p className="text-xs md:text-sm text-muted-foreground mb-1">{label}</p>
    <p className={`text-2xl md:text-3xl font-heading font-bold ${variantStyles[variant]} animate-number`}>
      {value}
    </p>
    {sublabel && <p className="text-xs text-muted-foreground mt-1">{sublabel}</p>}
  </div>
);

export default ResultCard;
