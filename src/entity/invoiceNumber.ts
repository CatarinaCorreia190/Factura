export class InvoiceNumber {
  public value: string;
  constructor(lastNumber?: string) {
    if (!lastNumber) {
      this.value = `FT ${this.getCurrentYear()}/0001`;
    } else {
      this.value = this.generateInvoiceNumber(lastNumber!);
    }
  }

  private getCurrentYear(): string {
    const currentDate = new Date();
    return currentDate.getFullYear().toString();
  }

  private extractSequentialNumber(invoiceNumber: string): number {
    return parseInt(invoiceNumber.slice(-4), 10);
  }

  private formatSequentialNumber(number: number, length: number): string {
    return number.toString().padStart(length, "0");
  }

  private generateInvoiceNumber(lastNumber: string): string {
    const currentYear = this.getCurrentYear();

    let newSequentialNumber: number;
    if (lastNumber) {
      const lastSequentialNumber = this.extractSequentialNumber(lastNumber);
      newSequentialNumber = lastSequentialNumber + 1;
    } else {
      newSequentialNumber = 1;
    }

    const newSequentialNumberFormatted = this.formatSequentialNumber(
      newSequentialNumber,
      4
    );
    const newInvoiceNumber = `FT ${currentYear}/${newSequentialNumberFormatted}`;
    return newInvoiceNumber;
  }
}