import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Affiliate-Hinweis – PrivatjetVergleich.de",
  description: "Transparenzhinweis zu Affiliate-Links auf PrivatjetVergleich.de.",
};

export default function AffiliateHinweisPage() {
  return (
    <div className="py-16">
      <div className="mx-auto max-w-3xl px-4">
        <h1 className="text-3xl font-bold mb-8" style={{ color: "#0d1b2a" }}>Affiliate-Hinweis</h1>
        <div className="prose-luxury">
          <h2>Was sind Affiliate-Links?</h2>
          <p>
            Auf PrivatjetVergleich.de finden Sie sogenannte Affiliate-Links. Das sind besondere
            Hyperlinks, über die Sie zu Anbieter-Websites weitergeleitet werden. Wenn Sie über
            solche Links eine Buchung oder Anfrage vornehmen, erhalten wir eine Provision vom
            jeweiligen Anbieter.
          </p>

          <h2>Welche Anbieter haben Affiliate-Programme?</h2>
          <p>
            Auf dieser Website sind unter anderem folgende Anbieter über Affiliate-Links verknüpft:
          </p>
          <ul>
            <li>Villiers Jets (30% der Marge, 365 Tage Cookie)</li>
            <li>PrivateFly</li>
            <li>Jettly</li>
            <li>PrivateJetFinder (Flat fee pro Buchung)</li>
            <li>Weitere Anbieter nach Verfügbarkeit</li>
          </ul>

          <h2>Wie beeinflusst das unsere Empfehlungen?</h2>
          <p>
            Kurz gesagt: gar nicht. Unsere redaktionellen Bewertungen und Empfehlungen basieren auf
            objektiven Kriterien wie Netzwerkgröße, Preis-Leistungs-Verhältnis, Kundenbewertungen und
            Verfügbarkeit im DACH-Raum.
          </p>
          <p>
            Wir empfehlen Villiers Jets nicht, weil sie die höchste Provision bieten, sondern weil
            sie objektiv das größte Partnernetzwerk, die transparentesten Preise und den besten
            Zugang für DACH-Kunden haben.
          </p>

          <h2>Entstehen Ihnen Mehrkosten?</h2>
          <p>
            Nein. Wenn Sie über unsere Affiliate-Links buchen, zahlen Sie denselben Preis wie beim
            Direktbesuch der Website. Die Provision wird vom Anbieter aus seinen eigenen Mitteln
            vergütet und nicht auf den Buchungspreis aufgeschlagen.
          </p>

          <h2>Kennzeichnung</h2>
          <p>
            Affiliate-Links sind auf dieser Website durch den Zusatz "Partner" oder durch das
            Attribut rel="sponsored" im HTML-Code gekennzeichnet. Im Text weise ich an relevanten
            Stellen auf Affiliate-Beziehungen hin.
          </p>

          <h2>Rechtliche Grundlage</h2>
          <p>
            Dieser Hinweis entspricht den Anforderungen der §§ 5a, 5b UWG (Gesetz gegen unlauteren
            Wettbewerb) sowie den Richtlinien des IAB Europe und der EU-Richtlinie zur
            Verbrauchertransparenz.
          </p>
        </div>
      </div>
    </div>
  );
}
