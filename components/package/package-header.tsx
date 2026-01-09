import { getEcosystemIcon } from "@/lib/ecosystem-icons";
import { FiBook } from "react-icons/fi";
import { HiGlobeAsiaAustralia } from "react-icons/hi2";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { IoRibbonOutline } from "react-icons/io5";
import { MdOutlineBugReport } from "react-icons/md";
import MetricCard from "../metrics/metric-card";

type PackageHeaderProps = {
  name: string;
  version: string;
  ecosystem: string;
  vulnerabilitiesCount: number;
  scorecardScore?: number;
  license?: string;
  analyzedAt?: string;
};

const PackageHeader = ({
  name,
  version,
  ecosystem,
  vulnerabilitiesCount,
  scorecardScore,
  license,
  analyzedAt,
}: PackageHeaderProps) => {
  const ecosystemIcon = getEcosystemIcon(ecosystem);

  return (
    <section className="bg-slate-50 space-y-6 pt-4 pb-5 px-5 border-b border-border">
      <div className="flex flex-col gap-2 ">
        <div className="flex items-center flex-row gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-md border border-border">
            {ecosystemIcon}
          </div>

          <span className="font-medium text-xl leading-7 text-[#1C2024]">
            {name}@{version}
          </span>
        </div>

        {analyzedAt && (
          <div className="flex flex-col gap-2 ">
            <span className="text-sm text-muted-foreground">
              Analysed at <span className="text-foreground">{analyzedAt}</span>
            </span>
          </div>
        )}

        <div className="grid grid-cols-5 gap-2">
          <MetricCard
            icon={<IoMdInformationCircleOutline />}
            label="Version"
            value={version}
          />

          <MetricCard
            icon={<MdOutlineBugReport />}
            label="Vulnerabilities"
            value={String(vulnerabilitiesCount)}
            iconClassName="text-destructive"
          />

          <MetricCard
            icon={<FiBook />}
            label="OpenSSF Scorecard"
            value={scorecardScore ? `${scorecardScore.toFixed(1)} / 10` : "N/A"}
            textColor="text-primary"
          />

          <MetricCard
            icon={<IoRibbonOutline />}
            label="License"
            value={license || "Unknown"}
          />
          <MetricCard
            icon={<HiGlobeAsiaAustralia />}
            label="Ecosystem"
            value={ecosystem.toUpperCase()}
          />
        </div>
      </div>
    </section>
  );
};

export default PackageHeader;
