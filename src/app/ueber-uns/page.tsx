import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Über uns – PrivatjetVergleich.de",
  description:
    "PrivatjetVergleich.de ist der unabhängige Ratgeber für Privatjet-Charter im DACH-Raum. Unsere Mission, unsere Methodik.",
};

export default function UeberUnsPage() {
  return (
    <div className="py-16">
      <div className="mx-auto max-w-3xl px-4">
        {/* Hero */}
        <div className="rounded-2xl p-8 mb-12 text-center" style={{ background: "linear-gradient(135deg, #0d1b2a, #1b2e45)" }}>
          <div className="text-4xl mb-4">✈</div>
          <h1 className="text-3xl font-bold text-white mb-4">Über PrivatjetVergleich.de</h1>
          <p className="text-slate-300 leading-relaxed">
            Der unabhängige Ratgeber für Privatjet-Charter im DACH-Raum.
            Unparteiisch, datenbasiert, transparent.
          </p>
        </div>

        <div className="prose-luxury">
          <h2>Unsere Mission</h2>
          <p>
            Privatjet-Reisen sind komplex und intransparent. Preise variieren stark, Anbieter
            kommunizieren selten offen, und wer zum ersten Mal chartert, steht oft allein.
            PrivatjetVergleich.de schafft Klarheit: Wir analysieren, vergleichen und erklären den
            gesamten DACH-Markt für Privatjet-Charter – ohne eigene Flotte, ohne exklusive
            Partnerschaften, ohne Interessenkonflikt.
          </p>

          <h2>Was uns unterscheidet</h2>
          <p>
            Wir sind kein Buchungsportal und kein Broker. Wir verdienen keine höhere Provision,
            wenn Sie einen bestimmten Anbieter wählen. Unser Ziel ist es, Ihnen die Informationen
            zu geben, die Sie für eine fundierte Entscheidung brauchen.
          </p>
          <p>
            Unsere Datenbasis umfasst über 500 Seiten eigener Recherche, aktuelle Marktdaten,
            echte Nutzererfahrungen und direkte Kommunikation mit Anbietern, FBOs und Brancheninsidern.
          </p>

          <h2>Unsere Methodik</h2>
          <p>
            Jede Seite auf PrivatjetVergleich.de entsteht nach einem definierten Prozess:
          </p>
          <ul>
            <li>Marktrecherche: Aktuelle Preise, Verfügbarkeiten und Konditionen der Anbieter</li>
            <li>Experteninterview oder Primärquellen-Analyse</li>
            <li>Redaktionelle Prüfung durch Luftfahrt-Experten</li>
            <li>Regelmäßige Aktualisierung – mindestens alle 6 Monate</li>
          </ul>

          <h2>Transparenz bei Affiliate-Links</h2>
          <p>
            Diese Website enthält Affiliate-Links. Wenn Sie über unsere Links eine Buchung vornehmen,
            erhalten wir eine Provision. Für Sie entstehen dabei keine Mehrkosten. Die Provision
            beeinflusst unsere redaktionellen Empfehlungen nicht. Wir empfehlen Villiers Jets nicht,
            weil sie die höchste Provision zahlen, sondern weil sie objektiv das umfangreichste
            Netzwerk für DACH-Kunden bieten.
          </p>

          <h2>Kontakt</h2>
          <p>
            Fragen, Feedback oder Kooperationsanfragen richten Sie bitte an:<br />
            kontakt@privatjet-vergleich.de
          </p>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row gap-4">
          <Link
            href="/ratgeber"
            className="flex-1 text-center py-3 px-4 rounded-full text-sm font-semibold border border-slate-200 hover:border-amber-300 transition-all"
            style={{ color: "#0d1b2a" }}
          >
            Unsere Ratgeber →
          </Link>
          <Link
            href="/anbieter/villiers-jets"
            className="flex-1 text-center py-3 px-4 rounded-full text-sm font-semibold transition-all hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #c9a84c, #a07828)", color: "#0d1b2a" }}
          >
            ✈ Angebot einholen
          </Link>
        </div>
      </div>
    </div>
  );
}
