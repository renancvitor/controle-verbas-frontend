type InputProps = {
    label: string;
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Input({ label, type, value, onChange }: InputProps) {
    return (
        <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">{label}</label>
            <input
                type={type}
                value={value}
                onChange={onChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
            />
        </div>
    );
}
