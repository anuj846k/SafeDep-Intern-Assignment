import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Ecosystem } from "@buf/safedep_api.bufbuild_es/safedep/messages/package/v1/ecosystem_pb.js";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(
  dateValue?: string | { seconds?: bigint | number; nanos?: number }
): string {
  if (!dateValue) return "N/A";

  try {
    let date: Date;

    if (typeof dateValue === "object" && "seconds" in dateValue) {
      const seconds = Number(dateValue.seconds);
      date = new Date(seconds * 1000);
    } else if (typeof dateValue === "string") {
      date = new Date(dateValue);
    } else {
      return "N/A";
    }

    if (isNaN(date.getTime())) return "N/A";

    return date.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
  } catch {
    return "N/A";
  }
}

export function getEcosystemFromString(ecosystem: string): Ecosystem {
  const ecosystemMap: Record<string, Ecosystem> = {
    npm: Ecosystem.NPM,
    pypi: Ecosystem.PYPI,
    go: Ecosystem.GO,
    maven: Ecosystem.MAVEN,
    cargo: Ecosystem.CARGO,
    nuget: Ecosystem.NUGET,
    rubygems: Ecosystem.RUBYGEMS,
    packagist: Ecosystem.PACKAGIST,
    vscode: Ecosystem.VSCODE,
    github_repository: Ecosystem.GITHUB_REPOSITORY,
    openvsx: Ecosystem.OPENVSX,
  };

  return ecosystemMap[ecosystem.toLowerCase()] ?? Ecosystem.NPM;
}

export function parseRisk(
  severities: { risk?: unknown }[]
): "low" | "medium" | "high" | "critical" | "unspecified" {
  if (!severities || severities.length === 0) return "unspecified";

  const riskMap: Record<
    string | number,
    "low" | "medium" | "high" | "critical"
  > = {
    RISK_LOW: "low",
    RISK_MEDIUM: "medium",
    RISK_HIGH: "high",
    RISK_CRITICAL: "critical",

    1: "low",
    2: "medium",
    3: "high",
    4: "critical",
  };

  for (const sev of severities) {
    const riskValue = String(sev.risk);
    if (riskMap[riskValue]) {
      return riskMap[riskValue];
    }

    if (typeof sev.risk === "number" && riskMap[sev.risk]) {
      return riskMap[sev.risk];
    }
  }
  return "unspecified";
}
