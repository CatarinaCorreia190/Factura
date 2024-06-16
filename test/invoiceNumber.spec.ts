import { InvoiceNumber } from "../src/entity/invoiceNumber";

describe("InvoiceNumber Unit Tests", () => {
  test("Deve criar um invoiceNumber", () => {
    const invoiceNumber = new InvoiceNumber();
    expect(invoiceNumber.value).toBe("FT 2024/0001");
  });

  test("Deve criar um invoiceNumber tendo em conta uma faturar existente", () => {
    const invoiceNumber = new InvoiceNumber("FT 2024/0001");
    expect(invoiceNumber.value).toBe("FT 2024/0002");
  });
});
