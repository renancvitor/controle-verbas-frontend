import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

import Button from "../../components/ui/Button";
import Input from "../ui/Input";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (dados: { fornecedor: string; descricao: string; formaPagamento: string; valorTotal: number; observacoesGerais: string }) => void;
};

export default function OrcamentoModal({ isOpen, onClose, onSubmit }: ModalProps) {
    const [fornecedor, setFornecedor] = useState("");
    const [descricao, setDescricao] = useState("");
    const [formaPagamento, setFormaPagamento] = useState("");
    const [valorTotal, setValorTotal] = useState("");
    const [observacoesGerais, setObservacoesGerais] = useState("");

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        onSubmit({
            fornecedor,
            descricao,
            formaPagamento,
            valorTotal: parseFloat(valorTotal),
            observacoesGerais,
        });
    }

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-40" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded bg-gray-900 text-white p-6 text-left align-middle shadow-xl transition-all space-y-4">
                                <Dialog.Title as="h3" className="text-xl font-semibold">
                                    Cadastrar Orçamento
                                </Dialog.Title>

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <Input
                                        type="text"
                                        placeholder="Fornecedor"
                                        value={fornecedor}
                                        onChange={(e) => setFornecedor(e.target.value)}
                                        required
                                        className="w-full p-2 bg-gray-800 rounded"
                                    />
                                    <Input
                                        type="text"
                                        placeholder="Descrição"
                                        value={descricao}
                                        onChange={(e) => setDescricao(e.target.value)}
                                        required
                                        className="w-full p-2 bg-gray-800 rounded"
                                    />
                                    <Input
                                        type="text"
                                        placeholder="Forma de Pagamento"
                                        value={formaPagamento}
                                        onChange={(e) => setFormaPagamento(e.target.value)}
                                        required
                                        className="w-full p-2 bg-gray-800 rounded"
                                    />
                                    <Input
                                        type="number"
                                        step="0.01"
                                        placeholder="Valor Total"
                                        value={valorTotal}
                                        onChange={(e) => setValorTotal(e.target.value)}
                                        required
                                        className="w-full p-2 bg-gray-800 rounded"
                                    />
                                    <textarea
                                        placeholder="Observações Gerais"
                                        value={observacoesGerais}
                                        onChange={(e) => setObservacoesGerais(e.target.value)}
                                        className="w-full p-2 bg-gray-800 rounded"
                                    />
                                    <div className="flex justify-left gap-2">
                                        <Button variant="primary" type="submit">
                                            Cadastrar
                                        </Button>
                                        <Button variant="danger" type="button" onClick={onClose}>
                                            Cancelar
                                        </Button>
                                    </div>
                                </form>

                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
