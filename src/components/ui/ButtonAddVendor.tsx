import { UserAdd } from "iconsax-react";

interface TButton {
  title: string;
  onClick: () => void;
}

export default function ButtonAddVendor({ title, onClick }: TButton) {
  return (
    <>
      <div
        onClick={() => onClick()}
        className="hidden md:flex items-center gap-2 px-5 py-5 text-lg bg-gray-100 text-gray-800 font-medium rounded-2xl shadow-sm  hover:bg-gray-200 cursor-pointer transition"
      >
        {title}
      </div>

      <div
        onClick={() => onClick()}
        className="md:hidden flex cursor-pointer transition"
      >
        <UserAdd color="#888" size={27} />
      </div>
    </>
  );
}
