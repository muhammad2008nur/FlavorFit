import { cn } from "@/shared/utils";

const Bone = ({ className }: { className?: string }) => (
  <div className={cn("animate-pulse rounded-full bg-field", className)} />
);

const FieldSkeleton = ({ labelWidth = "w-20" }: { labelWidth?: string }) => (
  <div className="flex-1">
    <Bone className={cn("h-3.5 mb-1.5", labelWidth)} />
    <Bone className="h-9 w-full" />
  </div>
);

const ProfileSkeleton = () => {
  return (
    <div className="flex">
      <div className="rounded-4xl outline-background outline-2 px-4 py-5.5 mt-5 w-6/12">
        <Bone className="h-5 w-40" />
        <div className="flex gap-3 items-end mt-2.5">
          <Bone className="size-15 shrink-0" />
          <FieldSkeleton labelWidth="w-16" />
        </div>
        <div className="pt-2">
          <FieldSkeleton labelWidth="w-12" />
        </div>
        <div className="flex gap-3 pt-2.5">
          <FieldSkeleton labelWidth="w-14" />
          <FieldSkeleton labelWidth="w-10" />
        </div>
        <div className="py-2">
          <Bone className="h-3.5 w-8 mb-1.5" />
          <Bone className="h-32 w-full rounded-4xl" />
        </div>
        <div className="pt-3.5">
          <Bone className="h-4 w-12 mb-2" />
          {[0, 1, 2].map((link) => (
            <Bone key={link} className="h-9 w-full mt-2" />
          ))}
        </div>
      </div>

      <div className="rounded-4xl outline-background outline-2 px-4 py-5.5 mt-5 w-6/12">
        <div className="flex gap-3">
          <Bone className="h-140 w-68 -mt-4 rounded-4xl shrink-0" />
          <div className="w-full">
            <Bone className="h-5 w-40" />
            <div className="p-1">
              <FieldSkeleton labelWidth="w-14" />
            </div>
            {[0, 1, 2].map((row) => (
              <div key={row} className="flex p-1 gap-3.5">
                <FieldSkeleton labelWidth="w-24" />
                <FieldSkeleton labelWidth="w-24" />
              </div>
            ))}
            {[0, 1].map((level) => (
              <div key={level} className="pt-5">
                <Bone className="h-4 w-48 mb-1.5" />
                <Bone className="h-9 w-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
