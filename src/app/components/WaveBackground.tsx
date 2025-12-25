export function WaveBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-gradient-to-br from-[#5b9dd9] via-[#d5dae8] to-[#c8cfe0]">
      {/* Top left wave */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#4a8cc9] to-[#5b9dd9] opacity-80 blur-3xl" />
      
      {/* Bottom right wave */}
      <div className="absolute -bottom-40 -right-40 w-[700px] h-[700px] rounded-full bg-gradient-to-tl from-[#7ba9d4] to-[#a8b9d8] opacity-60 blur-3xl" />
      
      {/* Additional decorative elements */}
      <div className="absolute top-1/4 -left-20 w-[400px] h-[400px] rounded-full bg-[#6ca3d9] opacity-40 blur-3xl" />
      <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] rounded-full bg-[#9db5d8] opacity-50 blur-3xl" />
    </div>
  );
}
