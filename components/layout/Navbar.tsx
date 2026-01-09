import { monaSans } from "@/app/layout";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import { Button } from "../ui/button";

const Navbar = () => {
  return (
    <header className="mt-10">
      <div className="mx-auto flex h-[58px] max-w-[1185px] items-center justify-between px-4">
        <div className="flex flex-col gap-2">
          <span className="text-xs leading-5 align-middle uppercase tracking-wide text-muted-foreground">
            Powered by
          </span>

          <div className="flex items-center gap-2">
            <Image src="/safedep.png" alt="logo" width={23} height={23} />
            <span
              className={`${monaSans.className} text-[28px] font-medium leading-none tracking-[-0.05em] text-foreground`}
            >
              SafeDep
            </span>
          </div>
        </div>

        <Button className="flex items-center gap-2 rounded-sm py-2 px-4">
          <FaGithub size={16} />
          Install GitHub App
        </Button>
      </div>
    </header>
  );
};

export default Navbar;
