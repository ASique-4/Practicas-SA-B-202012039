/**
 * Maneja y registra los errores.
 * @param error - El error a manejar.
 */
function handleError(error: Error): void {
    console.error("An error occurred:", error.message);
}

/**
 * Valida la entrada del usuario.
 * @param input - La entrada a validar.
 * @returns true si la entrada es válida, false de lo contrario.
 */
function validateInput(input: any): boolean {
    if (input == null || input === "") {
        handleError(new Error("Input cannot be null or empty."));
        return false;
    }
    return true;
}

/**
 * Maneja el caso en que un producto no se encuentra en el inventario.
 * @param productName - El nombre del producto que no se encontró.
 */
function handleProductNotFound(productName: string): void {
    handleError(new Error(`Product "${productName}" not found in inventory.`));
}

// Exporta las funciones para que puedan ser utilizadas en otros módulos
export { handleError, validateInput, handleProductNotFound };