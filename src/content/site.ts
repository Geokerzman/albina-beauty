import importedPrices from "./prices.json";
export const site = {
  name: "Albina Beauty Concept",
  city: "Köln Weiden",
  address: "Frechener Weg 28",
  postal: "50859 Köln",
  phone: "02234 / 430 39 97",
  phoneHref: "tel:+4922344303997",
  mobile: "0172 / 377 11 77",
  mobileHref: "tel:+491723771177",
  email: "info@albina-beauty-concept.de",
  instagram: "https://www.instagram.com/albina.beautyconcept/",
  whatsapp: "https://wa.me/491723771177",
  whatsappSocial: "https://api.whatsapp.com/send?phone=+491723771177&text=Guten%20Tag!",
  facebook: "https://facebook.com/Albina-Letova-108039101026948/",
  headerMap: "https://goo.gl/maps/ApuZwNBpUu2y252m7",
  mapEmbed:
    "https://maps.google.com/maps?q=Frechener%20Weg%2028%2050859%20K%C3%B6ln&t=m&z=14&output=embed&iwloc=near",
  map: "https://www.google.com/maps/search/?api=1&query=Albina+Beauty+Concept+Frechener+Weg+28+50859+K%C3%B6ln",
};
export interface PriceItem {
  name: string;
  price: string;
  description: string;
  duration: string;
  treatment?: string;
}
export interface PriceGroup {
  id: string;
  title: string;
  items: PriceItem[];
}
export const priceGroups: PriceGroup[] = importedPrices;
export type Category = "Gesicht" | "Körper & Entspannung" | "Beauty Essentials" | "Physiotherapie";
export interface Service {
  slug: string;
  title: string;
  label?: string;
  category: Category;
  image: string;
  imageAlt: string;
  eyebrow: string;
  description: string;
  intro: string;
  benefits: string[];
  priceIds: string[];
  details: { title: string; text: string }[];
  duration: string;
  tag?: string;
}
export const services: Service[] = [
  {
    slug: "kosmetische-behandlungen/hydrafacial",
    title: "HydraFacial™",
    category: "Gesicht",
    image: "hydra.jpg",
    imageAlt: "HydraFacial-Behandlung im Albina Beauty Concept Studio",
    eyebrow: "Reinigen. Pflegen. Strahlen.",
    description:
      "Ihr Frischemoment für eine intensiv gereinigte und mit Feuchtigkeit versorgte Haut.",
    intro:
      "Tiefenreinigung, sanftes Peeling und intensive Hydration: HydraFacial verbindet mehrere Pflegeschritte in einer auf Ihre Haut abgestimmten Behandlung. Für ein frisches, gepflegtes Hautgefühl – und einen Moment ganz für Sie.",
    benefits: ["Intensive Feuchtigkeit", "Verfeinertes Hautgefühl", "Individuelle Pflege"],
    priceIds: ["hydrafacial"],
    duration: "60–90 Min.",
    tag: "Signature Treatment",
    details: [
      {
        title: "Vier Schritte. Ein gutes Hautgefühl.",
        text: "Zunächst werden abgestorbene Hautzellen sanft abgetragen. Ein Säurepeeling bereitet die Haut auf die Ausreinigung vor. Anschließend werden die Poren gereinigt und die Haut mit abgestimmten Pflegestoffen und Feuchtigkeit versorgt.",
      },
      {
        title: "So individuell wie Ihre Haut",
        text: "Ob Classic, die Kombination mit Fire & Ice oder ein ergänzendes Treatment: Gemeinsam finden wir eine passende Anwendung. Vor der Behandlung besprechen wir Ihre Hautbedürfnisse und die geeignete Pflege.",
      },
    ],
  },
  {
    slug: "forma-new-by-inmode",
    title: "FORMA by InMode",
    category: "Gesicht",
    image: "forma.jpg",
    imageAlt: "Radiofrequenz-Gesichtsbehandlung mit FORMA",
    eyebrow: "Sanfte Wärme. Neue Spannkraft.",
    description:
      "Radiofrequenz für eine auf Ihre Haut abgestimmte Pflege von Gesicht, Hals und Dekolleté.",
    intro:
      "FORMA arbeitet mit kontrollierter Radiofrequenzwärme. Die Anwendung wird auf die gewählte Region abgestimmt und durch eine integrierte Temperaturkontrolle begleitet. Wir beraten Sie persönlich zu Möglichkeiten, Ablauf und passenden Behandlungsabständen.",
    benefits: ["Kontrollierte Wärme", "Gesicht, Hals & Dekolleté", "Persönliche Beratung"],
    priceIds: ["forma-by-inmode"],
    duration: "60–120 Min.",
    details: [
      {
        title: "Kontrolliert und individuell",
        text: "Ein integrierter Sensor misst die Hauttemperatur während der Anwendung. Die Energie wird reguliert, sobald die eingestellte Temperatur erreicht ist. Vorab besprechen wir Ihre Wünsche und die Eignung der Behandlung.",
      },
      {
        title: "Einzelbehandlung oder Behandlungsplan",
        text: "Sie können einzelne Regionen, das gesamte Gesicht oder Gesicht mit Hals und Dekolleté wählen. Für eine Behandlungskur stimmen wir die Termine individuell mit Ihnen ab.",
      },
    ],
  },
  {
    slug: "microneedling",
    title: "Microneedling",
    category: "Gesicht",
    image: "micrro.jpg",
    imageAlt: "Professionelle Microneedling-Behandlung",
    eyebrow: "Neue Impulse für Ihre Haut.",
    description: "Gezielte Hautpflege mit feinen Nadeln, persönlich auf Ihr Hautbild abgestimmt.",
    intro:
      "Microneedling setzt durch feine, kontrollierte Mikroimpulse einen Reiz für die natürliche Hautregeneration. Wir stimmen die Anwendung auf Ihr Hautbild und Ihre Pflegeziele ab und nehmen uns Zeit für die Beratung zur Vor- und Nachpflege.",
    benefits: ["Individuelle Hautanalyse", "Gezielte Anwendung", "Begleitende Pflegeberatung"],
    priceIds: ["medizinische-microneedling"],
    duration: "60–90 Min.",
    details: [
      {
        title: "Für welche Hautbedürfnisse?",
        text: "Microneedling kann bei dem Wunsch nach einem ebenmäßigeren Hautbild, bei feinen Linien und bei unregelmäßiger Hautstruktur besprochen werden. Ob die Behandlung für Ihre Haut geeignet ist, klären wir im persönlichen Gespräch.",
      },
      {
        title: "Vorbereitung und Nachpflege",
        text: "Zum Termin besprechen wir Ihre aktuelle Pflegeroutine. Nach der Behandlung erhalten Sie Empfehlungen zur schonenden Pflege und zum Sonnenschutz. Behandlungsabstände richten sich nach Ihrer Haut und dem gewählten Plan.",
      },
    ],
  },
  {
    slug: "noon-skin",
    title: "NOON Skin Treatments",
    label: "NOON Skin",
    category: "Gesicht",
    image: "noon.jpg",
    imageAlt: "NOON Pflegeprodukte im Studio",
    eyebrow: "Ihre Haut. Ihr Treatment.",
    description:
      "Gezielte Pflegeprogramme für unterschiedliche Hautbedürfnisse – von Glow bis Barriereschutz.",
    intro:
      "NOON verbindet professionelle Pflege mit individuell ausgewählten Behandlungsprogrammen. Ob ein kurzer Frischemoment oder ein intensiveres Pflegeritual: Wir wählen gemeinsam die Anwendung, die zu Ihrer Haut passt.",
    benefits: [
      "Bedürfnisorientierte Pflege",
      "Sechs Treatment-Varianten",
      "Persönliche Hautberatung",
    ],
    priceIds: ["noon"],
    duration: "45–75 Min.",
    tag: "Neu entdecken",
    details: [
      {
        title: "Pflege mit einem klaren Fokus",
        text: "Express Glow bietet einen kurzen Pflegemoment. Acne, Rosacea, Even Tone und Sun Repair sind auf unterschiedliche Hautbedürfnisse ausgerichtet. Wir beraten Sie zu einer geeigneten Auswahl, ohne eine medizinische Diagnose zu ersetzen.",
      },
      {
        title: "NOON & Microneedling",
        text: "Für einen intensiveren Pflegeplan kann NOON mit Microneedling kombiniert werden. Ablauf und Eignung werden vor dem Termin persönlich mit Ihnen abgestimmt.",
      },
    ],
  },
  {
    slug: "exosome",
    title: "EXOSOME",
    category: "Gesicht",
    image: "29847d2e9d68d-1.png",
    imageAlt: "EXOCEAN Hautpflege für professionelle Anwendungen",
    eyebrow: "Pflege, die weiterdenkt.",
    description:
      "Microneedling mit EXOCEAN – für einen individuell abgestimmten Pflegeplan für Haut und Kopfhaut.",
    intro:
      "Bei dieser Anwendung kombinieren wir Microneedling mit EXOCEAN Pflegeprodukten. Die Behandlung kann für Gesicht, Hals und Dekolleté oder für die Kopfhaut angefragt werden. Im Beratungsgespräch klären wir die passende Anwendung und Ihre Erwartungen.",
    benefits: ["Haut & Kopfhaut", "Kombinierbare Treatments", "Individuelle Beratung"],
    priceIds: ["exosome"],
    duration: "60–90 Min.",
    details: [
      {
        title: "Eine individuell abgestimmte Kombination",
        text: "Zunächst wird die Haut beziehungsweise Kopfhaut auf die Anwendung vorbereitet. Die weiteren Pflegeschritte werden auf die gewählte Region und Ihre Hautbedürfnisse abgestimmt.",
      },
      {
        title: "Gesicht, Hals oder Kopfhaut",
        text: "Neben der Einzelanwendung stehen Kombinationen mit HydraFacial oder NOON zur Auswahl. Wir erläutern Ihnen die Unterschiede und stellen mit Ihnen einen passenden Pflegeplan zusammen.",
      },
    ],
  },
  {
    slug: "is-clinical-behandlung",
    title: "iS Clinical",
    category: "Gesicht",
    image: "is-clinical.jpg",
    imageAlt: "iS Clinical Premium-Pflegeprodukte",
    eyebrow: "Ein besonderes Pflegeritual.",
    description:
      "Fire & Ice und Foaming Enzyme: professionelle Gesichtsbehandlungen mit iS Clinical.",
    intro:
      "Professionelle Pflege und ein besonderer Wohlfühlmoment: Unsere iS Clinical Treatments werden auf Ihre Hautbedürfnisse abgestimmt. Entdecken Sie die unterschiedlichen Pflegerituale und lassen Sie sich von uns beraten.",
    benefits: ["Professionelle Pflege", "Zwei besondere Rituale", "Abgestimmte Abschlusspflege"],
    priceIds: ["is-clinical-kosmetikbehandlungen"],
    duration: "Ab 45 Min.",
    details: [
      {
        title: "Fire & Ice Facial",
        text: "Zwei aufeinander abgestimmte Masken bilden den Kern dieser Behandlung. Auf die wärmende Anwendung folgt eine kühlende, beruhigende Pflege. Gemeinsam besprechen wir die Eignung für Ihre Haut.",
      },
      {
        title: "Foaming Enzyme Treatment",
        text: "Auch als Champagner Facial bekannt: Ein Aktivschaum und eine abgestimmte Pflege machen dieses Treatment zu einem besonderen Moment für Ihre Haut.",
      },
    ],
  },
  {
    slug: "klassische-gesichtsbehandlung",
    title: "Klassische Gesichtsbehandlung",
    label: "Klassische Gesichtspflege",
    category: "Gesicht",
    image: "clinical.jpg",
    imageAlt: "Individuelle Gesichtsreinigung und Hautpflege",
    eyebrow: "Die Basis schöner Hautpflege.",
    description: "Reinigung, Peeling und Pflege – mit Zeit für Sie und die Bedürfnisse Ihrer Haut.",
    intro:
      "Eine gründliche Reinigung, ein sanftes Peeling und eine auf Ihren Hauttyp abgestimmte Pflege bilden die Grundlage unseres klassischen Treatments. Wir verbinden professionelle Anwendung mit einer entspannten Auszeit.",
    benefits: ["Gründliche Reinigung", "Abgestimmte Pflege", "Entspannender Abschluss"],
    priceIds: ["is-clinical-kosmetikbehandlungen", "klassische-gesichtspflege"],
    duration: "Nach Behandlung",
    details: [
      {
        title: "Ein Ritual, das zu Ihnen passt",
        text: "Je nach Hautbedürfnis umfasst die Behandlung Reinigung, Peeling, Ausreinigung, Maske und Abschlusspflege. Vorab nehmen wir uns Zeit, um den passenden Ablauf zu besprechen.",
      },
    ],
  },
  {
    slug: "laser-haarentfernung",
    title: "Laser-Haarentfernung",
    category: "Beauty Essentials",
    image: "laser2.jpg",
    imageAlt: "Laser-Haarentfernung mit DIOLAZE InMode im Studio",
    eyebrow: "Weniger Routine. Mehr Leichtigkeit.",
    description:
      "Professionelle Haarentfernung mit DIOLAZE by InMode, abgestimmt auf Ihre Haut und die gewünschte Zone.",
    intro:
      "Mit DIOLAZE by InMode bieten wir Ihnen eine moderne Möglichkeit zur langfristigen Haarreduktion. Vor Ihrer ersten Anwendung besprechen wir Hauttyp, Haarstruktur und die passende Behandlung – ganz in Ruhe und persönlich.",
    benefits: ["Persönliche Erstberatung", "Einzelzonen & Pakete", "Integrierte Kühlung"],
    priceIds: ["laser-haarentfernung", "laser-einzelzonen"],
    duration: "60–75 Min.",
    details: [
      {
        title: "Ihre Behandlung beginnt mit Beratung",
        text: "Die Eignung hängt unter anderem von Haar- und Hautmerkmalen ab. Im Gespräch erklären wir Ihnen den Ablauf, mögliche Behandlungsabstände und was vor und nach dem Termin zu beachten ist.",
      },
      {
        title: "Ihre Zone. Ihr Behandlungsplan.",
        text: "Von Achseln und Oberlippe bis zu Beinen und Rücken: Neben Einzelzonen stehen kombinierte Pakete zur Verfügung. Gerne erstellen wir einen Plan für die von Ihnen gewünschten Bereiche.",
      },
    ],
  },
  {
    slug: "hand-und-fusspflege",
    title: "Hand- & Fußpflege",
    category: "Beauty Essentials",
    image: "mani.jpg",
    imageAlt: "Professionelle Maniküre bei Albina Beauty Concept",
    eyebrow: "Schöne Details. Jeden Tag.",
    description:
      "Sorgfältige Maniküre und Pediküre – von natürlich gepflegt bis zu Ihrem persönlichen Nail Design.",
    intro:
      "Gepflegte Hände und Füße sind kleine Details mit großer Wirkung. Ob klassische Maniküre, Gellack, eine Modellage oder wohltuende Pediküre: Wir nehmen uns Zeit für eine präzise Anwendung und Ihre individuellen Wünsche.",
    benefits: ["Maniküre & Pediküre", "Natürliche Looks & Design", "Präzise Handarbeit"],
    priceIds: ["manik-re", "pedik-re"],
    duration: "60–150 Min.",
    details: [
      {
        title: "Maniküre mit Persönlichkeit",
        text: "Wählen Sie klassische Pflege, Lack, Gellack oder Gelmodellage. Von dezenten Naturtönen bis zu French und individuellen Designs beraten wir Sie zu Form, Farbe und Pflege.",
      },
      {
        title: "Zeit für Ihre Füße",
        text: "Unsere Pediküre verbindet sorgfältige Pflege mit einem entspannten Moment. Auf Wunsch ergänzen Lack oder Gellack Ihre Behandlung. Maniküre und Pediküre bieten wir auch für Männer an.",
      },
    ],
  },
  {
    slug: "augenbrauen-wimpern",
    title: "Brows & Lashes",
    label: "Augenbrauen & Wimpern",
    category: "Beauty Essentials",
    image: "wimpern1.jpg",
    imageAlt: "Augenbrauen-Styling und Wimpernpflege",
    eyebrow: "Ein Blick. Ganz Sie.",
    description:
      "Form, Farbe und Schwung – für Augenbrauen und Wimpern, die Ihren Ausdruck unterstreichen.",
    intro:
      "Von der feinen Korrektur über Brow- und Lashlifting bis zur Wimpernverlängerung: Wir gestalten Ihre Behandlung passend zu Ihren natürlichen Proportionen und Ihrem gewünschten Look.",
    benefits: ["Individuelle Formberatung", "Brow- & Lashlifting", "Wimpernverlängerung"],
    priceIds: ["augenbrauen", "wimpern", "wimpernverl-ngerung"],
    duration: "20–75 Min.",
    details: [
      {
        title: "Augenbrauen in Balance",
        text: "Korrektur, Färben oder Lifting: Wir unterstreichen Ihre natürliche Brauenform und stimmen Farbe und Styling gemeinsam mit Ihnen ab.",
      },
      {
        title: "Ihr persönlicher Wimpern-Look",
        text: "Lashlifting betont die eigenen Wimpern. Bei der Verlängerung können Sie zwischen Classic 1:1, 2D–3D und 4D–5D wählen. Auffülltermine stimmen wir nach Bedarf mit Ihnen ab.",
      },
    ],
  },
  {
    slug: "body-fx-by-inmode",
    title: "BodyFX by InMode",
    category: "Körper & Entspannung",
    image: "body.jpg",
    imageAlt: "BodyFX-Anwendung zur Körperpflege",
    eyebrow: "Körperpflege mit Konzept.",
    description:
      "Apparative Körperbehandlungen mit Radiofrequenz, persönlich geplant und begleitet.",
    intro:
      "BodyFX verbindet Radiofrequenz mit einer auf die gewählte Körperregion abgestimmten Anwendung. Gemeinsam sprechen wir über Ihre Wünsche, mögliche Behandlungsbereiche und einen realistischen, individuellen Plan.",
    benefits: [
      "Gezielte Körperregionen",
      "Individueller Behandlungsplan",
      "Einzeltermine & Pakete",
    ],
    priceIds: ["body-fx"],
    duration: "60 Min.",
    details: [
      {
        title: "Ein Konzept für Ihre Wünsche",
        text: "Mögliche Regionen sind Bauch, Hüften, Oberschenkel, Gesäß, Oberarme und Knie. Wir beraten Sie persönlich zur Eignung und zum gewünschten Behandlungsumfang.",
      },
      {
        title: "Gut begleitet",
        text: "Sie können einen Einzeltermin oder ein Paket mit drei beziehungsweise sechs Behandlungen wählen. Ablauf und Abstände werden gemeinsam festgelegt.",
      },
    ],
  },
  {
    slug: "massage",
    title: "Massage & Entspannung",
    label: "Massagen",
    category: "Körper & Entspannung",
    image: "massage.jpg",
    imageAlt: "Entspannende Massage im Albina Beauty Studio",
    eyebrow: "Ankommen. Loslassen. Aufatmen.",
    description: "Wohltuende Berührung und achtsame Ruhe – Ihre persönliche Auszeit vom Alltag.",
    intro:
      "Manchmal braucht es einen Moment, in dem nichts muss. Unsere Massagen werden auf Ihr Befinden und Ihre Wünsche abgestimmt. Von sanften, fließenden Bewegungen bis zur gezielten Rücken-, Schulter- und Nackenmassage finden wir gemeinsam Ihre passende Auszeit.",
    benefits: ["Individuelle Intensität", "Ruhe für Körper & Geist", "Zeit ganz für Sie"],
    priceIds: ["wellness"],
    duration: "30–80 Min.",
    details: [
      {
        title: "Unsere Massagerituale",
        text: "Entspannungsmassage, Rücken-, Schulter- und Nackenmassage sowie Lymphdrainage gehören zu unserem Angebot. Sprechen Sie uns auch auf Gesichts-, Körper-Korrektur- und Anti-Cellulite-Massagen an.",
      },
      {
        title: "Ihr Moment der Ruhe",
        text: "Teilen Sie uns vor dem Termin mit, welche Körperbereiche im Mittelpunkt stehen sollen und welche Intensität Sie bevorzugen. Wir stimmen Ihre Behandlung individuell ab.",
      },
    ],
  },
  {
    slug: "private-physiotherapie",
    title: "Private Physiotherapie",
    category: "Physiotherapie",
    image: "photo_2021-10-02_23-02-47-1024x739.jpg",
    imageAlt: "Heller Physiotherapie-Behandlungsraum der Albina Beauty Concept Praxis",
    eyebrow: "Bewegung. Balance. Wohlbefinden.",
    description:
      "Persönliche physiotherapeutische Begleitung in ruhiger Atmosphäre – auch als Hausbesuch.",
    intro:
      "Beweglichkeit und ein gutes Körpergefühl sind ein Teil unseres ganzheitlichen Konzepts. Albina verbindet ihre Ausbildung als Physiotherapeutin mit individueller Aufmerksamkeit. Wir beraten Sie zu unserem privaten Therapieangebot und dem passenden Ablauf.",
    benefits: ["Persönliche Betreuung", "Vielfältige Therapiemethoden", "Hausbesuche möglich"],
    priceIds: ["private-physiotherapie"],
    duration: "30–60 Min.",
    details: [
      {
        title: "Unsere Therapiemethoden",
        text: "Krankengymnastik, manuelle Therapie, manuelle Lymphdrainage, Therapie nach dem Bobath-Konzept, CMD-Therapie, Triggerpunktbehandlung und Kinesiotape gehören zu unserem Angebot.",
      },
      {
        title: "Auch bei Ihnen zu Hause",
        text: "Wenn Sie nicht in die Praxis kommen können, besprechen wir gerne einen Hausbesuch. Bitte klären Sie bei der Terminvereinbarung mit uns, welche Unterlagen und Verordnungen für Ihre Behandlung erforderlich sind.",
      },
    ],
  },
];
export const serviceHref = (s: Service) => `/leistungen/${s.slug}/`;
export const categoryDescriptions: Record<Category, string> = {
  Gesicht:
    "Hautpflege, die bei Ihnen beginnt. Von einem frischen Glow bis zum individuellen Behandlungskonzept.",
  "Körper & Entspannung":
    "Loslassen und bei sich ankommen. Achtsame Anwendungen für Körper und Wohlbefinden.",
  "Beauty Essentials":
    "Kleine Details, ein besonderes Gefühl. Präzise Pflege für Ihren persönlichen Ausdruck.",
  Physiotherapie: "Individuelle Begleitung für Bewegung, Balance und ein gutes Körpergefühl.",
};
export const team = [
  {
    name: "Albina",
    role: "Inhaberin · Physiotherapeutin & Kosmetikerin",
    image: "albina.jpg",
    bio: "Ich liebe es, meine zwei Berufe zu vereinen und meine Kunden aus dem hektischen Alltag zu entführen, um ihnen Momente der Entspannung zu schenken.",
    detail:
      "2008 schloss ich meine Ausbildung zur Physiotherapeutin ab. Zu meinen Schwerpunkten gehören neurologische Behandlungen und manuelle Lymphdrainage. 2018 folgte die Ausbildung zur Kosmetikerin. Seit 2019 verbinde ich beides in meinem eigenen Studio.",
  },
  {
    name: "Alina",
    role: "Salonmanagerin",
    image: "alina.jpg",
    bio: "Ich möchte, dass Sie sich von Anfang bis Ende bestens betreut fühlen.",
    detail:
      "Ob bei der Terminbuchung, bei Fragen zu unseren Behandlungen oder zur Begrüßung im Studio: Ich bin gerne für Sie da und gestalte Ihren Besuch so angenehm wie möglich.",
  },
  {
    name: "Evgenia",
    role: "Nageldesignerin",
    image: "evgenija.jpg",
    bio: "Stilvoll, präzise und ganz auf Ihre Wünsche abgestimmt.",
    detail:
      "Seit 2022 bin ich als Maniküre-Meisterin tätig. Mein Angebot umfasst klassische Lackierungen, kreative Designs und professionelle Nagelverstärkungen. Ästhetik, Sorgfalt und die Gesundheit der Nägel stehen dabei im Mittelpunkt.",
  },
  {
    name: "Dominika",
    role: "Beauty Team",
    image: "elvira.jpg",
    bio: "Individuelle Aufmerksamkeit und eine Pflege, die zu Ihnen passt.",
    detail:
      "Ich nehme mir Zeit für jede Kundin, analysiere den Hautzustand und wähle Behandlungen und Pflege passend zu den persönlichen Bedürfnissen aus. Mein Ziel ist es, dass Sie sich in Ihrer Haut wohl, gepflegt und schön fühlen.",
  },
  {
    name: "Irina",
    role: "Nageldesignerin",
    image: "irina2.jpg",
    bio: "Gepflegte, natürliche Looks und Liebe zum Detail.",
    detail:
      "Als ausgebildete Maniküre-Meisterin biete ich seit 2022 professionelle Nagelbehandlungen an. Mein Fokus liegt auf sauberen Arbeitstechniken, harmonischen Formen und einer typgerechten Gestaltung – von natürlichen Looks bis zu aufwendigen Designs.",
  },
];
export const gallery = Array.from({ length: 11 }, (_, i) => ({
  src: `/images/Gallerie${i === 10 ? "" : 11 - i}.jpeg`,
  alt: [
    "Farbberatung für eine individuelle Maniküre",
    "Wohltuende Rückenmassage",
    "Pflegeöl für ein Massageritual",
    "Maniküreplätze in unserem Studio",
    "Massage in ruhiger Atmosphäre",
    "Professionelle Hautbehandlung",
    "Individuelle Pflege mit moderner Technik",
    "Behandlungsgerät im Studio",
    "Professionelle Pflegeprodukte",
    "Gemütlicher Pedikürebereich",
    "DIOLAZE-Anwendung im Studio",
  ][i],
}));
export const jobs = [
  {
    title: "Masseur/in",
    type: "Minijob · Teilzeit · Vollzeit",
    tasks: [
      "Professionelle Massagen im Wellness- und Präventionsbereich",
      "Individuelle Anpassung an die Wünsche unserer Gäste",
      "Beratung und Zusammenarbeit mit dem Beauty Team",
    ],
    profile:
      "Abgeschlossene Ausbildung als Masseur/in oder Physiotherapeut/in, fundierte Fachkenntnisse und eine achtsame, selbstständige Arbeitsweise.",
  },
  {
    title: "Nageldesigner/in",
    type: "Minijob · Teilzeit · Vollzeit",
    tasks: [
      "Maniküre, Pediküre und Nagelmodellage",
      "French, Babyboomer und kreative Nail Art",
      "Persönliche Beratung zu Pflege, Form und Farbe",
    ],
    profile:
      "Ausbildung oder mehrjährige Erfahrung im Nageldesign, präzise Arbeitsweise, Kreativität und Freude am Umgang mit Menschen.",
  },
  {
    title: "Brow & Lash Artist",
    type: "Minijob",
    tasks: [
      "Augenbrauenkorrektur, Färben und Browlifting",
      "Lashlifting und individuelle Stylingberatung",
      "Sorgfältige Vor- und Nachbereitung der Behandlungen",
    ],
    profile:
      "Erfahrung im Brow- und Lash-Styling, ein Gespür für natürliche Proportionen und eine zuverlässige, hygienische Arbeitsweise.",
  },
  {
    title: "Kosmetiker/in",
    type: "Minijob · Teilzeit",
    tasks: [
      "Gesichtsbehandlungen und persönliche Hautanalysen",
      "HydraFacial und professionelle Pflegeberatung",
      "Individuelle Behandlungskonzepte und Produktempfehlungen",
    ],
    profile:
      "Abgeschlossene Ausbildung, Begeisterung für Hautpflege und apparative Kosmetik sowie ein freundliches und professionelles Auftreten.",
  },
];
