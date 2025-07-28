// src/services/localStorageOrcamentoService.ts
import { LocalStorageService } from "./localStorageService";
import type { Orcamento } from "../pages/Orcamentos";

export class LocalStorageOrcamentoService extends LocalStorageService<Orcamento> {
    constructor() {
        super("orcamentos");
    }

    listarPorStatusId(): Orcamento[] {
        // Apenas retorna todos, sem filtro
        return this.getData();
    }

    aprovar(id: number): Orcamento {
        return this.atualizar(id, { status: "APROVADO" });
    }

    reprovar(id: number): Orcamento {
        return this.atualizar(id, { status: "REPROVADO" });
    }

    liberarVerba(id: number): Orcamento {
        return this.atualizar(id, {
            verbaLiberada: "Sim",
            dataLiberacaoVerba: new Date().toISOString(),
        });
    }
}