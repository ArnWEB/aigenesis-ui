export type Role = 'admin' | 'agent' | 'supervisor';

export interface TicketData {
  date: string;
  weekLabel: string;
  ticketsReceived: number;
  ticketsClosedBOT: number;
  ticketsClosedHuman: number;
  openTickets: number;
}

export interface KeyHighlight {
  id: string;
  title: string;
  text: string;
  emphasis?: boolean;
}

export interface RoleData {
  ticketData: TicketData[];
  highlights: KeyHighlight[];
}

export const insightTicketData: Record<Role, RoleData> = {
  admin: {
    ticketData: [
      { date: "2026-04-05", weekLabel: "Week 1", ticketsReceived: 120, ticketsClosedBOT: 80, ticketsClosedHuman: 30, openTickets: 10 },
      { date: "2026-04-12", weekLabel: "Week 2", ticketsReceived: 135, ticketsClosedBOT: 90, ticketsClosedHuman: 35, openTickets: 10 },
      { date: "2026-04-19", weekLabel: "Week 3", ticketsReceived: 110, ticketsClosedBOT: 75, ticketsClosedHuman: 25, openTickets: 10 },
      { date: "2026-04-26", weekLabel: "Week 4", ticketsReceived: 145, ticketsClosedBOT: 100, ticketsClosedHuman: 35, openTickets: 10 },
      { date: "2026-05-03", weekLabel: "Week 5", ticketsReceived: 130, ticketsClosedBOT: 85, ticketsClosedHuman: 35, openTickets: 10 },
      { date: "2026-05-10", weekLabel: "Week 6", ticketsReceived: 155, ticketsClosedBOT: 110, ticketsClosedHuman: 35, openTickets: 10 },
      { date: "2026-05-17", weekLabel: "Week 7", ticketsReceived: 125, ticketsClosedBOT: 80, ticketsClosedHuman: 35, openTickets: 10 },
      { date: "2026-05-24", weekLabel: "Week 8", ticketsReceived: 140, ticketsClosedBOT: 95, ticketsClosedHuman: 35, openTickets: 10 },
    ],
    highlights: [
      { id: "1", title: "BOT Resolution Rate", text: "BOT resolved 65% of tickets this month, up from 58% last month.", emphasis: true },
      { id: "2", title: "Peak Ticket Volume", text: "Thursday sees the highest ticket influx at 45% of weekly volume." },
      { id: "3", title: "Human Handoff", text: "Only 8% of tickets required human intervention after BOT triage." },
      { id: "4", title: "SLA Compliance", text: "95% of tickets resolved within 24-hour SLA target." },
    ],
  },
  agent: {
    ticketData: [
      { date: "2026-04-05", weekLabel: "Week 1", ticketsReceived: 45, ticketsClosedBOT: 5, ticketsClosedHuman: 35, openTickets: 5 },
      { date: "2026-04-12", weekLabel: "Week 2", ticketsReceived: 50, ticketsClosedBOT: 8, ticketsClosedHuman: 38, openTickets: 4 },
      { date: "2026-04-19", weekLabel: "Week 3", ticketsReceived: 40, ticketsClosedBOT: 6, ticketsClosedHuman: 30, openTickets: 4 },
      { date: "2026-04-26", weekLabel: "Week 4", ticketsReceived: 55, ticketsClosedBOT: 10, ticketsClosedHuman: 40, openTickets: 5 },
      { date: "2026-05-03", weekLabel: "Week 5", ticketsReceived: 48, ticketsClosedBOT: 7, ticketsClosedHuman: 37, openTickets: 4 },
      { date: "2026-05-10", weekLabel: "Week 6", ticketsReceived: 52, ticketsClosedBOT: 9, ticketsClosedHuman: 39, openTickets: 4 },
      { date: "2026-05-17", weekLabel: "Week 7", ticketsReceived: 42, ticketsClosedBOT: 6, ticketsClosedHuman: 32, openTickets: 4 },
      { date: "2026-05-24", weekLabel: "Week 8", ticketsReceived: 58, ticketsClosedBOT: 12, ticketsClosedHuman: 42, openTickets: 4 },
    ],
    highlights: [
      { id: "1", title: "Your Performance", text: "You closed 38 tickets this week, 15% above team average." },
      { id: "2", title: "BOT Assist", text: "BOT pre-filled 72% of ticket fields, reducing handling time by 3 mins." },
      { id: "3", title: "Escalation Rate", text: "Your escalation rate is 5%, below the 10% team average." },
      { id: "4", title: "Customer Feedback", text: "4.5/5 average rating on tickets you resolved this month." },
    ],
  },
  supervisor: {
    ticketData: [
      { date: "2026-04-05", weekLabel: "Week 1", ticketsReceived: 85, ticketsClosedBOT: 55, ticketsClosedHuman: 25, openTickets: 5 },
      { date: "2026-04-12", weekLabel: "Week 2", ticketsReceived: 95, ticketsClosedBOT: 65, ticketsClosedHuman: 25, openTickets: 5 },
      { date: "2026-04-19", weekLabel: "Week 3", ticketsReceived: 80, ticketsClosedBOT: 50, ticketsClosedHuman: 25, openTickets: 5 },
      { date: "2026-04-26", weekLabel: "Week 4", ticketsReceived: 100, ticketsClosedBOT: 70, ticketsClosedHuman: 25, openTickets: 5 },
      { date: "2026-05-03", weekLabel: "Week 5", ticketsReceived: 88, ticketsClosedBOT: 58, ticketsClosedHuman: 25, openTickets: 5 },
      { date: "2026-05-10", weekLabel: "Week 6", ticketsReceived: 105, ticketsClosedBOT: 75, ticketsClosedHuman: 25, openTickets: 5 },
      { date: "2026-05-17", weekLabel: "Week 7", ticketsReceived: 82, ticketsClosedBOT: 52, ticketsClosedHuman: 25, openTickets: 5 },
      { date: "2026-05-24", weekLabel: "Week 8", ticketsReceived: 98, ticketsClosedBOT: 68, ticketsClosedHuman: 25, openTickets: 5 },
    ],
    highlights: [
      { id: "1", title: "Team Efficiency", text: "Team closed 125 tickets this week, exceeding target by 12%." },
      { id: "2", title: "BOT Utilization", text: "Agent using BOT assist have 40% faster resolution times." },
      { id: "3", title: "Training Opportunity", text: "2 agents flagged for repetitive manual handling - recommend BOT training." },
      { id: "4", title: "Trend Alert", text: "Invoice-related tickets spiked 20% on Mondays - consider proactive outreach." },
    ],
  },
};

export function filterTicketsByDateRange(
  data: TicketData[],
  startDate: string,
  endDate: string
): TicketData[] {
  return data.filter(item => {
    return item.date >= startDate && item.date <= endDate;
  });
}

export function getDefaultDateRange(): { start: string; end: string } {
  const today = new Date();
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(today.getDate() - 7);
  
  const formatDate = (d: Date) => d.toISOString().split('T')[0];
  
  return {
    start: formatDate(sevenDaysAgo),
    end: formatDate(today),
  };
}