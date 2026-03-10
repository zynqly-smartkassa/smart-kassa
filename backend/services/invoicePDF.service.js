import pool from "../db.js";
import { fileURLToPath } from "url";

import puppeteer from "puppeteer";
import hbs from "handlebars";
import fs from "fs-extra";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class InvoiceService {

    constructor() {
        this.templatePath = path.join(__dirname, "../resources/templates/invoice/invoice.hbs");
        this.cssPath = path.join(__dirname, "../resources/templates/invoice/invoice.css");
        this.logoPath = path.join(__dirname, "../resources/templates/invoice/Logo.svg");
    }

    async generateInvoicePdf(invoiceId) {
        try {
            const invoiceData = await this.getInvoiceDataFromDb(invoiceId);

            const finalHtml = await this.compileTemplate(invoiceData);

            const pdfBuffer = await this.printPdf(finalHtml);

            return pdfBuffer;

        } catch (error) {
            console.error("Error while generating PDF:", error);
            throw new Error("PDF could not be created.");
        }
    }

    async getInvoiceDataFromDb(id) {

        // tip_amount is currently not used in invoice.hbs file
        const query = `
        SELECT 
            b.billing_id AS billing_id,
            b.amount_net AS billing_amount_net,
            b.tax_rate AS billing_tax_rate,
            b.amount_gross AS billing_amount_gross,
            b.tip_amount AS billing_tip_amount,
            b.payment_method AS billing_payment_method,
            c.company_name AS company_name,
            c.street AS company_street,
            c.street_addition AS street_addition,
            c.postal_code AS company_postal_code,
            c.city AS company_city,
            c.atu AS company_atu,
            r.ride_type AS ride_type
        FROM billing b
        JOIN company c ON b.company_id = c.company_id
        JOIN ride r ON b.ride_id = r.ride_id 
        WHERE c.company_name  IS NOT NULL
        AND b.billing_id = $1
        `;

        const result = await pool.query(query, [id]);

        if (result.rows.length === 0) {
            throw new Error(`Billing ID ${id} not found.`);
        }

        return result.rows[0];
    }

    async compileTemplate(data) {
        const htmlContent = await fs.readFile(this.templatePath, "utf-8");

        const cssContent = await fs.readFile(this.cssPath, "utf-8");

        const logoBuffer = await fs.readFile(this.logoPath);
        const logoBase64 = `data:image/svg+xml;base64,${logoBuffer.toString("base64")}`;

        const templateData = {
            ...data,
            styleContent: cssContent,
            logoSrc: logoBase64
        };

        const template = hbs.compile(htmlContent);
        return template(templateData);
    }

    async printPdf(html) {
        const browser = await puppeteer.launch({
            headless: "new",
            args: ["--no-sandbox"]
        });

        const page = await browser.newPage();

        await page.setContent(html, {
            waitUntil: "load"
        });

        const pdf = await page.pdf({
            format: "A4",
            printBackground: true,
            margin: {
                top: "20px",
                bottom: "20px",
                left: "20px",
                right: "20px"
            }
        });

        await browser.close();
        return pdf;
    }
}

export default new InvoiceService();