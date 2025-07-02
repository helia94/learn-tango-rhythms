import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  to: string;
  subject: string;
  html: string;
  emailType: string;
  userId?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { to, subject, html, emailType, userId }: EmailRequest = await req.json();

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Check user's email preferences if userId is provided
    if (userId) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('email_preferences')
        .eq('id', userId)
        .single();

      // Respect user preferences
      if (profile?.email_preferences === 'none') {
        return new Response(JSON.stringify({ 
          success: false, 
          reason: 'User has opted out of all emails' 
        }), {
          status: 200,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }

      if (profile?.email_preferences === 'important_only' && emailType !== 'important') {
        return new Response(JSON.stringify({ 
          success: false, 
          reason: 'User only wants important emails' 
        }), {
          status: 200,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }
    }

    // Generate unsubscribe tokens
    let unsubscribeLinks = '';
    if (userId) {
      const { data: allToken } = await supabase.rpc('generate_unsubscribe_token', {
        _user_id: userId,
        _token_type: 'all'
      });

      const { data: weeklyToken } = await supabase.rpc('generate_unsubscribe_token', {
        _user_id: userId,
        _token_type: 'weekly'
      });

      const baseUrl = 'https://tangodiario.com'; // Replace with your actual domain
      unsubscribeLinks = `
        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #888;">
          <p>Don't want to receive these emails?</p>
          <p>
            <a href="${baseUrl}/unsubscribe/weekly/${weeklyToken}" style="color: #666;">Unsubscribe from weekly emails</a> | 
            <a href="${baseUrl}/unsubscribe/all/${allToken}" style="color: #666;">Unsubscribe from all emails</a>
          </p>
        </div>
      `;
    }

    // Send email with Resend
    const emailResponse = await resend.emails.send({
      from: "TANGO DIARIO <hello@tangodiario.com>",
      to: [to],
      subject: subject,
      html: `${html}${unsubscribeLinks}`,
    });

    console.log("Email sent successfully:", emailResponse);

    // Track email sending
    if (userId) {
      await supabase.from('user_email_tracking').insert({
        user_id: userId,
        email_type: emailType,
        subject: subject,
        sent_at: new Date().toISOString(),
      });
    }

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-marketing-email function:", error);
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