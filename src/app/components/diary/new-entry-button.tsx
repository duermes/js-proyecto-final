import Image from "next/image";

interface NewDiaryButtonProps {
  onClick: () => void;
}

export function NewEntryButton({ onClick }: NewDiaryButtonProps) {
  return (
    <button
      onClick={onClick}
      className="w-full p-6 rounded-lg border-2 border-dashed border-gray-700 hover:border-purple-500 transition-all duration-200 flex items-center justify-center gap-2 group"
    >
      <Image
        src="/plus.svg"
        alt="Add new entry"
        width={20}
        height={20}
        className="text-gray-400 group-hover:text-purple-400 transition-colors"
      />
      <span className="text-gray-400 group-hover:text-purple-400 transition-colors">
        Nueva entrada
      </span>
    </button>
  );
}
