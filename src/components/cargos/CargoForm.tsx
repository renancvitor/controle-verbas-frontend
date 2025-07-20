import Button from "../ui/Button";
import Input from "../ui/Input";

type Props = {
    nome: string;
    onChange: (nome: string) => void;
    onSubmit: () => void;
};

export default function CargoForm({ nome, onChange, onSubmit }: Props) {
    return (
        <div className="flex gap-2">
            <Input
                type="text"
                value={nome}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Nome do cargo"
                className="flex-1 p-2 rounded bg-gray-800 text-white"
            />
            <Button variant="primary" onClick={onSubmit}>Cadastrar</Button>
        </div>
    );
}
