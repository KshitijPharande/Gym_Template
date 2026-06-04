import fs from "fs";
import path from "path";
import Link from "next/link";
import { ShieldCheck, Table, Download, Users, ArrowLeft, Calendar, FileSpreadsheet, PlusCircle } from "lucide-react";

interface Booking {
  id: string;
  timestamp: string;
  name: string;
  phone: string;
  goal: string;
  age: number;
  visitDate: string;
  visitTime: string;
}

// Read bookings directly from server file
function getBookings(): Booking[] {
  const BOOKINGS_FILE = path.join(process.cwd(), "bookings.json");
  try {
    if (!fs.existsSync(BOOKINGS_FILE)) {
      return [];
    }
    const data = fs.readFileSync(BOOKINGS_FILE, "utf-8");
    const bookings = JSON.parse(data || "[]");
    
    // Sort by timestamp descending (newest first)
    return bookings.sort((a: any, b: any) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  } catch (error) {
    console.error("Error reading bookings database:", error);
    return [];
  }
}

export const revalidate = 0; // Disable caching so bookings update instantly on page refresh

export default function AdminDashboard() {
  const bookings = getBookings();
  const totalLeads = bookings.length;
  
  // Group counts by fitness goal
  const goalCounts = bookings.reduce((acc: Record<string, number>, curr) => {
    acc[curr.goal] = (acc[curr.goal] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="w-full min-h-screen bg-[#050505] py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-28">
      {/* Back button */}
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-neon-green transition-colors uppercase tracking-wider"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Website
        </Link>
      </div>

      {/* Header */}
      <section className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-white/5 pb-8 mb-12">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon-green/10 text-neon-green text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="h-4 w-4" /> Owner Operations
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            LEAD & INQUIRY <span className="text-neon-green text-glow-green">DASHBOARD</span>
          </h1>
          <p className="text-gray-400 text-sm">
            View real-time lead acquisitions, calendar slot bookings, and synchronize with your live Google Sheets.
          </p>
        </div>
      </section>

      {/* Stats Widgets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="glass-card p-6 rounded-2xl border border-white/5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">Total Leads</span>
            <Users className="h-5 w-5 text-neon-green" />
          </div>
          <h3 className="text-3xl font-extrabold text-white">{totalLeads}</h3>
          <p className="text-2xs text-gray-500">Collected from website chatbot</p>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-white/5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">Strength Goals</span>
            <span className="text-xs font-bold text-white bg-white/5 px-2 py-0.5 rounded-full">
              {goalCounts["Strength Lifting"] || 0}
            </span>
          </div>
          <h3 className="text-3xl font-extrabold text-white">
            {totalLeads > 0 ? Math.round(((goalCounts["Strength Lifting"] || 0) / totalLeads) * 100) : 0}%
          </h3>
          <p className="text-2xs text-gray-500">Of total inquiries count</p>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-white/5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">CrossFit Goals</span>
            <span className="text-xs font-bold text-white bg-white/5 px-2 py-0.5 rounded-full">
              {goalCounts["CrossFit"] || 0}
            </span>
          </div>
          <h3 className="text-3xl font-extrabold text-white">
            {totalLeads > 0 ? Math.round(((goalCounts["CrossFit"] || 0) / totalLeads) * 100) : 0}%
          </h3>
          <p className="text-2xs text-gray-500">Of total inquiries count</p>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-white/5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">Other Goals</span>
            <span className="text-xs font-bold text-white bg-white/5 px-2 py-0.5 rounded-full">
              {((goalCounts["Fat Loss"] || 0) + (goalCounts["Yoga Flow"] || 0)) || 0}
            </span>
          </div>
          <h3 className="text-3xl font-extrabold text-white">
            {totalLeads > 0 ? Math.round(((((goalCounts["Fat Loss"] || 0) + (goalCounts["Yoga Flow"] || 0)) || 0) / totalLeads) * 100) : 0}%
          </h3>
          <p className="text-2xs text-gray-500">Fat Loss & Yoga Flow combined</p>
        </div>
      </div>

      {/* Spreadsheet Leads Table */}
      <div className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Table className="h-5 w-5 text-neon-green" /> Spreadsheet Database
          </h3>
        </div>

        {totalLeads === 0 ? (
          <div className="glass-panel p-16 rounded-2xl border border-white/5 text-center space-y-4">
            <FileSpreadsheet className="h-12 w-12 text-gray-600 mx-auto" />
            <h4 className="text-white font-bold text-lg">No Lead Inquiries Yet</h4>
            <p className="text-gray-400 text-sm max-w-sm mx-auto leading-relaxed">
              New inquiries submitted through the floating assistant bot will display here in real-time. Try opening the chat bot and completing a booking!
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-white/5 glass-panel">
            <table className="min-w-full divide-y divide-white/5 text-left border-collapse">
              <thead>
                <tr className="bg-white/5 text-2xs font-bold uppercase tracking-widest text-gray-300">
                  <th className="px-6 py-4">Inquiry Time</th>
                  <th className="px-6 py-4">Visitor Name</th>
                  <th className="px-6 py-4">Phone Number</th>
                  <th className="px-6 py-4">Age</th>
                  <th className="px-6 py-4">Fitness Goal</th>
                  <th className="px-6 py-4 text-neon-green">Visit Date</th>
                  <th className="px-6 py-4 text-neon-green">Visit Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-xs sm:text-sm text-gray-300">
                {bookings.map((row) => (
                  <tr key={row.id} className="hover:bg-white/2 transition-colors">
                    <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                      {new Date(row.timestamp).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit"
                      })}
                    </td>
                    <td className="px-6 py-4 font-bold text-white whitespace-nowrap">
                      {row.name}
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-300 whitespace-nowrap">
                      {row.phone}
                    </td>
                    <td className="px-6 py-4 text-gray-400 whitespace-nowrap">
                      {row.age} yrs
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="bg-white/5 border border-white/10 px-2.5 py-1 rounded-full text-2xs font-semibold text-gray-300">
                        {row.goal}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-bold text-white whitespace-nowrap">
                      {new Date(row.visitDate).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric"
                      })}
                    </td>
                    <td className="px-6 py-4 font-bold text-neon-green whitespace-nowrap">
                      {row.visitTime}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Google Sheets Setup Instructions Panel */}
      <section className="mt-16 bg-[#080808] border border-white/5 p-8 rounded-3xl space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-neon-green/10 text-neon-green rounded-xl">
            <FileSpreadsheet className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Connect Live Google Sheets</h2>
            <p className="text-gray-400 text-xs sm:text-sm mt-0.5">
              Sync incoming leads directly to a Google Sheet spreadsheet in real-time. Follow the steps below.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-4 border-t border-white/5">
          {/* Steps */}
          <div className="lg:col-span-6 space-y-5 text-sm">
            <h3 className="text-white font-bold text-sm uppercase tracking-wider flex items-center gap-2">
              <PlusCircle className="h-4.5 w-4.5 text-neon-green" /> 3-Step Setup Guide
            </h3>
            
            <ol className="space-y-4 text-gray-400 list-decimal pl-4">
              <li className="leading-relaxed">
                Open a new **Google Sheet** and click **Extensions &gt; Apps Script** at the top.
              </li>
              <li className="leading-relaxed">
                Delete any default script code and paste the **Apps Script Code** block shown on the right.
              </li>
              <li className="leading-relaxed">
                Click **Deploy &gt; New Deployment**. Choose **Web App** as the type. Set access to **"Anyone"** and copy the generated Web App URL. Save this URL in your project environment variables as `GOOGLE_SHEETS_WEBHOOK`.
              </li>
            </ol>
          </div>

          {/* Code block */}
          <div className="lg:col-span-6 space-y-2">
            <h4 className="text-gray-400 text-xs font-bold uppercase tracking-wider">Apps Script Code</h4>
            <div className="p-4 rounded-xl bg-black border border-white/5 font-mono text-2xs overflow-x-auto text-gray-300 leading-relaxed max-h-[220px] no-scrollbar">
              <pre>{`function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);
  
  // Append Row: Timestamp, Name, Phone, Goal, Age, Visit Date, Visit Time
  sheet.appendRow([
    new Date(),
    data.name,
    data.phone,
    data.goal,
    data.age,
    data.visitDate,
    data.visitTime
  ]);
  
  return ContentService.createTextOutput(JSON.stringify({"result": "success"}))
    .setMimeType(ContentService.MimeType.JSON);
}`}</pre>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
