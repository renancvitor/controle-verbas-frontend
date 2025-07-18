type Props = {
    filtro: string;
    onChange: (valor: string) => void;
};

export default function FiltroCargos({ filtro, onChange }: Props) {
    return (
        <div className="mb-6">
            <label htmlFor="filtro" className="mr-2">Filtrar:</label>
            <select
                id="filtro"
                value={filtro}
                onChange={(e) => onChange(e.target.value)}
                className="bg-gray-800 text-white p-2 rounded"
            >
                <option value="todos">Todos</option>
                <option value="ativos">Ativos</option>
                <option value="inativos">Inativos</option>
            </select>
        </div>
    );
}
