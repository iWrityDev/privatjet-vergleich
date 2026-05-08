import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum – PrivatjetVergleich.de",
  robots: { index: false, follow: false },
};

export default function ImpressumPage() {
  return (
    <div className="py-16">
      <div className="mx-auto max-w-3xl px-4">
        <h1 className="text-3xl font-bold mb-8" style={{ color: "#0d1b2a" }}>Impressum</h1>
        <div className="prose-luxury space-y-6">
          <section>
            <h2>Angaben gemäß § 5 TMG</h2>
            <p>
              PrivatjetVergleich.de<br />
              Inhaber: [Name des Betreibers]<br />
              [Straße und Hausnummer]<br />
              [PLZ Ort]<br />
              Deutschland
            </p>
          </section>
          <section>
            <h2>Kontakt</h2>
            <p>
              E-Mail: kontakt@privatjet-vergleich.de<br />
              Diese Website wird als redaktionelles Informationsportal betrieben.
            </p>
          </section>
          <section>
            <h2>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
            <p>[Name des Verantwortlichen], [Adresse wie oben]</p>
          </section>
          <section>
            <h2>Haftung für Inhalte</h2>
            <p>
              Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit,
              Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
              Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten
              nach den allgemeinen Gesetzen verantwortlich.
            </p>
          </section>
          <section>
            <h2>Urheberrecht</h2>
            <p>
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen
              dem deutschen Urheberrecht. Beiträge Dritter sind als solche gekennzeichnet.
              Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der
              Grenzen des Urheberrechts bedürfen der schriftlichen Zustimmung des jeweiligen Autors
              bzw. Erstellers.
            </p>
          </section>
          <section>
            <h2>Affiliate-Hinweis</h2>
            <p>
              Diese Website enthält Affiliate-Links. Wenn Sie über diese Links Buchungen vornehmen,
              erhalten wir eine Provision. Für Sie entstehen dabei keine Mehrkosten.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
