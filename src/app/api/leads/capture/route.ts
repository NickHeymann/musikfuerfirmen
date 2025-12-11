/**
 * Lead Capture API
 * Saves leads to database (or JSON file as MVP)
 * Sends welcome email with PDF
 */

import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

interface LeadData {
  email: string;
  firstName: string;
  companyName?: string;
  phone?: string;
  calculatorData: {
    guestCount: number;
    eventType: string;
    location: string;
  };
  budget: {
    min: number;
    max: number;
    base: number;
  };
  source: string;
  leadScore: number;
}

export async function POST(request: Request) {
  try {
    const data: LeadData = await request.json();

    // Validation
    if (!data.email || !data.firstName) {
      return NextResponse.json(
        { error: 'Email und Name sind erforderlich' },
        { status: 400 }
      );
    }

    // Create lead object
    const lead = {
      id: crypto.randomUUID(),
      ...data,
      createdAt: new Date().toISOString(),
      status: 'new',
      stage: data.leadScore >= 61 ? 'hot' : data.leadScore >= 31 ? 'warm' : 'cold',
      activities: [
        {
          type: 'budget_calculator_used',
          timestamp: new Date().toISOString(),
          data: data.calculatorData,
        },
      ],
    };

    // Save to JSON file (MVP - later: PostgreSQL)
    const leadsFilePath = path.join(process.cwd(), 'data', 'leads.json');

    let leads = [];
    try {
      const fileContent = await fs.readFile(leadsFilePath, 'utf-8');
      leads = JSON.parse(fileContent);
    } catch (error) {
      // File doesn't exist yet, start with empty array
      await fs.mkdir(path.join(process.cwd(), 'data'), { recursive: true });
    }

    // Check for duplicate email
    const existingLead = leads.find((l: any) => l.email === data.email);
    if (existingLead) {
      // Update existing lead with new activity
      existingLead.activities.push(lead.activities[0]);
      existingLead.leadScore += data.leadScore;
      existingLead.updatedAt = new Date().toISOString();

      // Update stage
      if (existingLead.leadScore >= 81) existingLead.stage = 'burning';
      else if (existingLead.leadScore >= 61) existingLead.stage = 'hot';
      else if (existingLead.leadScore >= 31) existingLead.stage = 'warm';

      // Save updated leads
      await fs.writeFile(leadsFilePath, JSON.stringify(leads, null, 2));

      return NextResponse.json({
        success: true,
        leadId: existingLead.id,
        message: 'Lead aktualisiert',
      });
    }

    // Add new lead
    leads.push(lead);

    // Save to file
    await fs.writeFile(leadsFilePath, JSON.stringify(leads, null, 2));

    // Send email (optional - requires email service)
    // await sendWelcomeEmail(lead);

    // Log to console (für Hot Leads)
    if (lead.stage === 'hot' || lead.stage === 'burning') {
      console.log('🔥 HOT LEAD captured:', {
        email: lead.email,
        company: lead.companyName,
        score: lead.leadScore,
        budget: lead.budget.base,
      });
    }

    return NextResponse.json({
      success: true,
      leadId: lead.id,
      message: 'Lead erfolgreich gespeichert',
    });
  } catch (error) {
    console.error('Lead-Capture Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// Optional: Email-Sending (später mit Resend.com)
async function sendWelcomeEmail(lead: any) {
  // TODO: Integrate with Resend.com oder SendGrid
  // const emailContent = generateEmailHTML(lead);
  // await resend.emails.send({ to: lead.email, subject: '...', html: emailContent });
}
