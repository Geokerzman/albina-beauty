export type HomeBlock =
  | {
      blockType: "hero";
      id: string;
      eyebrow: string;
      title: string[];
      description: string;
      image: string;
    }
  | { blockType: "brands"; id: string; brands: string[] }
  | {
      blockType: "featuredTreatments";
      id: string;
      eyebrow: string;
      title: string;
      description: string;
      serviceSlugs: string[];
    }
  | {
      blockType: "studioStory";
      id: string;
      eyebrow: string;
      title: string;
      text: string;
      image: string;
      secondaryImage: string;
    }
  | { blockType: "philosophy"; id: string; eyebrow: string; title: string; text: string }
  | { blockType: "gallery"; id: string; eyebrow: string; title: string }
  | {
      blockType: "faq";
      id: string;
      eyebrow: string;
      title: string;
      items: { question: string; answer: string }[];
    }
  | { blockType: "invitation"; id: string };
export interface PageDocument {
  title: string;
  description: string;
  layout: HomeBlock[];
}
export const homePage: PageDocument = {
  title: "Beauty & Wellbeing in Köln Weiden",
  description:
    "Individuelle Kosmetik, HydraFacial, Laser-Haarentfernung, Maniküre, Massage und private Physiotherapie. Entdecken Sie Albina Beauty Concept in Köln Weiden.",
  layout: [
    {
      blockType: "hero",
      id: "willkommen",
      eyebrow: "Ihr Beauty-Retreat in Köln Weiden",
      title: ["Schönheit,", "die sich nach", "Ihnen anfühlt."],
      description:
        "Persönliche Hautpflege, achtsame Berührung und ein Moment, der nur Ihnen gehört. Willkommen bei Albina Beauty Concept.",
      image: "beauty-editorial.webp",
    },
    {
      blockType: "brands",
      id: "unsere-marken",
      brands: ["HydraFacial", "iS CLINICAL", "INMODE", "NOON", "EXOCEAN"],
    },
    {
      blockType: "featuredTreatments",
      id: "treatments",
      eyebrow: "Mit Sorgfalt für Sie ausgewählt",
      title: "Ihre Haut. Ihre Wünsche.\nIhr Beauty-Ritual.",
      description:
        "Von moderner Hautpflege bis zu kleinen Wohlfühlmomenten. Entdecken Sie, was Ihnen guttut.",
      serviceSlugs: [
        "kosmetische-behandlungen/hydrafacial",
        "laser-haarentfernung",
        "hand-und-fusspflege",
      ],
    },
    {
      blockType: "studioStory",
      id: "unser-studio",
      eyebrow: "Mehr als ein Beauty-Studio",
      title: "Ein Ort zum Ankommen.\nUnd um ganz bei sich\nzu sein.",
      text: "Schönheit ist für uns mehr als das, was man sieht. Sie beginnt dort, wo Sie sich wohlfühlen. Seit 2019 verbinden wir in Köln Weiden professionelle Kosmetik, Wellness und private Physiotherapie – mit Zeit, Erfahrung und echter Aufmerksamkeit.",
      image: "photo_2021-10-02_23-07-13-1024x1024.jpg",
      secondaryImage: "stuhl2.jpg",
    },
    {
      blockType: "philosophy",
      id: "unser-konzept",
      eyebrow: "Unser Beauty Concept",
      title: "Ganzheitlich.\nGanz persönlich.\nGanz Sie.",
      text: "Ihre Haut, Ihr Körper, Ihr Wohlbefinden. Wir betrachten das Ganze – und finden gemeinsam die Pflege, die zu Ihnen passt.",
    },
    {
      blockType: "gallery",
      id: "einblicke",
      eyebrow: "Ein kleiner Einblick",
      title: "Hier darf der Alltag\nkurz draußen bleiben.",
    },
    {
      blockType: "faq",
      id: "gut-zu-wissen",
      eyebrow: "Vor Ihrem Besuch",
      title: "Gut zu wissen.",
      items: [
        {
          question: "Welche Behandlung passt zu mir?",
          answer:
            "Das finden wir gemeinsam heraus. Vor Ihrer ersten Behandlung nehmen wir uns Zeit für Ihre Wünsche und Bedürfnisse. Sie können auch eine persönliche Beratung anfragen – Sie müssen sich noch nicht für ein Treatment entscheiden.",
        },
        {
          question: "Wie vereinbare ich einen Termin?",
          answer:
            "Nutzen Sie unsere Terminanfrage, um eine Nachricht für WhatsApp vorzubereiten. Sie können uns auch unter 02234 / 430 39 97 anrufen oder eine E-Mail schreiben. Gemeinsam finden wir einen passenden Termin.",
        },
        {
          question: "Wo finde ich Ihr Studio?",
          answer:
            "Sie finden Albina Beauty Concept am Frechener Weg 28, 50859 Köln, im Stadtteil Weiden. Auf unserer Kontaktseite können Sie Ihre Anfahrt über Google Maps planen.",
        },
        {
          question: "Bieten Sie auch Behandlungen für Männer an?",
          answer:
            "Ja. Unsere Kosmetik-, Massage- und Pflegeangebote richten sich nach individuellen Bedürfnissen. Im Angebot finden Sie auch Maniküre und Pediküre für Männer sowie private Physiotherapie.",
        },
      ],
    },
    { blockType: "invitation", id: "ihr-moment" },
  ],
};
export const specialRoutes = [
  "leistungen",
  "leistungen/kosmetische-behandlungen",
  "leistungen/wellness",
  "preisliste",
  "ueber-uns",
  "ueber-uns/team",
  "galerie",
  "kontakt",
  "karriere",
  "elementor-1142",
  "impressum",
  "datenschutzerklaerung",
  "cookie-richtlinie-eu",
  "category/uncategorized",
  "author/albinaletova_ho1055am",
  "shop",
  "termin-vereinbaren",
];
