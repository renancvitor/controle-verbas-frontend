type ButtonProps = {
    children: React.ReactNode;
    onClick?: () => void;
    type?: "button" | "submit";
    variant?: "primary" | "success" | "danger";
    fullWidth?: boolean;
    className?: string;
};

export default function Button({
    children,
    onClick,
    type = "button",
    variant = "primary",
    fullWidth = false,
    className = "",
}: ButtonProps) {
    const base = "text-white py-2 rounded text-sm";
    const variants = {
        primary: "bg-blue-600 hover:bg-blue-700",
        success: "bg-green-600 hover:bg-green-700",
        danger: "bg-red-600 hover:bg-red-700",
    };
    const width = fullWidth ? "w-full" : "";

    return (
        <button
            type={type}
            onClick={onClick}
            className={`${base} ${variants[variant]} ${width} ${className}`}
        >
            {children}
        </button>
    );
}
