import { DiJava } from "react-icons/di";
import { FaGithub, FaNpm, FaPython, FaRust } from "react-icons/fa";
import { SiGo, SiNuget, SiPackagist, SiRubygems } from "react-icons/si";
import { VscExtensions } from "react-icons/vsc";

export function getEcosystemIcon(ecosystem: string): React.ReactNode {
  const icons: Record<string, React.ReactNode> = {
    npm: <FaNpm size={16} />,
    pypi: <FaPython size={16} />,
    go: <SiGo size={16} />,
    maven: <DiJava size={16} />,
    cargo: <FaRust size={16} />,
    nuget: <SiNuget size={16} />,
    rubygems: <SiRubygems size={16} />,
    packagist: <SiPackagist size={16} />,
    vscode: <VscExtensions size={16} />,
    openvsx: <VscExtensions size={16} />,
    github_repository: <FaGithub size={16} />,
  };

  return icons[ecosystem.toLowerCase()] || <FaGithub size={16} />;
}
