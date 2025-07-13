import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

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
                {/* Fundo escuro */}
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-50" />
                </Transition.Child>

                {/* Modal centralizado */}
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
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 mb-4">
                                    Cadastrar Orçamento
                                </Dialog.Title>

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <input
                                        type="text"
                                        placeholder="Fornecedor"
                                        value={fornecedor}
                                        onChange={(e) => setFornecedor(e.target.value)}
                                        required
                                        className="w-full border border-gray-300 rounded px-3 py-2"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Descrição"
                                        value={descricao}
                                        onChange={(e) => setDescricao(e.target.value)}
                                        required
                                        className="w-full border border-gray-300 rounded px-3 py-2"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Forma de Pagamento"
                                        value={formaPagamento}
                                        onChange={(e) => setFormaPagamento(e.target.value)}
                                        required
                                        className="w-full border border-gray-300 rounded px-3 py-2"
                                    />
                                    <input
                                        type="number"
                                        step="0.01"
                                        placeholder="Valor Total"
                                        value={valorTotal}
                                        onChange={(e) => setValorTotal(e.target.value)}
                                        required
                                        className="w-full border border-gray-300 rounded px-3 py-2"
                                    />
                                    <textarea
                                        placeholder="Observações Gerais"
                                        value={observacoesGerais}
                                        onChange={(e) => setObservacoesGerais(e.target.value)}
                                        className="w-full border border-gray-300 rounded px-3 py-2"
                                    />
                                    <div className="flex justify-end space-x-2">
                                        <button
                                            type="button"
                                            onClick={onClose}
                                            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                        >
                                            Cadastrar
                                        </button>
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
