// =============================================
// routes/invoices.js
// Generates a PDF invoice (matching Mannat
// Caterers bill format) and emails it to
// the customer after payment is confirmed
// =============================================

const express    = require('express');
const router     = express.Router();
const PDFDocument = require('pdfkit');      // generates the PDF
const nodemailer = require('nodemailer');   // sends the email
const db         = require('../db');        // MySQL connection


// =============================================
// EMAIL TRANSPORTER SETUP
// Uses Gmail SMTP — credentials from .env file
// =============================================
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,   // your gmail eg: mannatcaterersgoa@gmail.com
        pass: process.env.EMAIL_PASS,   // gmail app password (NOT your normal password)
    }
});


// =============================================
// ROUTE — POST /invoices/send
// Called from Payment.jsx after payment success
//
// Request body needs:
// {
//   orderId,
//   customerId,
//   customerName,
//   customerEmail,
//   customerPhone,
//   eventType,
//   eventDate,
//   eventLocation,
//   numGuests,
//   menuSelected,      ← comma separated item names
//   totalAmount,
//   advanceAmount,
//   balanceAmount,
//   paymentId          ← Razorpay payment ID
// }
// =============================================
router.post('/send', async function (req, res) {

    const {
        orderId,
        customerId,
        customerName,
        customerEmail,
        customerPhone,
        eventType,
        eventDate,
        eventLocation,
        numGuests,
        menuSelected,
        totalAmount,
        advanceAmount,
        balanceAmount,
        paymentId,
    } = req.body;

    console.log(`📄 Generating invoice for Order #${orderId} — ${customerName}`);

    try {

        // =============================================
        // STEP 1 — Generate PDF in memory (Buffer)
        // We don't save to disk — we stream directly
        // into memory then attach to email
        // =============================================
        const pdfBuffer = await generateInvoicePDF({
            orderId,
            customerId,
            customerName,
            customerPhone,
            eventType,
            eventDate,
            eventLocation,
            numGuests,
            menuSelected,
            totalAmount,
            advanceAmount,
            balanceAmount,
            paymentId,
        });

        console.log(`✅ PDF generated — ${pdfBuffer.length} bytes`);


        // =============================================
        // STEP 2 — Send email with PDF attached
        // =============================================
        const mailOptions = {
            from:    `"Mannat Caterers" <${process.env.EMAIL_USER}>`,
            to:      customerEmail,
            subject: `✅ Booking Confirmed — Mannat Caterers | Order #${orderId}`,

            // Plain text version (for email clients that don't support HTML)
            text: `Dear ${customerName},\n\nYour booking with Mannat Caterers has been confirmed!\n\nOrder ID: ${orderId}\nEvent: ${eventType} on ${eventDate}\nVenue: ${eventLocation}\nGuests: ${numGuests}\nTotal: ₹${totalAmount}\nAdvance Paid: ₹${advanceAmount}\nBalance Due: ₹${balanceAmount}\n\nPlease find your invoice attached.\n\nThank you for choosing Mannat Caterers!\n\nContact: 8329570966 / 9175868667\nEmail: mannatcaterersgoa@gmail.com`,

            // HTML version — shows nicely formatted in Gmail/Outlook
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                    
                    <!-- Header -->
                    <div style="background: #4a0080; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
                        <h1 style="margin: 0; font-size: 24px;">🍽️ MANNAT CATERERS</h1>
                        <p style="margin: 5px 0 0; font-size: 13px; opacity: 0.9;">We Undertake Full Wedding Events</p>
                    </div>

                    <!-- Body -->
                    <div style="background: #f9f4ff; padding: 25px; border: 1px solid #e0ccff;">
                        <h2 style="color: #4a0080; margin-top: 0;">✅ Booking Confirmed!</h2>
                        <p>Dear <strong>${customerName}</strong>,</p>
                        <p>Your event booking has been confirmed. Please find your invoice attached to this email.</p>

                        <!-- Order Details Table -->
                        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                            <tr style="background: #4a0080; color: white;">
                                <td colspan="2" style="padding: 10px; font-weight: bold;">BOOKING SUMMARY</td>
                            </tr>
                            <tr style="background: white;">
                                <td style="padding: 8px 10px; border: 1px solid #ddd; color: #666;">Order ID</td>
                                <td style="padding: 8px 10px; border: 1px solid #ddd; font-weight: bold;">#${orderId}</td>
                            </tr>
                            <tr style="background: #faf5ff;">
                                <td style="padding: 8px 10px; border: 1px solid #ddd; color: #666;">Event Type</td>
                                <td style="padding: 8px 10px; border: 1px solid #ddd; font-weight: bold;">${eventType}</td>
                            </tr>
                            <tr style="background: white;">
                                <td style="padding: 8px 10px; border: 1px solid #ddd; color: #666;">Event Date</td>
                                <td style="padding: 8px 10px; border: 1px solid #ddd; font-weight: bold;">${eventDate}</td>
                            </tr>
                            <tr style="background: #faf5ff;">
                                <td style="padding: 8px 10px; border: 1px solid #ddd; color: #666;">Venue</td>
                                <td style="padding: 8px 10px; border: 1px solid #ddd; font-weight: bold;">${eventLocation}</td>
                            </tr>
                            <tr style="background: white;">
                                <td style="padding: 8px 10px; border: 1px solid #ddd; color: #666;">No. of Guests</td>
                                <td style="padding: 8px 10px; border: 1px solid #ddd; font-weight: bold;">${numGuests}</td>
                            </tr>
                            <tr style="background: #faf5ff;">
                                <td style="padding: 8px 10px; border: 1px solid #ddd; color: #666;">Payment ID</td>
                                <td style="padding: 8px 10px; border: 1px solid #ddd; font-weight: bold; font-size: 12px;">${paymentId || 'N/A'}</td>
                            </tr>
                        </table>

                        <!-- Amount Table -->
                        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                            <tr style="background: #4a0080; color: white;">
                                <td colspan="2" style="padding: 10px; font-weight: bold;">PAYMENT DETAILS</td>
                            </tr>
                            <tr style="background: white;">
                                <td style="padding: 8px 10px; border: 1px solid #ddd; color: #666;">Total Amount</td>
                                <td style="padding: 8px 10px; border: 1px solid #ddd; font-weight: bold;">Rs. ${Number(totalAmount).toLocaleString('en-IN')}/-</td>
                            </tr>
                            <tr style="background: #fff3cd;">
                                <td style="padding: 8px 10px; border: 1px solid #ddd; color: #666;">Advance Paid (30%)</td>
                                <td style="padding: 8px 10px; border: 1px solid #ddd; font-weight: bold; color: #28a745;">Rs. ${Number(advanceAmount).toLocaleString('en-IN')}/-</td>
                            </tr>
                            <tr style="background: #ffe0e0;">
                                <td style="padding: 8px 10px; border: 1px solid #ddd; color: #666;">Balance Due (on Event Day)</td>
                                <td style="padding: 8px 10px; border: 1px solid #ddd; font-weight: bold; color: #dc3545;">Rs. ${Number(balanceAmount).toLocaleString('en-IN')}/-</td>
                            </tr>
                        </table>

                        <p style="color: #666; font-size: 13px;">
                            ⚠️ Please carry a copy of this invoice on your event day.<br>
                            Balance payment is due on the day of the event.
                        </p>
                    </div>

                    <!-- Footer -->
                    <div style="background: #4a0080; color: white; padding: 15px; text-align: center; border-radius: 0 0 8px 8px; font-size: 13px;">
                        <p style="margin: 0;">📍 Shop No.14, Near Vodafone Gallery, Vasco-da-Gama, Goa</p>
                        <p style="margin: 5px 0 0;">📞 8329570966 / 9175868667 &nbsp;|&nbsp; ✉️ mannatcaterersgoa@gmail.com</p>
                        <p style="margin: 8px 0 0; font-size: 11px; opacity: 0.7;">Thank you for choosing Mannat Caterers! 🙏</p>
                    </div>
                </div>
            `,

            // Attach the generated PDF
            attachments: [
                {
                    filename: `Mannat_Caterers_Invoice_Order${orderId}.pdf`,
                    content:  pdfBuffer,         // the PDF buffer we generated
                    contentType: 'application/pdf',
                }
            ]
        };

        // Actually send the email
        await transporter.sendMail(mailOptions);
        console.log(`✅ Invoice email sent to: ${customerEmail}`);

        res.status(200).json({
            message: '✅ Invoice sent successfully!',
            sentTo: customerEmail,
        });

    } catch (err) {
        console.error('❌ Invoice send error:', err);
        res.status(500).json({ message: 'Failed to send invoice', error: err.message });
    }
});


// =============================================
// HELPER FUNCTION — generateInvoicePDF
// Creates a PDF matching your Mannat Caterers
// bill format and returns it as a Buffer
// =============================================
function generateInvoicePDF(data) {
    return new Promise((resolve, reject) => {

        // Create PDF document (A4 size)
        const doc = new PDFDocument({
            size: 'A4',
            margin: 50
        });

        // Collect PDF chunks into a buffer
        const chunks = [];
        doc.on('data',  chunk => chunks.push(chunk));
        doc.on('end',   ()    => resolve(Buffer.concat(chunks)));
        doc.on('error', err   => reject(err));

        // ── COLORS ──
        const PURPLE     = '#4a0080';
        const LIGHT_GREY = '#f5f5f5';
        const BLACK      = '#000000';
        const WHITE      = '#ffffff';
        const DARK_GREY  = '#333333';

        // Page width for reference
        const pageWidth = doc.page.width - 100; // minus margins


        // ─────────────────────────────────────────
        // HEADER — Company name + address
        // Matches your bill's top section
        // ─────────────────────────────────────────

        // Purple header background box
        doc.rect(50, 40, pageWidth, 90)
           .fill(PURPLE);

        // Company name (big, white, centered)
        doc.fillColor(WHITE)
           .fontSize(22)
           .font('Helvetica-Bold')
           .text('MANNAT CATERERS', 50, 55, { align: 'center', width: pageWidth });

        // Tagline
        doc.fontSize(10)
           .font('Helvetica')
           .text('We Undertake Full Wedding Events.', 50, 80, { align: 'center', width: pageWidth });

        // Address line
        doc.fontSize(8.5)
           .text('Shop No.14, Near Vodafone Gallery, Vasco-da-Gama, Goa', 50, 95, { align: 'center', width: pageWidth });

        // Contact + email
        doc.text('Contact: 8329570966 / 9175868667  |  Email: mannatcaterersgoa@gmail.com', 50, 108, { align: 'center', width: pageWidth });


        // ─────────────────────────────────────────
        // PAYMENT RECEIPT TITLE
        // ─────────────────────────────────────────

        doc.fillColor(PURPLE)
           .fontSize(16)
           .font('Helvetica-Bold')
           .text('PAYMENT RECEIPT', 50, 150, { align: 'center', width: pageWidth });

        // Underline
        doc.moveTo(50, 170).lineTo(545, 170).lineWidth(1.5).stroke(PURPLE);


        // ─────────────────────────────────────────
        // CLIENT DETAILS — To section
        // ─────────────────────────────────────────

        let y = 185;

        // "To," and Date side by side
        doc.fillColor(BLACK).fontSize(10).font('Helvetica-Bold').text('To,', 50, y);
        doc.fontSize(10).font('Helvetica-Bold').text(`Date: ${formatDate(data.eventDate)}`, 400, y);

        y += 18;
        doc.font('Helvetica').fontSize(11).fillColor(DARK_GREY).text(data.customerName, 50, y);

        y += 16;
        doc.fontSize(10).text(`Event: ${data.eventType}`, 50, y);

        y += 16;
        doc.text(`Contact: ${data.customerPhone}`, 50, y);

        y += 16;
        doc.text(`Order ID: #${data.orderId}`, 50, y);


        // ─────────────────────────────────────────
        // BOOKING DETAILS TABLE
        // ─────────────────────────────────────────

        y += 30;

        // Table header row (purple bg)
        doc.rect(50, y, pageWidth, 22).fill(PURPLE);
        doc.fillColor(WHITE).fontSize(10).font('Helvetica-Bold')
           .text('SR. NO', 60, y + 6)
           .text('DESCRIPTION', 120, y + 6)
           .text('AMOUNT', 450, y + 6);

        y += 22;

        // Row 1 — Event location + details
        doc.rect(50, y, pageWidth, 80).fill(LIGHT_GREY).stroke('#dddddd');

        doc.fillColor(DARK_GREY).fontSize(9).font('Helvetica-Bold')
           .text('1', 60, y + 8);

        doc.font('Helvetica').fontSize(9).fillColor(DARK_GREY)
           .text(`LOCATION: ${data.eventLocation}`,              120, y + 8)
           .text(`EVENT DATE: ${formatDate(data.eventDate)}`,    120, y + 22)
           .text(`TENTATIVE PLATES: ${data.numGuests} (10% Backup)`, 120, y + 36)
           .text(`PACKAGE / MENU: ${data.menuSelected}`,         120, y + 50, { width: 300 });

        // Amount column
        doc.font('Helvetica-Bold').fontSize(10).fillColor(PURPLE)
           .text(`Rs. ${Number(data.totalAmount).toLocaleString('en-IN')}/-`, 430, y + 28);

        y += 90;


        // ─────────────────────────────────────────
        // PAYMENT SUMMARY ROWS
        // ─────────────────────────────────────────

        // Helper to draw a summary row
        function drawRow(label, value, bgColor, bold) {
            doc.rect(50, y, pageWidth, 22).fill(bgColor || WHITE).stroke('#dddddd');
            doc.fillColor(DARK_GREY)
               .fontSize(10)
               .font(bold ? 'Helvetica-Bold' : 'Helvetica')
               .text(label, 120, y + 6);
            doc.font('Helvetica-Bold').fillColor(bold ? PURPLE : DARK_GREY)
               .text(value, 430, y + 6);
            y += 22;
        }

        drawRow('TOTAL AMOUNT',                 `Rs. ${Number(data.totalAmount).toLocaleString('en-IN')}/-`,   LIGHT_GREY, false);
        drawRow('ADVANCE PAID (30%)',            `Rs. ${Number(data.advanceAmount).toLocaleString('en-IN')}/-`, '#e8f5e9',  false);
        drawRow('BALANCE DUE (On Event Day 70%)',`Rs. ${Number(data.balanceAmount).toLocaleString('en-IN')}/-`, '#ffeaea',  true);

        y += 5;

        // Grand Total box (full width, highlighted)
        doc.rect(50, y, pageWidth, 28).fill(PURPLE);
        doc.fillColor(WHITE).fontSize(12).font('Helvetica-Bold')
           .text('GRAND TOTAL', 120, y + 8)
           .text(`Rs. ${Number(data.totalAmount).toLocaleString('en-IN')}/-`, 380, y + 8);

        y += 40;


        // ─────────────────────────────────────────
        // PAYMENT TERMS
        // Matches your actual bill's terms section
        // ─────────────────────────────────────────

        doc.fillColor(PURPLE).fontSize(11).font('Helvetica-Bold')
           .text('PAYMENT TERMS', 50, y);

        y += 16;

        const terms = [
            '1) Advance payment of 30% is required at the time of booking. Remaining balance of 70% must be paid on or before the Event day.',
            '2) Payment method: All prices quoted are based on cash payments only. Online payments accepted (Google Pay / PhonePe).',
            '3) We require confirmation of numbers before 3 days of the event. We can accommodate up to 50 extra plates on actual charge.',
            '4) Alcoholic beverages: Mannat Caterers will never supply any form of alcoholic beverages for any event.',
        ];

        doc.fillColor(DARK_GREY).fontSize(8.5).font('Helvetica');
        terms.forEach(term => {
            doc.text(term, 50, y, { width: pageWidth, lineGap: 2 });
            y += doc.heightOfString(term, { width: pageWidth }) + 6;
        });


        // ─────────────────────────────────────────
        // FOOTER — Signature + Thank you
        // ─────────────────────────────────────────

        y += 15;

        doc.moveTo(50, y).lineTo(545, y).lineWidth(0.5).stroke('#cccccc');
        y += 12;

        doc.fillColor(DARK_GREY).fontSize(9).font('Helvetica')
           .text('Thanking You,', 50, y)
           .text('Yours Faithfully,', 50, y + 14);

        doc.font('Helvetica-Bold').fontSize(10).fillColor(PURPLE)
           .text('SADIYA SHAIKH', 50, y + 40)
           .text('Mannat Caterers, Goa', 50, y + 54);

        // Right side — QR / contact reminder
        doc.font('Helvetica').fontSize(8.5).fillColor(DARK_GREY)
           .text('Thank you for choosing Mannat Caterers!', 350, y + 14, { align: 'right', width: 195 })
           .text('It is always our pleasure to serve you.', 350, y + 26, { align: 'right', width: 195 });

        // Bottom purple strip
        doc.rect(50, doc.page.height - 45, pageWidth, 25).fill(PURPLE);
        doc.fillColor(WHITE).fontSize(8).font('Helvetica')
           .text(
               'Shop No.14, Near Vodafone Gallery, Vasco-da-Gama, Goa  |  8329570966 / 9175868667  |  mannatcaterersgoa@gmail.com',
               50, doc.page.height - 38,
               { align: 'center', width: pageWidth }
           );

        // Finalize — triggers the 'end' event which resolves the Promise
        doc.end();
    });
}


// ─────────────────────────────────────────
// HELPER — formats date nicely
// "2026-01-25" → "25 January 2026"
// ─────────────────────────────────────────
function formatDate(dateStr) {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });
}


module.exports = router;