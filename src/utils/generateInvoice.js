import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; // ✅ Correct named import

export const generateInvoice = (order) => {
  const doc = new jsPDF();

  // 1. Invoice Header
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.text("INVOICE", 105, 20, { align: "center" });

  // 2. Store Info
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("SimiPhy - The Smarter Store", 105, 28, { align: "center" });
  doc.text("www.simiphy.com | support@simiphy.com", 105, 33, { align: "center" });

  // 3. Order Info
  const date = new Date(order.date).toLocaleString();
  doc.setFontSize(12);
  doc.text(`🧾 Order ID: ${order.id}`, 14, 50);
  doc.text(`👤 Customer: ${order.name}`, 14, 58);
  doc.text(`📅 Date: ${date}`, 14, 66);

  // 4. Prepare Table Data
  const tableBody = order.items.map((item, index) => [
    index + 1,
    item.title || item.name || "Unnamed",
    item.quantity,
    `₹${item.price}`,
    `₹${item.price * item.quantity}`,
  ]);

  // 5. Generate Table with autoTable
  autoTable(doc, {
    startY: 75,
    head: [["#", "Product", "Qty", "Unit Price", "Total"]],
    body: tableBody,
    styles: { fontSize: 10 },
    headStyles: { fillColor: [52, 152, 219] },
    columnStyles: {
      0: { halign: "center", cellWidth: 10 },
      1: { cellWidth: 80 },
      2: { halign: "center", cellWidth: 20 },
      3: { halign: "right", cellWidth: 30 },
      4: { halign: "right", cellWidth: 30 },
    },
  });

  // 6. Grand Total
  const finalY = doc.lastAutoTable?.finalY || 90; // fallback to safe Y
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text(`Grand Total: ₹${order.total}`, 14, finalY + 10);

  // 7. Footer
  doc.setFont("helvetica", "italic");
  doc.setFontSize(10);
  doc.text("Thank you for shopping with SimiPhy 💜", 105, 285, { align: "center" });

  // 8. Save PDF
  doc.save(`Invoice_${order.id}.pdf`);
};

