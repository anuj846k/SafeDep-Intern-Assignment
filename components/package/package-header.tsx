import { FaGithub } from "react-icons/fa";
import MetricCard from "../metrics/metric-card";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { MdOutlineBugReport } from "react-icons/md";
import { FiBook } from "react-icons/fi";
import { HiGlobeAsiaAustralia } from "react-icons/hi2";
import { IoRibbonOutline } from "react-icons/io5";

const PackageHeader = () => {
  return (
    <section className="bg-slate-50 space-y-6 pt-4 pb-5 px-5 border-b border-border">
      <div className="flex flex-col gap-2 ">
        <div className="flex items-center flex-row gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-md border border-border">
            <FaGithub size={16} />
          </div>

          <span className="font-medium text-xl leading-7 text-[#1C2024]">
            next@15.5.4
          </span>
        </div>

        <div className="flex flex-col gap-2 ">
          <span className="text-sm text-muted-foreground">
            Analysed at{" "}
            <span className="text-foreground">24 Oct 2025, 10:06</span>
          </span>
        </div>

        <div className="grid grid-cols-5 gap-2">
          <MetricCard
            icon={<IoMdInformationCircleOutline />}
            label="Version"
            value="15.5.4"
          />

          <MetricCard
            icon={<MdOutlineBugReport />}
            label="Vulnerabilities"
            value="5"
            iconClassName="text-destructive"
          />

          <MetricCard
            icon={<FiBook />}
            label="OpenSSF Scorecard"
            value="9.5 / 10"
            textColor="text-primary"
          />

          <MetricCard
            icon={<IoRibbonOutline />}
            label="License"
            value="Apache-2.0"
          />
          <MetricCard
            icon={<HiGlobeAsiaAustralia />}
            label="Ecosystem"
            value="Go"
          />
        </div>
      </div>
    </section>
  );
};

export default PackageHeader;
