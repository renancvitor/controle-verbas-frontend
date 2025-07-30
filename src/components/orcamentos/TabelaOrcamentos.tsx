import { useState } from "react";
import { Button } from "@/components/ui/shadcn/button";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@/components/ui/shadcn/popover";
import {
    Command,
    CommandInput,
    CommandEmpty,
    CommandGroup,
    CommandItem,
} from "@/components/ui/shadcn/command";
import { ChevronDown, ArrowUp, ArrowDown } from "lucide-react";
import LinhaOrcamento from "./LinhaOrcamento";
import type { Orcamento } from "../../pages/Orcamentos";

type TabelaProps = {
    orcamentos: Orcamento[];
    onStatusChange: () => void;
    mostrarColunaAnalise?: boolean;
};

type Coluna = {
    chave: keyof Orcamento;
    titulo: string;
    largura: string;
    tipo: "text" | "number" | "date";
};

export default function TabelaOrcamentos({
    orcamentos,
    onStatusChange,
    mostrarColunaAnalise,
}: TabelaProps) {
    const [filtros, setFiltros] = useState<{ [key: string]: string }>({});
    const [ordem, setOrdem] = useState<{ coluna: keyof Orcamento | ""; asc: boolean }>({
        coluna: "",
        asc: true,
    });

    const colunas: Coluna[] = [
        { chave: "fornecedor", titulo: "Fornecedor", largura: "160px", tipo: "text" },
        { chave: "descricao", titulo: "Descrição", largura: "200px", tipo: "text" },
        { chave: "valorTotal", titulo: "Valor Total", largura: "80px", tipo: "number" },
        { chave: "formaPagamento", titulo: "Forma de Pagamento", largura: "130px", tipo: "text" },
        { chave: "observacoesGerais", titulo: "Observações", largura: "160px", tipo: "text" },
        { chave: "dataCriacao", titulo: "Data de Criação", largura: "90px", tipo: "date" },
        { chave: "solicitanteNome", titulo: "Solicitante", largura: "130px", tipo: "text" },
        { chave: "dataAnalise", titulo: "Data de Análise", largura: "90px", tipo: "date" },
        { chave: "gestorNome", titulo: "Gestor", largura: "130px", tipo: "text" },
        { chave: "dataLiberacaoVerba", titulo: "Data Liberação Verba", largura: "90px", tipo: "date" },
        { chave: "tesoureiroNome", titulo: "Tesoureiro", largura: "130px", tipo: "text" },
        { chave: "status", titulo: "Status", largura: "75px", tipo: "text" },
        { chave: "verbaLiberada", titulo: "Verba Liberada", largura: "80px", tipo: "text" },
    ];

    const handleFiltro = (coluna: string, valor: string) => {
        setFiltros((prev) => ({ ...prev, [coluna]: valor }));
    };

    const setOrdenacao = (coluna: keyof Orcamento | "", asc: boolean) => {
        setOrdem({ coluna, asc });
    };

    function renderHeaderCell(coluna: Coluna) {
        const filtroAtual = filtros[coluna.chave] || "";
        const ascAtual = ordem.coluna === coluna.chave ? ordem.asc : null;

        return (
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="ghost" size="sm" className="w-full justify-between">
                        <span>{coluna.titulo}</span>
                        {ascAtual === null && <ChevronDown className="h-4 w-4 opacity-50" />}
                        {ascAtual === true && <ArrowUp className="h-4 w-4" />}
                        {ascAtual === false && <ArrowDown className="h-4 w-4" />}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-60 p-2 bg-gray-800 text-white">
                    <Command className="bg-gray-800 text-white">

                        <CommandInput
                            className="text-white"
                            placeholder={`Filtrar ${coluna.titulo}`}
                            value={filtroAtual}
                            onValueChange={(value) => handleFiltro(coluna.chave, value)}
                        />
                        <CommandEmpty className="bg-gray-800 text-white">Nenhum resultado</CommandEmpty>
                        <CommandGroup className="bg-gray-800 text-white" heading="Ordenar">
                            <CommandItem
                                onSelect={() => setOrdenacao(coluna.chave, true)}
                                className={ascAtual === true ? "font-bold" : ""}
                            >
                                {coluna.tipo === "text" && <span>A - Z</span>}
                                {coluna.tipo === "number" && <span>Menor para maior</span>}
                                {coluna.tipo === "date" && <span>Mais antigo</span>}
                            </CommandItem>
                            <CommandItem
                                onSelect={() => setOrdenacao(coluna.chave, false)}
                                className={ascAtual === false ? "font-bold" : ""}
                            >
                                {coluna.tipo === "text" && <span>Z - A</span>}
                                {coluna.tipo === "number" && <span>Maior para menor</span>}
                                {coluna.tipo === "date" && <span>Mais novo</span>}
                            </CommandItem>
                            <CommandItem
                                onSelect={() => setOrdenacao("", true)}
                                className={ascAtual === null ? "font-bold" : ""}
                            >
                                Sem ordenação
                            </CommandItem>
                        </CommandGroup>
                    </Command>
                </PopoverContent>
            </Popover>
        );
    }

    const orcamentosFiltrados = orcamentos
        .filter((orcamento) => {
            return colunas.every(({ chave }) => {
                const valorFiltro = filtros[chave];
                if (!valorFiltro) return true;
                const valor = (orcamento[chave] ?? "").toString().toLowerCase();
                return valor.includes(valorFiltro.toLowerCase());
            });
        })
        .sort((a, b) => {
            if (!ordem.coluna) return 0;

            const colunaInfo = colunas.find((c) => c.chave === ordem.coluna);
            if (!colunaInfo) return 0;

            const valA = a[ordem.coluna];
            const valB = b[ordem.coluna];

            if (valA == null) return 1;
            if (valB == null) return -1;

            if (colunaInfo.tipo === "number") {
                return ordem.asc
                    ? (valA as number) - (valB as number)
                    : (valB as number) - (valA as number);
            }

            if (colunaInfo.tipo === "date") {
                return ordem.asc
                    ? new Date(valA as string).getTime() - new Date(valB as string).getTime()
                    : new Date(valB as string).getTime() - new Date(valA as string).getTime();
            }

            // texto
            const strA = valA.toString().toLowerCase();
            const strB = valB.toString().toLowerCase();
            return ordem.asc ? strA.localeCompare(strB) : strB.localeCompare(strA);
        });

    if (orcamentos.length === 0) {
        return <p className="text-gray-700">Nenhum orçamento encontrado.</p>;
    }

    return (
        <div className="w-full">
            <div className="overflow-x-auto overflow-y-hidden">
                <table className="min-w-full table-auto border-collapse border border-gray-700 shadow rounded-lg bg-gray-900 text-sm">
                    <thead className="bg-gray-800">
                        <tr>
                            {colunas.map((coluna) => (
                                <th
                                    key={coluna.chave}
                                    className="border border-gray-300 p-2"
                                    style={{ width: coluna.largura }}
                                >
                                    {renderHeaderCell(coluna)}
                                </th>
                            ))}
                            {mostrarColunaAnalise && (
                                <th className="border border-gray-300 p-2 w-[77px]">Analisar</th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {orcamentosFiltrados.map((orcamento) => (
                            <LinhaOrcamento
                                key={orcamento.id}
                                orcamento={orcamento}
                                onStatusChange={onStatusChange}
                                mostrarColunaAnalise={mostrarColunaAnalise}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
