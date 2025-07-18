import Button from "../ui/Button";

type Props = {
    nome: string;
    onChange: (nome: string) => void;
    onSubmit: () => void;
};

export default function CargoForm({ nome, onChange, onSubmit }: Props) {
    return (
        <div className="flex gap-2">
            <input
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
