type ButtonProps = {
    children: React.ReactNode;
    onClick?: () => void;
    type?: "button" | "submit";
    variant?: "primary" | "success" | "danger" | "secondary" | "pageable";
    fullWidth?: boolean;
    disabled?: boolean;
    className?: string;
    iconOnly?: boolean;
};

export default function Button({
    children,
    onClick,
    type = "button",
    variant = "primary",
    fullWidth = false,
    disabled = false,
    className = "",
    iconOnly = false,
}: ButtonProps) {
    const base = iconOnly
        ? "p-2 rounded-full"
        : "text-white py-2 px-4 rounded text-sm";
    const textColor = iconOnly ? "" : "text-white";

    const variants = {
        primary: "bg-blue-600 hover:bg-blue-700",
        success: "bg-green-600 hover:bg-green-700",
        danger: "bg-red-600 hover:bg-red-700",
        secondary: "bg-gray-600 hover:bg-gray-700",
        pageable: "px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-50",
    };
    const width = fullWidth ? "w-full" : "";

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${base} ${variants[variant]} ${textColor} ${width} ${className} transition duration-200 hover:scale-110`}
        >
            {children}
        </button>
    );
}
