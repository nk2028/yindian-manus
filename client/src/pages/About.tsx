import { useApp } from "@/contexts/AppContext";
import { getTranslation } from "@/lib/i18n";

export default function About() {
  const { language } = useApp();
  const t = getTranslation(language);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4 text-[#EB0000] pb-3 border-b-2 border-[#EB0000]">
          {t.about.title}
        </h1>

        <div className="bg-card p-6 shadow-sm">
          <div className="space-y-4 text-base leading-relaxed text-foreground">
            <p>
              {t.about.intro}
            </p>
            
            <p>
              {t.about.history}
            </p>

            <div>
              <h3 className="font-bold text-lg mb-2 text-foreground">{t.about.features}</h3>
              <ul className="list-disc list-inside space-y-1.5 ml-4">
                <li>{t.about.feature1}</li>
                <li>{t.about.feature2}</li>
                <li>{t.about.feature3}</li>
                <li>{t.about.feature4}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
