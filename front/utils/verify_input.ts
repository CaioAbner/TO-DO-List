function verificarInput(valorInput: string): string | null {
    const valorTratado = valorInput.trim();

    if (!valorTratado) {
        alert("Não foi possível realizar a ação pois o valor digitado é nulo.");
        return null;
    }

    if (valorTratado.length < 3) {
        alert(`Não é possível fazer realizar a ação, pois o valor digitado: ${valorInput} é muito pequeno.`);
        return null;
    }

    return valorTratado;
}

export default verificarInput;