import PackageHeader from "@/components/package/package-header";
import PackageTabs from "@/components/package/package-tabs";

const Page = () => {
  return (
    <div className="border border-border rounded-[3px] overflow-hidden">
      <PackageHeader />
      <PackageTabs />
    </div>
  );
};

export default Page;
