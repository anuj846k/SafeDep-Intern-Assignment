import { ReactNode } from "react";

type MetricCardProps = {
  icon: ReactNode;
  label: string;
  value: string;
  textColor?: string;
  iconClassName?: string;
};

const MetricCard = ({
  icon,
  label,
  value,
  iconClassName,
  textColor,
}: MetricCardProps) => {
  return (
    <div className="rounded-md border border-border bg-white p-4">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-1">
          <div
            className={`flex h-6 w-6 items-center justify-center rounded-md border border-border p-1 ${
              iconClassName ?? "text-primary"
            }`}
          >
            {icon}
          </div>

          <span className="flex-1 min-w-0 truncate text-base leading-6 text-muted-foreground">
            {label}
          </span>
        </div>

        <span className={`text-3xl font-medium leading-9 ${textColor}`}>
          {value}
        </span>
      </div>
    </div>
  );
};

export default MetricCard;
