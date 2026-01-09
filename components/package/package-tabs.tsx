import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { Badge } from "../ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { RiskBadge } from "../vulnerabilities/risk-badge";
import SectionBlock from "./section-block";

type Vulnerability = {
  id: string;
  summary: string;
  risk: "low" | "medium" | "high" | "critical" | "unspecified";
  published: string;
  modified: string;
};

type AvailableVersion = {
  version: string;
  publishedAt: string;
  isDefault: boolean;
};

type License = {
  licenseId: string;
  name: string;
  referenceUrl: string;
};

type Dependency = {
  name: string;
  version: string;
  ecosystem: string;
};

type PackageTabsProps = {
  vulnerabilities: Vulnerability[];
  versions: AvailableVersion[];
  licenses: License[];
  dependencies: Dependency[];
  ecosystem: string;
  packageName: string;
};

const PackageTabs = ({
  vulnerabilities,
  versions,
  licenses,
  dependencies,
  ecosystem,
  packageName,
}: PackageTabsProps) => {
  const triggerClass =
    "text-sm font-medium leading-5 text-muted-foreground data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:rounded-md data-[state=active]:shadow-xs data-[state=active]:border-none";

  return (
    <Tabs defaultValue="overview" className="gap-0">
      <div className="w-full bg-background border-border border-b px-4 py-2">
        <TabsList className="bg-transparent gap-1.5 rounded-sm p-1 h-10 ">
          <TabsTrigger value="overview" className={triggerClass}>
            Overview
          </TabsTrigger>
          <TabsTrigger value="vulnerabilities" className={triggerClass}>
            Vulnerabilities ({vulnerabilities.length})
          </TabsTrigger>
          <TabsTrigger value="versions" className={triggerClass}>
            Versions ({versions.length})
          </TabsTrigger>
          <TabsTrigger value="license" className={triggerClass}>
            License
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="overview" className="bg-white">
        <div className="flex flex-col h-full w-[800px] mx-auto gap-6 py-6 ">
          <SectionBlock
            title="Dependencies"
            accent="primary"
            blocks={
              dependencies.length > 0
                ? [
                    {
                      type: "text",
                      value: `This package has ${dependencies.length} direct dependencies.`,
                    },
                  ]
                : [
                    {
                      type: "note",
                      value: "No dependencies found for this package.",
                    },
                  ]
            }
          />

          {dependencies.length > 0 && (
            <div className="bg-white border rounded-lg p-4">
              <h3 className="text-sm font-medium mb-3">Direct Dependencies</h3>
              <div className="flex flex-wrap gap-2">
                {dependencies.slice(0, 20).map((dep, idx) => (
                  <Link
                    key={idx}
                    href={`/p/${ecosystem}/${dep.name}/${dep.version}`}
                    className="hover:opacity-80"
                  >
                    <Badge
                      variant="outline"
                      className="text-xs hover:bg-slate-100"
                    >
                      {dep.name}@{dep.version}
                    </Badge>
                  </Link>
                ))}
                {dependencies.length > 20 && (
                  <Badge variant="secondary" className="text-xs">
                    +{dependencies.length - 20} more
                  </Badge>
                )}
              </div>
            </div>
          )}

          <SectionBlock
            title="Security Summary"
            blocks={[
              {
                type: vulnerabilities.length > 0 ? "note" : "text",
                value:
                  vulnerabilities.length > 0
                    ? `⚠️ This package has ${vulnerabilities.length} known vulnerabilities.`
                    : "✅ No known vulnerabilities found for this package version.",
              },
            ]}
          />
        </div>
      </TabsContent>

      <TabsContent value="vulnerabilities">
        <div className=" bg-white">
          {vulnerabilities.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              No vulnerabilities found for this package version.
            </div>
          ) : (
            <Table className="table-fixed">
              <TableHeader>
                <TableRow>
                  <TableHead className="text-sm w-[380px] text-muted-foreground leading-5 whitespace-nowrap">
                    Vulnerability ID
                  </TableHead>
                  <TableHead className="text-sm w-[360px] text-muted-foreground leading-5">
                    Summary
                  </TableHead>
                  <TableHead className="text-sm w-[110px] text-muted-foreground leading-5">
                    Risk
                  </TableHead>
                  <TableHead className="text-sm w-[115px] text-muted-foreground leading-5">
                    Published
                  </TableHead>
                  <TableHead className="text-sm w-[115px] text-muted-foreground leading-5">
                    Modified
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vulnerabilities.map((vuln) => (
                  <TableRow key={vuln.id}>
                    <TableCell className="whitespace-nowrap">
                      {vuln.id}
                    </TableCell>
                    <TableCell className="truncate">{vuln.summary}</TableCell>
                    <TableCell>
                      <RiskBadge level={vuln.risk} />
                    </TableCell>
                    <TableCell>{vuln.published}</TableCell>
                    <TableCell>{vuln.modified}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </TabsContent>

      <TabsContent value="versions">
        <div className="bg-white w-full">
          {versions.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              No version information available.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-muted-foreground">
                    Version
                  </TableHead>
                  <TableHead className="w-[140px] text-muted-foreground">
                    Published On
                  </TableHead>
                  <TableHead className="w-[142px] text-muted-foreground"></TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {versions.slice(0, 50).map((ver, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="flex items-center gap-2">
                      <Badge className="rounded-sm bg-gray-100 gap-1.5 text-gray-700">
                        {ver.version}
                      </Badge>
                      {ver.isDefault && (
                        <Badge className="rounded-sm bg-teal-100 gap-1.5 px-1.5 py-0.5 text-teal-700">
                          Latest
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>{ver.publishedAt}</TableCell>
                    <TableCell className="text-primary flex items-center gap-2">
                      <span className="h-2 w-px bg-border"></span>
                      <Link
                        href={`/p/${ecosystem}/${packageName}/${ver.version}`}
                      >
                        View Version
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </TabsContent>

      <TabsContent value="license">
        <div className="bg-white w-full">
          {licenses.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              No license information available.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-muted-foreground">
                    License ID
                  </TableHead>
                  <TableHead className="w-[300px] text-muted-foreground">
                    License Name
                  </TableHead>
                  <TableHead className="w-[400px] text-muted-foreground">
                    Reference URL
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {licenses.map((lic, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="flex items-center gap-2">
                      {lic.licenseId}
                    </TableCell>
                    <TableCell>{lic.name || lic.licenseId}</TableCell>
                    <TableCell>
                      {lic.referenceUrl ? (
                        <a
                          href={lic.referenceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          {lic.referenceUrl}
                        </a>
                      ) : (
                        "N/A"
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default PackageTabs;
