import Button from "../ui/Button";

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

    return (
        <div className="overflow-x-auto w-full">
            <table className="w-full border border-gray-700 rounded-lg">
                <thead>
                    <tr className="bg-gray-800">

                        <th className="p-2 border w-1/4">Email</th>
                        <th className="p-2 border w-1/4">Tipo</th>
                        <th className="p-2 border w-1/4">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((u) => (
                        <tr key={u.id} className="hover:bg-gray-800">

                            <td className="p-2 border">{u.email}</td>
                            <td className="p-2 border">{u.tipoUsuario}</td>
                            <td className="p-2 border">
                                <div className="flex gap-2 justify-center">
                                    <Button
                                        className="w-24"
                                        variant="primary"
                                        onClick={() => {
                                            onEditar(u);
                                            abrirModal();
                                        }}
                                    >
                                        Editar
                                    </Button>

                                    {u.ativo ? (
                                        <Button
                                            className="w-24"
                                            variant="danger"
                                            onClick={() => handleDesativar(u.id)}
                                        >
                                            Desativar
                                        </Button>
                                    ) : (
                                        <Button
                                            className="w-24"
                                            variant="success"
                                            onClick={() => handleAtivar(u.id)}
                                        >
                                            Ativar
                                        </Button>
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
