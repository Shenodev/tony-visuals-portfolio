import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Refund Policy — Tony Visuals",
  description:
    "Deposits, cancellations, and refunds for Tony Visuals photography sessions.",
  alternates: { canonical: "/refund-policy" },
};

const CONTACT_EMAIL = "tonylens.web@outlook.com";

export default function RefundPolicyPage() {
  return (
    <LegalPage
      title="Refund Policy"
      updated="22 September 2026"
      intro="This policy explains how deposits and payments work for Tony Visuals photography sessions, and what happens if a session is cancelled."
      sections={[
        {
          heading: "Deposits",
          body: (
            <p>
              Some sessions require a deposit to reserve a date. The deposit is
              stated in your written quote and is applied against the final
              balance. Deposits are non-refundable once production costs (such
              as travel, venue access, or hired equipment) have been committed,
              but they can be applied to a rescheduled date as described below.
            </p>
          ),
        },
        {
          heading: "Cancellation by you",
          body: (
            <p>
              If you need to cancel, please email {CONTACT_EMAIL} as soon as
              possible. You may reschedule once to an available future date
              without losing your deposit. If you cancel entirely, any balance
              already paid beyond the deposit is refunded to the original
              payment method, and the deposit is released only where no
              production costs were committed.
            </p>
          ),
        },
        {
          heading: "Cancellation by us",
          body: (
            <p>
              If we must cancel (for example, due to illness or an equipment
              failure), you receive a full refund of everything you have paid,
              and we will help you find an alternative date or photographer.
            </p>
          ),
        },
        {
          heading: "Force majeure",
          body: (
            <p>
              If a session cannot take place due to a situation beyond either
              party&apos;s control (government restrictions, venue closure,
              severe weather, or public safety issues), we will offer a full
              reschedule. If no suitable date is available, you receive a full
              refund of amounts paid for the un-performed session.
            </p>
          ),
        },
        {
          heading: "No-shows & late arrivals",
          body: (
            <p>
              If you do not attend the session at the agreed time and have not
              contacted us, the session is treated as cancelled by you. Deposits
              are not refunded for no-shows.
            </p>
          ),
        },
        {
          heading: "Deliverables",
          body: (
            <p>
              If we are unable to deliver the agreed images after a session for
              any reason (for example, total media loss), we will either re-shoot
              free of charge or refund the full amount paid, at your choice.
              Partial loss is compensated by re-shooting the affected portion or
              a pro-rata refund.
            </p>
          ),
        },
        {
          heading: "How to request a refund",
          body: (
            <p>
              Email {CONTACT_EMAIL} with your session date and the payment
              method used. Refunds are processed to the original payment method
              within a reasonable time and usually within 14 days of approval.
            </p>
          ),
        },
      ]}
    />
  );
}