import Button from "../ui/Button";
import Input from "../ui/Input";

type DepartamentoFormProps = {
    nome: string;
    onChange: (nome: string) => void;
    onSubmit: () => void;
};

export default function DepartamentoForm({ nome, onChange, onSubmit }: DepartamentoFormProps) {
    return (
        <div className="flex gap-2">
            <Input
                type="text"
                value={nome}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Nome do departamento"
                className="flex-1 p-2 rounded bg-gray-800 text-white"
            />
            <Button variant="primary" onClick={onSubmit}>Cadastrar</Button>
        </div>
    );
}
