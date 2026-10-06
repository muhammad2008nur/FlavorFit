import { Link2, X } from "lucide-react";
import { FunctionComponent, useState } from "react";
import { useController, useFormContext } from "react-hook-form";

import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import FieldError from "@/shared/components/custom-ui/field-error/FieldError";

import { ProfileFormInput } from "@/features/profile/profile-schema.zod";

const MAX_LINKS = 5;

interface ProfileLinksProps {
  isEditing: boolean;
}

const ProfileLinks: FunctionComponent<ProfileLinksProps> = ({ isEditing }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<ProfileFormInput>();
  const { field } = useController({ control, name: "sites" });
  const urls = field.value ?? [];
  const sitesErrors = errors.sites;

  const [draft, setDraft] = useState("");
  const [draftError, setDraftError] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [wasEditing, setWasEditing] = useState(isEditing);

  if (wasEditing !== isEditing) {
    setWasEditing(isEditing);
    setIsAdding(false);
    setDraft("");
    setDraftError("");
  }

  const addUrl = () => {
    const trimmed = draft.trim();
    if (!trimmed) {
      setDraftError("Enter a link");
      return;
    }

    const normalized = /^https?:\/\//i.test(trimmed)
      ? trimmed
      : `https://${trimmed}`;

    if (urls.includes(normalized)) {
      setDraftError("This link is already added");
      return;
    }

    field.onChange([...urls, normalized]);
    setDraft("");
    setDraftError("");
    setIsAdding(false);
  };

  const removeUrl = (index: number) => {
    field.onChange(urls.filter((_, i) => i !== index));
  };

  const cancelAdding = () => {
    setDraft("");
    setDraftError("");
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

      {urls.map((url, index) => (
        <div key={`${index}-${url}`}>
          <div className="flex items-center gap-2 rounded-full hover:scale-102 ease-linear transition-transform duration-200 bg-field py-1.5 px-2.5 mt-2">
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
                onClick={() => removeUrl(index)}
                aria-label={`Remove ${url}`}
                className="shrink-0 cursor-pointer"
              >
                <X size={18} color="#707070" />
              </button>
            )}
          </div>
          <FieldError message={sitesErrors?.[index]?.message} />
        </div>
      ))}

      <FieldError message={sitesErrors?.message} />

      {isEditing && !isAdding && urls.length < MAX_LINKS && (
        <Button
          type="button"
          onClick={() => setIsAdding(true)}
          className="bg-violet-300/40 text-violet-500 rounded-4xl font-bold mt-3"
        >
          + Add website address
        </Button>
      )}

      {isEditing && isAdding && (
        <div className="py-4 px-7">
          <Input
            autoFocus
            value={draft}
            onChange={(e) => {
              setDraft(e.target.value);
              setDraftError("");
            }}
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
          <FieldError message={draftError} className="px-0" />
          <div className="flex justify-center gap-2 mt-2">
            <Button type="button" onClick={addUrl} className="text-white">
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
