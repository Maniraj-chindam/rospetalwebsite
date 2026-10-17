import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, occasion, date, notes } = body;

    if (!name || !phone || !email) {
      return NextResponse.json(
        { error: "Name, phone, and email are required for booking." },
        { status: 400 }
      );
    }

    console.log("[Rosepetal Consultation Booking]", {
      name,
      phone,
      email,
      occasion,
      date,
      notes,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      {
        success: true,
        message: "Your consultation request has been booked with our master stylists.",
        booking: {
          name,
          phone,
          occasion: occasion || "Bespoke Couture",
          date: date || "To be scheduled",
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error booking consultation:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}
