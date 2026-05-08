import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Kontakt – PrivatjetVergleich.de",
  description: "Kontaktieren Sie PrivatjetVergleich.de. Fragen, Feedback, Kooperationen.",
};

export default function KontaktPage() {
  return (
    <div className="py-16">
      <div className="mx-auto max-w-3xl px-4">
        <h1 className="text-3xl font-bold mb-4" style={{ color: "#0d1b2a" }}>Kontakt</h1>
        <p className="text-slate-500 mb-10 leading-relaxed">
          Haben Sie Fragen, Anmerkungen oder möchten Sie mit uns zusammenarbeiten? Wir freuen uns
          von Ihnen zu hören.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {[
            {
              icon: "📧",
              title: "E-Mail",
              desc: "kontakt@privatjet-vergleich.de",
              note: "Antwortzeit: 1–2 Werktage",
            },
            {
              icon: "✈️",
              title: "Charter-Angebot",
              desc: "Für ein Privatjet-Angebot empfehlen wir direkt Villiers Jets",
              note: "Antwort innerhalb von 2 Stunden",
            },
          ].map((item) => (
            <div key={item.title} className="bg-white border border-slate-100 rounded-2xl p-6">
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3 className="font-bold mb-1" style={{ color: "#0d1b2a" }}>{item.title}</h3>
              <p className="text-slate-600 text-sm mb-1">{item.desc}</p>
              <p className="text-slate-400 text-xs">{item.note}</p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl p-8 text-center" style={{ background: "#0d1b2a" }}>
          <h2 className="text-xl font-bold text-white mb-3">Privatjet-Angebot benötigt?</h2>
          <p className="text-slate-300 mb-6 text-sm">
            Für Charter-Anfragen vermitteln wir direkt an Villiers Jets – Europas größten
            Privatjet-Broker.
          </p>
          <Link
            href="/anbieter/villiers-jets"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #c9a84c, #a07828)", color: "#0d1b2a" }}
          >
            ✈ Angebot einholen
          </Link>
        </div>

        <div className="mt-12 prose-luxury">
          <h2>Presseanfragen und Kooperationen</h2>
          <p>
            Sind Sie Journalist, Blogger oder Anbieter und möchten mit PrivatjetVergleich.de
            zusammenarbeiten? Wir sind offen für redaktionelle Kooperationen, Gastbeiträge und
            PR-Anfragen. Schreiben Sie uns an kontakt@privatjet-vergleich.de.
          </p>
          <h2>Fehler melden</h2>
          <p>
            Wenn Sie einen inhaltlichen Fehler oder veraltete Informationen entdecken, freuen wir
            uns über einen Hinweis. Wir aktualisieren unsere Inhalte regelmäßig, um die Qualität
            auf höchstem Niveau zu halten.
          </p>
        </div>
      </div>
    </div>
  );
}
