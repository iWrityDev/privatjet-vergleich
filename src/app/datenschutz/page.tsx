import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutzerklärung – PrivatjetVergleich.de",
  robots: { index: false, follow: false },
};

export default function DatenschutzPage() {
  return (
    <div className="py-16">
      <div className="mx-auto max-w-3xl px-4">
        <h1 className="text-3xl font-bold mb-8" style={{ color: "#0d1b2a" }}>Datenschutzerklärung</h1>
        <div className="prose-luxury space-y-8">
          <section>
            <h2>1. Datenschutz auf einen Blick</h2>
            <h3>Allgemeine Hinweise</h3>
            <p>
              Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren
              personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene
              Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
            </p>
            <h3>Datenerfassung auf dieser Website</h3>
            <p>
              Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen
              Kontaktdaten können Sie dem Impressum dieser Website entnehmen.
            </p>
          </section>

          <section>
            <h2>2. Hosting und technische Infrastruktur</h2>
            <p>
              Diese Website wird bei Vercel Inc., 340 Pine Street, San Francisco, CA 94104, USA gehostet.
              Vercel verarbeitet Server-Log-Dateien automatisch bei jedem Seitenaufruf.
              Weitere Informationen finden Sie in der Datenschutzerklärung von Vercel unter
              vercel.com/legal/privacy-policy.
            </p>
          </section>

          <section>
            <h2>3. Analyse und Tracking</h2>
            <p>
              Diese Website verwendet Vercel Analytics zur anonymisierten Analyse des Nutzerverhaltens.
              Die Daten werden ohne Cookies und ohne Personenbezug erhoben. Eine Weitergabe an Dritte
              erfolgt nicht.
            </p>
          </section>

          <section>
            <h2>4. Affiliate-Links</h2>
            <p>
              Diese Website enthält Affiliate-Links, insbesondere zu Villiers Jets und weiteren
              Privatjet-Charter-Anbietern. Wenn Sie über diese Links zu externen Websites navigieren,
              können diese Anbieter Cookies setzen. Bitte beachten Sie die jeweiligen
              Datenschutzerklärungen der verlinkten Anbieter.
            </p>
          </section>

          <section>
            <h2>5. Ihre Rechte</h2>
            <p>
              Sie haben jederzeit das Recht auf Auskunft über Ihre gespeicherten personenbezogenen Daten,
              deren Herkunft und Empfänger sowie den Zweck der Datenverarbeitung. Außerdem haben Sie
              ein Recht auf Berichtigung, Sperrung oder Löschung dieser Daten. Hierzu sowie zu weiteren
              Fragen zum Thema Datenschutz können Sie sich jederzeit an die im Impressum angegebene
              Adresse wenden.
            </p>
          </section>

          <section>
            <h2>6. Kontakt</h2>
            <p>
              Bei Fragen zum Datenschutz wenden Sie sich bitte an:<br />
              E-Mail: datenschutz@privatjet-vergleich.de
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
