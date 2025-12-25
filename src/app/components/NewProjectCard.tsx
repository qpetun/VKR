import { Plus } from 'lucide-react';

export function NewProjectCard() {
  return (
    <button className="bg-white border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-[#4a8cc9] hover:bg-blue-50 transition-all flex flex-col items-center justify-center min-h-[280px] group">
      <div className="w-16 h-16 bg-gray-100 group-hover:bg-[#4a8cc9] rounded-full flex items-center justify-center mb-4 transition-colors">
        <Plus className="w-8 h-8 text-gray-400 group-hover:text-white transition-colors" />
      </div>
      <span className="text-gray-500 group-hover:text-[#4a8cc9] font-medium transition-colors">
        Новый проект
      </span>
    </button>
  );
}
