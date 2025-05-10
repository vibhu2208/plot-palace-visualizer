
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const adminEmail = Deno.env.get("ADMIN_EMAIL") || "admin@example.com";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface BookingNotificationRequest {
  plot: {
    id: string;
    block: string;
    number: number;
    size: number;
  };
  booking: {
    id: number;
    plot_id: string;
    block_id: string;
    plot_number: number;
    booked_by: string;
    contact_info: string;
    phone: string;
    visit_date: string | null;
    note: string | null;
  };
  hasDocument: boolean;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { plot, booking, hasDocument }: BookingNotificationRequest = await req.json();
    const timestamp = new Date().toLocaleString();

    const emailResponse = await resend.emails.send({
      from: "Plot Bookings <onboarding@resend.dev>",
      to: [adminEmail],
      subject: `New Plot Booking: ${plot.id} in Block ${plot.block}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
          <h1 style="color: #1e6246; border-bottom: 1px solid #eee; padding-bottom: 10px;">New Plot Booking</h1>
          
          <div style="margin: 20px 0; background: #f9f9f9; border-left: 4px solid #1e6246; padding: 15px;">
            <h2 style="margin-top: 0;">Plot Information</h2>
            <p><strong>Plot ID:</strong> ${plot.id}</p>
            <p><strong>Block:</strong> ${plot.block}</p>
            <p><strong>Plot Number:</strong> ${plot.number}</p>
            <p><strong>Size:</strong> ${plot.size} sq.ft.</p>
          </div>

          <div style="margin: 20px 0; background: #f9f9f9; border-left: 4px solid #1e6246; padding: 15px;">
            <h2 style="margin-top: 0;">Customer Information</h2>
            <p><strong>Name:</strong> ${booking.booked_by}</p>
            <p><strong>Email:</strong> ${booking.contact_info}</p>
            <p><strong>Phone:</strong> ${booking.phone}</p>
            ${booking.visit_date ? `<p><strong>Preferred Visit Date:</strong> ${new Date(booking.visit_date).toLocaleDateString()}</p>` : ''}
            ${booking.note ? `<p><strong>Additional Notes:</strong> ${booking.note}</p>` : ''}
            ${hasDocument ? `<p><strong>Government ID:</strong> Uploaded (available in Storage)</p>` : ''}
          </div>

          <div style="margin: 20px 0; color: #666; font-size: 14px;">
            <p><strong>Booking ID:</strong> ${booking.id}</p>
            <p><strong>Timestamp:</strong> ${timestamp}</p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #999;">
            <p>This is an automated notification from your Plot Booking System.</p>
          </div>
        </div>
      `,
    });

    console.log("Email notification sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in notify-booking function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
