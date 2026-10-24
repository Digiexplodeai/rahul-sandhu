import React from "react";

export default function DoctorSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Physician",
    name: "Lt Col (Dr) Rahul Sandhu",
    description:
      "Lt Col (Dr) Rahul Sandhu is an expert Surgical Oncologist with over 15 years of experience in clinical surgery, military medicine, and advanced cancer procedures. Former Armed Forces Surgical Specialist and Fellowship trained at Homi Bhabha Cancer Hospital & Research Centre (Tata Memorial Centre).",
    image: "https://drrahulsandhu.com/images/Dr-Rahul-Sandhu-original.jpeg",
    telephone: "+91-9888970519",
    email: "drsand.rahul@gmail.com",
    url: "https://drrahulsandhu.com",
    medicalSpecialty: [
      "Surgical Oncology",
      "Oncoplastic Breast Surgery",
      "Gastrointestinal Surgery",
      "Minimally Invasive Surgery",
    ],
    alumniOf: [
      {
        "@type": "EducationalOrganization",
        name: "Armed Forces Medical College (AFMC), Pune",
      },
      {
        "@type": "EducationalOrganization",
        name: "Indira Gandhi Medical College (IGMC), Shimla",
      },
      {
        "@type": "EducationalOrganization",
        name: "Homi Bhabha Cancer Hospital and Research Centre (HBCHRC), Punjab",
      },
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Mohali Stadium Rd, near PCA Stadium, Phase 9, Sector 63",
      addressLocality: "Sahibzada Ajit Singh Nagar, Mohali",
      addressRegion: "Punjab",
      postalCode: "160062",
      addressCountry: "IN",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "09:00",
        closes: "17:00",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
