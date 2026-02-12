interface PriceDisplayProps {
  price: number;
  period?: string;
  className?: string;
}

export function PriceDisplay({ price, period = "night", className }: PriceDisplayProps) {
  return (
    <div className={`flex items-baseline gap-1 ${className}`}>
      <span className="font-semibold text-lg">
        ${price.toLocaleString()}
      </span>
      {period && <span className="text-muted-foreground text-sm"> / {period}</span>}
    </div>
  );
}
