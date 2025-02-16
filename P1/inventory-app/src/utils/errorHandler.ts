function handleError(error: Error): void {
    console.error("An error occurred:", error.message);
}

function validateInput(input: any): boolean {
    if (input == null || input === "") {
        handleError(new Error("Input cannot be null or empty."));
        return false;
    }
    return true;
}

function handleProductNotFound(productName: string): void {
    handleError(new Error(`Product "${productName}" not found in inventory.`));
}

export { handleError, validateInput, handleProductNotFound };