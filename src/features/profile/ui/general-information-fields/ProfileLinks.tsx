import { Link2, X } from "lucide-react";
import { FunctionComponent, useState } from "react";
import { Control, useController } from "react-hook-form";

import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";

import { ProfileData } from "../../profile.types";

interface ProfileLinksProps {
  isEditing: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<ProfileData, any, ProfileData>;
}

const ProfileLinks: FunctionComponent<ProfileLinksProps> = ({
  isEditing,
  control,
}) => {
  const { field } = useController({ control, name: "sites" });
  const urls = field.value ?? [];

  const [draft, setDraft] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const addUrl = () => {
    const trimmed = draft.trim();
    if (!trimmed) return;

    const normalized = /^https?:\/\//i.test(trimmed)
      ? trimmed
      : `https://${trimmed}`;

    if (urls.includes(normalized)) return;

    field.onChange([...urls, normalized]);
    setDraft("");
    setIsAdding(false);
  };

  const removeUrl = (target: string) => {
    field.onChange(urls.filter((url) => url !== target));
  };

  const cancelAdding = () => {
    setDraft("");
    setIsAdding(false);
  };

  return (
    <div className="pt-3.5">
      <span className="pb-1 block">Sites</span>

      {urls.length === 0 && !isEditing && (
        <p className="text-field-foreground/60 text-sm font-normal">
          No links yet
        </p>
      )}

      {urls.map((url) => (
        <div
          key={url}
          className="flex items-center gap-2 rounded-full hover:scale-102 ease-linear transition-transform duration-200 bg-field py-1.5 px-2.5 mt-2"
        >
          <Link2 color="#707070" className="shrink-0" />
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-4xl font-inter text-field-foreground text-sm w-full truncate outline-0 border-0 font-normal"
          >
            {url}
          </a>
          {isEditing && (
            <button
              type="button"
              onClick={() => removeUrl(url)}
              aria-label={`Remove ${url}`}
              className="shrink-0 cursor-pointer"
            >
              <X size={18} color="#707070" />
            </button>
          )}
        </div>
      ))}

      {isEditing && !isAdding && (
        <Button
          type="button"
          onClick={() => setIsAdding(true)}
          className="bg-violet-300/40 text-violet-500 rounded-4xl font-bold mt-3"
        >
          + Add website address
        </Button>
      )}

      {isAdding && (
        <div className="py-4 px-7">
          <Input
            autoFocus
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addUrl();
              }
              if (e.key === "Escape") cancelAdding();
            }}
            placeholder="Paste the link"
            className="bg-accent/80 px-4"
          />
          <div className="flex justify-center gap-2 mt-2">
            <Button type="button" onClick={addUrl}>
              Add the link
            </Button>
            <Button type="button" variant="ghost" onClick={cancelAdding}>
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileLinks;
