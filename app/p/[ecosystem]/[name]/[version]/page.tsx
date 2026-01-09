import PackageHeader from "@/components/package/package-header";
import PackageTabs from "@/components/package/package-tabs";
import { getPackageInsight } from "@/lib/safedeep/actions";
import { formatDate, getEcosystemFromString, parseRisk } from "@/lib/utils";

type PageProps = {
  params: Promise<{ ecosystem: string; name: string; version: string }>;
};

export default async function PackagePage({ params }: PageProps) {
  const { ecosystem, name, version } = await params;

  const ecosystemEnum = getEcosystemFromString(ecosystem);
  const decodedName = decodeURIComponent(name);
  const decodedVersion = decodeURIComponent(version);

  const result = await getPackageInsight(
    decodedName,
    decodedVersion,
    ecosystemEnum
  );
  //   if (result.success && result.data) {
  //     await fs.writeFile(
  //       path.join(process.cwd(), "/lib/mocks/safedep-result.json"),
  //       JSON.stringify(result.data, null, 2)
  //     );
  //   }

  if (!result.success) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold text-red-500">Error</h1>
        <p className="mt-2 text-gray-600">{result.error}</p>
      </div>
    );
  }

  const insight = result.data?.insight;

  const vulnerabilities = (insight?.vulnerabilities || []).map((v) => ({
    id: v.id?.value || "Unknown",
    summary: v.summary || "No summary available",
    risk: parseRisk(v.severities || []),
    published: formatDate(v.publishedAt),
    modified: formatDate(v.modifiedAt),
  }));

  const compareVersions = (a: string, b: string): number => {
    const cleanA = a.replace(/^v/, "").split("-")[0];
    const cleanB = b.replace(/^v/, "").split("-")[0];
    const partsA = cleanA.split(".").map((n) => parseInt(n, 10) || 0);
    const partsB = cleanB.split(".").map((n) => parseInt(n, 10) || 0);
    const maxLen = Math.max(partsA.length, partsB.length);
    for (let i = 0; i < maxLen; i++) {
      const numA = partsA[i] || 0;
      const numB = partsB[i] || 0;
      if (numA !== numB) return numB - numA;
    }
    return 0;
  };

  const versions = (insight?.availableVersions || [])
    .slice()
    .sort((a, b) => compareVersions(a.version || "", b.version || ""))
    .map((v) => ({
      version: v.version || "",
      publishedAt: formatDate(v.publishedAt),
      isDefault: v.defaultVersion || false,
    }));

  const licenses = (insight?.licenses?.licenses || []).map((l) => ({
    licenseId: l.licenseId || "Unknown",
    name: l.name || l.licenseId || "Unknown",
    referenceUrl: l.referenceUrl || "",
  }));

  const dependencies = (insight?.dependencies || []).map((d) => ({
    name: d.package?.name || "Unknown",
    version: d.version || "",
    ecosystem: ecosystem,
  }));

  const scorecardScore =
    insight?.projectInsights?.[0]?.scorecard?.score || undefined;

  const primaryLicense = licenses[0]?.licenseId || undefined;

  const analyzedAt = insight?.packagePublishedAt
    ? formatDate(insight.packagePublishedAt)
    : undefined;

  return (
    <div className="min-h-screen bg-gray-50">
      <PackageHeader
        name={decodedName}
        version={decodedVersion}
        ecosystem={ecosystem}
        vulnerabilitiesCount={vulnerabilities.length}
        scorecardScore={scorecardScore}
        license={primaryLicense}
        analyzedAt={analyzedAt}
      />
      <PackageTabs
        vulnerabilities={vulnerabilities}
        versions={versions}
        licenses={licenses}
        dependencies={dependencies}
        ecosystem={ecosystem}
        packageName={decodedName}
      />
    </div>
  );
}
