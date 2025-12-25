export function DiagonalWaveBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-gradient-to-br from-[#d4dce8] via-[#e4e9f1] to-[#c8cfe0]">
      {/* Diagonal wave top left */}
      <div 
        className="absolute w-[120%] h-[120%] -top-[20%] -left-[10%]" 
        style={{
          background: 'linear-gradient(135deg, #5b9dd9 0%, #7ba9d4 50%, transparent 50%)',
        }}
      />
      
      {/* Diagonal wave bottom right */}
      <div 
        className="absolute w-[120%] h-[120%] -bottom-[20%] -right-[10%]" 
        style={{
          background: 'linear-gradient(135deg, transparent 50%, #6ca3d9 50%, #4a8cc9 100%)',
        }}
      />
    </div>
  );
}
