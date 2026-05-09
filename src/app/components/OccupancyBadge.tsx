interface OccupancyBadgeProps {
  level: "low" | "medium" | "high";
}

export function OccupancyBadge({ level }: OccupancyBadgeProps) {
  const config = {
    low: {
      label: "Baja",
      color: "bg-secondary",
      textColor: "text-secondary-foreground",
    },
    medium: {
      label: "Media",
      color: "bg-yellow-500",
      textColor: "text-white",
    },
    high: {
      label: "Alta",
      color: "bg-destructive",
      textColor: "text-destructive-foreground",
    },
  };

  const { label, color, textColor } = config[level];

  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${color} ${textColor}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5"></span>
      {label}
    </span>
  );
}