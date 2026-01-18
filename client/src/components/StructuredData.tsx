import { Helmet } from 'react-helmet-async';

export function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Physician",
    "name": "Dra. Flávia Abreu",
    "image": "https://draflaviaabreu.com/images/flavia-profile-new.png",
    "@id": "https://draflaviaabreu.com",
    "url": "https://draflaviaabreu.com",
    "telephone": "+5511993905711",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Alphaville",
      "addressRegion": "SP",
      "addressCountry": "BR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -23.4969,
      "longitude": -46.8436
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "08:00",
      "closes": "18:00"
    },
    "sameAs": [
      "https://instagram.com/draflaviaabreu"
    ],
    "priceRange": "$$",
    "description": "Fisioterapia Dermatofuncional e Estética Integrativa com atendimento domiciliar em Alphaville e Barueri. Especialista em Lipedema, Pós-Operatório e Harmonização Corporal."
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
}
