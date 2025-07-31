import { useState } from "react";
import Buttons from "../ui/feature-specific/Button";

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

import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import type { TooltipProps } from "@mui/material/Tooltip";

import EditIcon from "@mui/icons-material/Edit";
import BlockIcon from "@mui/icons-material/Block";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

type Coluna = {
    chave: keyof Usuario;
    titulo: string;
    largura: string;
    tipo: "text";
}

const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} arrow />
))(() => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: "#000",
        color: "#fff",
        fontSize: "0.75rem",
    },
    [`& .${tooltipClasses.arrow}`]: {
        color: "#000",
        "&::before": {
            backgroundColor: "#000",
        },
    },
}));

interface Usuario {
    id: number;
    email: string;
    tipoUsuario: string;
    ativo: boolean;
    nomePessoa: string;
    idTipoUsuario: number;
}

interface Props {
    usuarios: Usuario[];
    onEditar: (usuario: Usuario) => void;
    abrirModal: () => void;
    handleAtivar: (id: number) => void;
    handleDesativar: (id: number) => void;
}

export default function TabelaUsuarios({
    usuarios,
    onEditar,
    abrirModal,
    handleAtivar,
    handleDesativar
}: Props) {
    const [filtros, setFiltros] = useState<{ [key: string]: string }>({});
    const [ordem, setOrdem] = useState<{ coluna: keyof Usuario | ""; asc: boolean }>({
        coluna: "",
        asc: true,
    });

    const colunas: Coluna[] = [
        { chave: "email", titulo: "E-mail", largura: "160px", tipo: "text" },
        { chave: "tipoUsuario", titulo: "Tipo", largura: "160px", tipo: "text" },
    ];

    const handleFiltro = (coluna: string, valor: string) => {
        setFiltros((prev) => ({ ...prev, [coluna]: valor }));
    };

    const setOrdenacao = (coluna: keyof Usuario | "", asc: boolean) => {
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
                            </CommandItem>
                            <CommandItem
                                onSelect={() => setOrdenacao(coluna.chave, false)}
                                className={ascAtual === false ? "font-bold" : ""}
                            >
                                {coluna.tipo === "text" && <span>Z - A</span>}
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

    const usuariosiltrados = usuarios
        .filter((usuarios) => {
            return colunas.every(({ chave }) => {
                const valorFiltro = filtros[chave];
                if (!valorFiltro) return true;
                const valor = (usuarios[chave] ?? "").toString().toLowerCase();
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

            const strA = valA.toString().toLowerCase();
            const strB = valB.toString().toLowerCase();
            return ordem.asc ? strA.localeCompare(strB) : strB.localeCompare(strA);
        });

    if (usuarios.length === 0) {
        return <p className="text-gray-700">Nenhum usuário encontrado.</p>;
    }

    return (
        <div className="flex justify-center overflow-x-auto w-full">
            <table className="table-fixed w-auto border border-gray-700 rounded-lg">
                <thead>
                    <tr className="bg-gray-800">
                        {colunas.map((coluna) => (
                            <th
                                key={coluna.chave}
                                className="border border-gray-300 p-2"
                                style={{ width: coluna.largura }}
                            >
                                {renderHeaderCell(coluna)}
                            </th>
                        ))}
                        <th className="p-2 border w-[180px]">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {usuariosiltrados.map((u) => (
                        <tr key={u.id} className="hover:bg-gray-800">

                            <td className="p-2 border">{u.email}</td>
                            <td className="p-2 border text-center">{u.tipoUsuario}</td>
                            <td className="p-2 border">

                                <div className="flex gap-2 justify-center">
                                    <CustomTooltip title="Editar" arrow>
                                        <Buttons
                                            variant="primary"
                                            onClick={() => { onEditar(u); abrirModal(); }}
                                            iconOnly
                                        >
                                            <EditIcon />
                                        </Buttons>
                                    </CustomTooltip>

                                    {u.ativo ? (
                                        <CustomTooltip title="Desativar" arrow>
                                            <Buttons
                                                variant="danger"
                                                onClick={() => handleDesativar(u.id)}
                                                iconOnly
                                            >
                                                <BlockIcon />
                                            </Buttons>
                                        </CustomTooltip>
                                    ) : (
                                        <CustomTooltip title="Ativar" arrow>
                                            <Buttons
                                                variant="success"
                                                onClick={() => handleAtivar(u.id)}
                                                iconOnly
                                            >
                                                <CheckCircleIcon />
                                            </Buttons>
                                        </CustomTooltip>
                                    )}
                                </div>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
