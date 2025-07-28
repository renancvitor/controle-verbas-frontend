// src/services/localStorageService.ts
export class LocalStorageService<T extends { id: number }> {
    private key: string;

    constructor(key: string) {
        this.key = key;
    }

    protected getData(): T[] {
        const data = localStorage.getItem(this.key);
        return data ? JSON.parse(data) : [];
    }

    private saveData(data: T[]) {
        localStorage.setItem(this.key, JSON.stringify(data));
    }

    listar(): T[] {
        return this.getData();
    }

    encontrarPorId(id: number): T | undefined {
        return this.getData().find(item => item.id === id);
    }

    salvar(item: Omit<T, "id">): T {
        const data = this.getData();
        const novo: T = { ...item, id: Date.now() } as T;
        data.push(novo);
        this.saveData(data);
        return novo;
    }

    atualizar(id: number, dados: Partial<T>): T {
        const data = this.getData();
        const index = data.findIndex(item => item.id === id);
        if (index === -1) throw new Error("Item não encontrado");

        data[index] = { ...data[index], ...dados };
        this.saveData(data);
        return data[index];
    }

    deletar(id: number) {
        const data = this.getData().filter(item => item.id !== id);
        this.saveData(data);
    }

    ativar(id: number) {
        const data = this.getData().filter(item => item.id !== id);
        this.saveData(data);
    }
}
