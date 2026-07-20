import { FC } from "react";
import { Plus } from "lucide-react";

interface ButtonProps {
  text?: string;
  variant?: "primary" | "secondary" | "outline" | "dark" | "beige";
  size?: "sm" | "md" | "lg";
  icon?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  borderRadius?: string;
}

const Button: FC<ButtonProps> = ({
  text,
  variant = "primary",
  size = "md",
  icon,
  onClick,
  borderRadius = "full",
}) => {
  const baseStyle = "rounded-md font-medium flex items-center gap-2";

  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700",
    secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-50",
    dark: "bg-gray-900 text-white hover:bg-gray-800",
    beige: "bg-[#F5EEDC] text-black rounded-md shadow hover:brightness-95",
  };

  const sizes = {
    sm: "px-2 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24,
  };

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} rounded-${borderRadius}`}
      onClick={onClick}
    >
      {icon && <Plus color="black" size={iconSizes[size]} />}
      {text}
    </button>
  );
};

export default Button;
