import { Link2 } from "lucide-react";
import { FunctionComponent } from "react";

import { Button } from "@/shared/components/ui/button";

interface ProfileLinksProps {
  urls: string[];
}

const ProfileLinks: FunctionComponent<ProfileLinksProps> = ({ urls }) => {
  return (
    <div className="pt-3.5">
      <span className="pb-1 block">Sites</span>

      <div>
        {urls.map((url, i) => (
          <div
            key={i}
            className="flex items-center gap-2 rounded-full hover:scale-105 ease-linear transition-transform duration-200 bg-field py-1.5 px-2.5  mt-2"
          >
            <Link2 color="#707070" />
            <a
              href={url}
              className="rounded-4xl font-inter text-field-foreground text-sm w-full outline-0 border-0 font-normal"
              key={i}
            >
              {url}
            </a>
          </div>
        ))}
        <Button className="bg-violet-300/40 text-violet-500 rounded-4xl font-bold mt-3 ">
          + Add website address
        </Button>
      </div>
    </div>
  );
};

export default ProfileLinks;
