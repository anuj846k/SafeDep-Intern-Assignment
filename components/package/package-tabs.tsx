import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

const vulnerabilities: Vulnerability[] = [
  {
    id: "GHSA-9hjg-9r4m-mvj7",
    summary:
      "Requests vulnerable to .netrc credentials leak via malicious URLs",
    risk: "low",
    published: "08/10/2024",
    modified: "08/13/2024",
  },
  {
    id: "GHSA-9hjg-9rem-mvj7",
    summary:
      "Requests vulnerable to .netrc credentials leak via malicious URLs",
    risk: "medium",
    published: "08/10/2024",
    modified: "08/13/2024",
  },
  {
    id: "GHSA-9hjg-9r2m-mvj7",
    summary:
      "Requests vulnerable to .netrc credentials leak via malicious URLs",
    risk: "high",
    published: "08/10/2024",
    modified: "08/13/2024",
  },
  {
    id: "GHSA-9hjg-924m-mvj7",
    summary:
      "Requests vulnerable to .netrc credentials leak via malicious URLs",
    risk: "critical",
    published: "08/10/2024",
    modified: "08/13/2024",
  },
  {
    id: "GHSA-9hjg-914m-mvj7",
    summary:
      "Requests vulnerable to .netrc credentials leak via malicious URLs",
    published: "08/10/2024",
    modified: "08/13/2024",
    risk: "unspecified",
  },
];

const PackageTabs = () => {
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
            Vulnerabilities
          </TabsTrigger>
          <TabsTrigger value="versions" className={triggerClass}>
            Versions
          </TabsTrigger>
          <TabsTrigger value="license" className={triggerClass}>
            License
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="overview" className="bg-white">
        <div className="flex flex-col h-full w-[800px] mx-auto gap-6 py-6 ">
          <SectionBlock
            title="Summary"
            accent="primary"
            blocks={[
              {
                type: "text",
                value:
                  "This analysis was performed using vet and SafeDep Cloud Malicious Package Analysis. Integrate with GitHub using vet-action GitHub Action.",
              },
              {
                type: "note",
                value: "This report is updated by a verification record",
              },

              {
                type: "text",
                value:
                  "Multiple files flagged for potential data exfiltration, XSS, and RCE vulnerabilities. High confidence of malicious intent due to combined factors.",
              },
            ]}
          />

          <SectionBlock
            title="Verification Record"
            blocks={[
              {
                type: "text",
                value: "Manual analysis confirmed that the package is clean.",
              },
            ]}
          />

          <SectionBlock
            title="Details"
            blocks={[
              {
                type: "note",
                value: "Note: This report is updated by a verification record",
              },
              {
                type: "text",
                value:
                  "The package exhibits multiple concerning behaviors. Several files match the 'sys_net_recon_exfil' YARA rule, suggesting potential system and network information exfiltration. Additionally, the code constructs javascript: URLs and assigns them to formAction attributes, which can lead to XSS or RCE if user-controlled data is involved. Furthermore, dynamic code execution is possible via formatDynamicImportPath if the cacheHandlers configuration is compromised. These factors, combined, indicate malicious intent.",
              },
            ]}
          />
        </div>
      </TabsContent>

      <TabsContent value="vulnerabilities">
        <div className=" bg-white">
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
                  <TableCell className="whitespace-nowrap">{vuln.id}</TableCell>

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
        </div>
      </TabsContent>

      <TabsContent value="versions">
        <div className="bg-white w-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Version</TableHead>
                <TableHead className="w-[140px]">Published On</TableHead>
                <TableHead className="w-[142px]"></TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              <TableRow>
                <TableCell className="flex items-center gap-2">
                  <Badge className="rounded-sm bg-gray-100 gap-1.5 text-gray-700">
                    0.24.0
                  </Badge>
                  <Badge className="rounded-sm bg-teal-100 gap-1.5 px-1.5 py-0.5 text-teal-700">
                    Latest
                  </Badge>
                </TableCell>
                <TableCell>08/10/2024</TableCell>
                <TableCell className="text-primary flex items-center gap-2">
                  <span className="h-2 w-px bg-border"></span>
                  View Version
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </TabsContent>

      <TabsContent value="license">
        <div className="bg-white w-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>License ID</TableHead>
                <TableHead className="w-[300px]">License Name</TableHead>
                <TableHead className="w-[400px]">Reference URL</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              <TableRow>
                <TableCell className="flex items-center gap-2">
                  Apache-2.0
                </TableCell>
                <TableCell>Apache License 2.0</TableCell>
                <TableCell>
                  https://www.apache.org/licenses/LICENSE-2.0
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default PackageTabs;
