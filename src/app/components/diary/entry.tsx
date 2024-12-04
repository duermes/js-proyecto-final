import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

interface DiaryEntryProps {
  title: string;
  content: string;
  createdAt: Date;
  onClick: () => void;
}

export function Entry({ title, content, createdAt, onClick }: DiaryEntryProps) {
  return (
    <div
      onClick={onClick}
      className="w-full p-6 rounded-lg bg-gray-800/50 border border-gray-700 hover:border-purple-500 transition-all duration-200 cursor-pointer group"
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-200">
          {title}
        </h3>
        <span className="text-sm text-gray-400">
          {formatDistanceToNow(createdAt, { addSuffix: true, locale: es })}
        </span>
      </div>
      <p className="text-gray-300 line-clamp-3">{content}</p>
    </div>
  );
}
