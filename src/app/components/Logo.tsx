export function Logo() {
  return (
    <div className="flex items-center justify-center gap-3 mb-8">
      <div className="relative w-12 h-12">
        {/* Logo icon - stacked layers effect */}
        <div className="absolute top-0 left-0 w-10 h-3 bg-[#7ba9d4] rounded-sm transform -rotate-12" />
        <div className="absolute top-3 left-1 w-10 h-3 bg-[#5b9dd9] rounded-sm" />
        <div className="absolute top-6 left-2 w-10 h-3 bg-[#4a8cc9] rounded-sm transform rotate-12" />
      </div>
      <h1 className="text-2xl font-semibold text-gray-900">TaskManager</h1>
    </div>
  );
}
