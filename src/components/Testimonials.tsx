import { Star, Quote } from "lucide-react";
import { FadeInSection } from "../pages/Home";
import { useI18n } from "../i18n";
import type { Locale } from "../i18n";

interface Testimonial {
  name: string;
  role: string;
  content: string;
  rating: number;
}

const testimonialsByLocale: Record<
  Locale,
  {
    kicker: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    items: Testimonial[];
  }
> = {
  "pt-BR": {
    kicker: "Prova Social",
    title: "Histórias de",
    titleHighlight: "Amizade",
    subtitle:
      "Confira o que os tutores mais exigentes estão dizendo sobre nossos produtos naturais.",
    items: [
      {
        name: "Mariana Silva",
        role: "Tutora do Bento (Gato)",
        content:
          "A areia de lavanda mudou a rotina aqui em casa. O cheiro é delicioso e os torrões são muito fáceis de limpar.",
        rating: 5,
      },
      {
        name: "Ricardo Oliveira",
        role: "Tutor do Thor (Golden)",
        content:
          "O topper de frango resolveu o problema da falta de apetite. Agora ele devora a ração e está com mais vitalidade.",
        rating: 5,
      },
      {
        name: "Ana Claudia",
        role: "Canil Amigo Real",
        content:
          "Usamos os produtos Amigo Meu em nosso canil e a qualidade é inigualável. Sustentabilidade e eficiência andam juntas.",
        rating: 5,
      },
    ],
  },
  "en-US": {
    kicker: "Social Proof",
    title: "Stories of",
    titleHighlight: "Connection",
    subtitle:
      "See what demanding pet parents are saying about our natural products.",
    items: [
      {
        name: "Mariana Silva",
        role: "Bento's pet parent (Cat)",
        content:
          "The lavender litter changed our routine at home. The scent is pleasant and clumps are very easy to remove.",
        rating: 5,
      },
      {
        name: "Ricardo Oliveira",
        role: "Thor's pet parent (Golden)",
        content:
          "The chicken topper solved his low appetite. He now eats better and looks much more energetic.",
        rating: 5,
      },
      {
        name: "Ana Claudia",
        role: "Amigo Real Kennel",
        content:
          "We use Amigo Meu products in our kennel and the quality is outstanding. Sustainability and efficiency go together.",
        rating: 5,
      },
    ],
  },
  "es-ES": {
    kicker: "Prueba Social",
    title: "Historias de",
    titleHighlight: "Amistad",
    subtitle:
      "Mira lo que los tutores más exigentes dicen sobre nuestros productos naturales.",
    items: [
      {
        name: "Mariana Silva",
        role: "Tutora de Bento (Gato)",
        content:
          "La arena de lavanda cambió nuestra rutina. El aroma es agradable y los grumos son muy fáciles de retirar.",
        rating: 5,
      },
      {
        name: "Ricardo Oliveira",
        role: "Tutor de Thor (Golden)",
        content:
          "El topper de pollo resolvió su falta de apetito. Ahora come mejor y se ve con más energía.",
        rating: 5,
      },
      {
        name: "Ana Claudia",
        role: "Criadero Amigo Real",
        content:
          "Usamos los productos Amigo Meu en nuestro criadero y la calidad es excelente. Sostenibilidad y eficiencia van de la mano.",
        rating: 5,
      },
    ],
  },
};

export default function Testimonials() {
  const { locale } = useI18n();
  const copy = testimonialsByLocale[locale];

  return (
    <section className="section-padding bg-charcoal-50 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-50">
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-primary-100 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-10 w-64 h-64 bg-accent-100 rounded-full blur-[100px]" />
      </div>

      <div className="page-container relative z-10">
        <div className="text-center mb-20 space-y-6">
          <span className="section-kicker">{copy.kicker}</span>
          <h2 className="heading-lg text-charcoal-900">
            {copy.title}{" "}
            <span className="text-primary-500 italic font-light">
              {copy.titleHighlight}
            </span>
          </h2>
          <p className="text-body max-w-2xl mx-auto">{copy.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {copy.items.map((item, index) => (
            <FadeInSection key={index} delay={index * 200}>
              <div className="surface-card group hover:scale-[1.02]">
                <div className="absolute top-6 right-8 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Quote className="h-10 w-10 text-primary-500" />
                </div>

                <div className="flex gap-1 mb-6">
                  {[...Array(item.rating)].map((_, ratingIndex) => (
                    <Star
                      key={ratingIndex}
                      className="h-4 w-4 fill-primary-400 text-primary-400"
                    />
                  ))}
                </div>

                <p className="text-charcoal-600 font-light leading-relaxed italic mb-8 relative z-10">
                  "{item.content}"
                </p>

                <div className="flex items-center gap-4 border-t border-charcoal-100 pt-6">
                  <div className="h-10 w-10 rounded-full bg-primary-50 flex items-center justify-center text-primary-600 font-bold">
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-charcoal-900 text-sm tracking-wide">
                      {item.name}
                    </h4>
                    <p className="text-xs text-charcoal-400 uppercase tracking-widest mt-0.5">
                      {item.role}
                    </p>
                  </div>
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
}
