import Button from "../ui/feature-specific/Button";
import Input from "../ui/feature-specific/Input";

type DepartamentoFormProps = {
    nome: string;
    onChange: (nome: string) => void;
    onSubmit: () => void;
};

export default function DepartamentoForm({ nome, onChange, onSubmit }: DepartamentoFormProps) {
    return (
        <div className="flex gap-3 items-center">
            <Input
                type="text"
                value={nome}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Nome do departamento"
                className="flex-1 p-2 rounded bg-gray-800 text-white"
            />
            <div className="mt-2">
                <Button variant="pageable" onClick={onSubmit} className="self-center">
                    Cadastrar
                </Button>
            </div>
        </div>
    );
}
