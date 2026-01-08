import { BiLoaderCircle } from "react-icons/bi";
import {
  LiaArrowCircleDownSolid,
  LiaArrowCircleUpSolid,
} from "react-icons/lia";
import { PiWarningDiamondFill } from "react-icons/pi";
import { WiMoonAltThirdQuarter } from "react-icons/wi";
import { Badge } from "../ui/badge";

type RiskLevel = "low" | "high" | "medium" | "critical" | "unspecified";

const riskConfig: Record<
  RiskLevel,
  {
    label: string;
    icon: React.ReactNode;
    className: string;
  }
> = {
  low: {
    label: "Low",
    icon: <LiaArrowCircleDownSolid />,
    className: "bg-cyan-50 text-cyan-700",
  },
  medium: {
    label: "Medium",
    icon: <WiMoonAltThirdQuarter />,
    className: "bg-yellow-100 text-yellow-700",
  },
  high: {
    label: "High",
    icon: <LiaArrowCircleUpSolid />,
    className: "bg-pink-100 text-pink-700",
  },
  critical: {
    label: "Critical",
    icon: <PiWarningDiamondFill />,
    className: "bg-red-100 text-red-700",
  },
  unspecified: {
    label: "Unspecified",
    icon: <BiLoaderCircle />,
    className: "bg-neutral-100 text-neutral-600",
  },
};

export const RiskBadge = ({ level = "unspecified" }: { level?: RiskLevel }) => {
  const risk = riskConfig[level];

  return (
    <Badge className={`${risk.className} flex items-center gap-2 rounded-sm`}>
      {risk.icon}
      {risk.label}
    </Badge>
  );
};
