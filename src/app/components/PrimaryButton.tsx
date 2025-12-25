interface PrimaryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
}

export function PrimaryButton({ children, onClick, type = 'button' }: PrimaryButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="w-full py-3 bg-[#4a8cc9] hover:bg-[#3d7ab5] text-white rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
    >
      {children}
    </button>
  );
}
