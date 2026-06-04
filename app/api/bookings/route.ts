import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const BOOKINGS_FILE = path.join(process.cwd(), "bookings.json");

// Helper to read bookings from JSON file
function readBookings() {
  try {
    if (!fs.existsSync(BOOKINGS_FILE)) {
      fs.writeFileSync(BOOKINGS_FILE, JSON.stringify([]));
      return [];
    }
    const data = fs.readFileSync(BOOKINGS_FILE, "utf-8");
    return JSON.parse(data || "[]");
  } catch (error) {
    console.error("Error reading bookings file:", error);
    return [];
  }
}

// Helper to write bookings to JSON file
function writeBookings(bookings: any[]) {
  try {
    fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(bookings, null, 2));
  } catch (error) {
    console.error("Error writing bookings file:", error);
  }
}

// GET: Return all booked slots to allow frontend to disable booked dates/times
export async function GET() {
  const bookings = readBookings();
  // Return simple date-time indicators to prevent overlap checks
  const bookedSlots = bookings.map((b: any) => ({
    date: b.visitDate,
    time: b.visitTime,
  }));
  return NextResponse.json({ success: true, bookedSlots });
}

// POST: Book a slot with collision checks
export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const { name, phone, goal, age, visitDate, visitTime } = payload;

    // Validate fields
    if (!name || !phone || !goal || !age || !visitDate || !visitTime) {
      return NextResponse.json(
        { success: false, error: "Missing required fields." },
        { status: 400 }
      );
    }

    const bookings = readBookings();

    // Collision Check: Check if slot is already occupied
    const isSlotTaken = bookings.some(
      (b: any) => b.visitDate === visitDate && b.visitTime === visitTime
    );

    if (isSlotTaken) {
      return NextResponse.json(
        { success: false, error: "This slot has just been booked. Please choose another slot." },
        { status: 409 }
      );
    }

    // Add new booking
    const newBooking = {
      id: `bk-${Date.now()}`,
      timestamp: new Date().toISOString(),
      name,
      phone,
      goal,
      age: parseInt(age),
      visitDate,
      visitTime,
    };

    bookings.push(newBooking);
    writeBookings(bookings);

    // Sync to Google Sheets Webhook if configured in environment
    const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK;
    if (webhookUrl) {
      try {
        // Run as background request
        fetch(webhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newBooking),
        }).catch((err) => console.error("Google Sheets webhook background sync failed:", err));
      } catch (err) {
        console.error("Google Sheets sync trigger error:", err);
      }
    } else {
      console.log("No GOOGLE_SHEETS_WEBHOOK env variable defined. Saved to bookings.json locally.");
    }

    return NextResponse.json({ success: true, booking: newBooking });
  } catch (error) {
    console.error("Error creating booking:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error." },
      { status: 500 }
    );
  }
}
