type InputProps = {
    label?: string;
    type?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    placeholder?: string;
    step?: string | number;
    required?: boolean;
};

export default function Input({ label, type, value, onChange, className, placeholder, step, required }: InputProps) {
    return (
        <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">{label}</label>
            <input
                type={type}
                value={value}
                onChange={onChange}
                className={`w-full p-2 border border-gray-300 rounded ${className}`}
                placeholder={placeholder}
                required={required}
                step={step}
            />
        </div>
    );
}
