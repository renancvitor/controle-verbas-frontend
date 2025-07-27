// utils/userUtils.ts
export function isTesterUser(): boolean {
    const tipoUsuario = sessionStorage.getItem("tipoUsuario");
    if (!tipoUsuario) return false;

    try {
        const parsed = JSON.parse(tipoUsuario);
        return parsed?.nomeTipoUsuario?.toUpperCase() === "TESTER";
    } catch (error) {
        console.error("Erro ao parsear tipoUsuario:", error);
        return false;
    }
}
