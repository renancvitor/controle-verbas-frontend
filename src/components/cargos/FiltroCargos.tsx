type Props = {
    filtro: string;
    onChange: (valor: string) => void;
    itensPorPagina: number;
    onChangeItensPorPagina: (valor: number) => void;
};

export default function FiltroCargos({ filtro, onChange, itensPorPagina, onChangeItensPorPagina }: Props) {
    return (
        <div className="mb-6 flex items-center gap-4">
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

            <label htmlFor="itensPorPagina" className="ml-4">Mostrar:</label>
            <select
                id="itensPorPagina"
                value={itensPorPagina}
                onChange={e => onChangeItensPorPagina(Number(e.target.value))}
                className="bg-gray-800 text-white p-2 rounded"
            >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={30}>30</option>
                <option value={50}>50</option>
            </select>
        </div>
    );
}
