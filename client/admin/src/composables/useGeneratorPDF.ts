import jsPDF from "jspdf";

export const useGeneratePDF = () => {
    const generatePDF = ({ address, user, products, order }) => {
        try {
            const doc = new jsPDF();

            // En-tête de la facture
            doc.setFontSize(20);
            doc.setTextColor(40);
            doc.text("Facture", 105, 20, null, null, "center");

            // Informations de l'entreprise
            doc.setFontSize(12);
            doc.setTextColor(100);
            doc.text("Luzaya", 10, 40);
            doc.text("245 Faubourg Saint Antoine", 10, 45);
            doc.text("75012 Paris, France", 10, 50);
            doc.text("Téléphone: +33 6 52 14 41 89", 10, 55);
            doc.text("Email: luzaya.pro@proton.me", 10, 60);

            // Séparation
            doc.setLineWidth(0.5);
            doc.line(10, 65, 200, 65);

            // Adresse de facturation
            doc.setFontSize(14);
            doc.setTextColor(40);
            doc.text("Adresse de facturation:", 10, 75);
            doc.setFontSize(12);
            doc.setTextColor(100);
            doc.text(`${user.firstname} ${user.lastname}`, 10, 80);
            doc.text(`${address.street}`, 10, 85);
            doc.text(`${address.city}, ${address.postal_code}, ${address.country}`, 10, 90);
            doc.text(`Email: ${user.email}`, 10, 95);
            doc.text(`Téléphone: ${user.phone}`, 10, 100);

            // Informations sur la commande
            doc.setFontSize(14);
            doc.setTextColor(40);
            doc.text("Détails de la commande:", 10, 110);
            doc.setFontSize(12);
            doc.setTextColor(100);
            doc.text(`Date: ${order.date}`, 10, 115);
            doc.text(`Total HT: ${order.total_ht}`, 10, 120);
            doc.text(`Total TTC: ${order.total_ttc}`, 10, 125);
            doc.text(`Taux de taxe: ${order.tax_rate}`, 10, 130);

            // Séparation
            doc.setLineWidth(0.5);
            doc.line(10, 135, 200, 135);

            // Table des produits
            let startY = 145;
            doc.setFontSize(14);
            doc.setTextColor(40);
            doc.text("Produits:", 10, startY);
            startY += 10;

            doc.setFontSize(12);
            doc.setTextColor(100);
            products.forEach((product, index) => {
                doc.text(`${index + 1}. ${product.name}`, 10, startY);
                doc.text(`Quantité: ${product.quantity}`, 60, startY);
                doc.text(`Prix HT: ${product.price_ht}`, 100, startY);
                doc.text(`Prix TTC: ${product.price_ttc}`, 140, startY);
                startY += 10;
            });

            // Footer
            doc.setFontSize(10);
            doc.setTextColor(150);
            doc.text("Merci pour votre commande!", 105, 280, null, null, "center");

            // Enregistrer le PDF
            doc.save(`${user.lastname}-${user.firstname}-order.pdf`);
        } catch (error) {
            console.error('Erreur lors de la génération du PDF:', error);
        }
    };

    return {
        generatePDF,
    };
};
