import type { Child } from "../../types/ChildT";

export default function Container({ children }: Child) {
  return (
    <>
      <div
        className="w-[95%] lg:w-[900px] xl:w-[1300px] rtl"
        style={{ margin: "auto" }}
      >
        {children}
      </div>
    </>
  );
}
