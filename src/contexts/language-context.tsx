"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

type Language = "pt" | "en" | "fr"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("pt")

  useEffect(() => {
    const savedLang = localStorage.getItem("language") as Language
    if (savedLang) {
      setLanguageState(savedLang)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem("language", lang)
  }

  const t = (key: string): string => {
    return translations[language]?.[key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider")
  }
  return context
}

// Translations
const translations: Record<Language, Record<string, string>> = {
  pt: {
    // Navigation
    "nav.home": "Início",
    "nav.pricing": "Preços",
    "nav.docs": "Documentação",
    "nav.contact": "Contato",
    "nav.login": "Entrar",
    "nav.register": "Começar Grátis",
    
    // Hero Section
    "hero.badge": "Plataforma líder em gestão jurídica",
    "hero.title": "O futuro da gestão jurídica está aqui",
    "hero.subtitle": "Transforme seu escritório com a plataforma mais completa e intuitiva do mercado. Gestão de processos, clientes e finanças em um só lugar.",
    "hero.cta.primary": "Começar agora gratuitamente",
    "hero.cta.secondary": "Agendar demonstração",
    "hero.feature.no_card": "Sem cartão de crédito",
    "hero.feature.trial": "14 dias grátis",
    "hero.feature.cancel": "Cancele quando quiser",
    
    // Stats
    "stats.offices": "Escritórios ativos",
    "stats.cases": "Processos gerenciados",
    "stats.satisfaction": "Satisfação dos clientes",
    "stats.productivity": "Aumento de produtividade",
    
    // Features
    "features.badge": "Recursos",
    "features.title": "Tudo que você precisa em um só lugar",
    "features.subtitle": "Recursos poderosos para otimizar cada aspecto da sua prática jurídica",
    
    // Pricing
    "pricing.badge": "Preços",
    "pricing.title": "Planos para cada escritório",
    "pricing.subtitle": "Escolha o plano ideal para o seu negócio",
    "pricing.monthly": "Mensal",
    "pricing.semester": "Semestral",
    "pricing.annual": "Anual",
    "pricing.per_month": "/mês",
    "pricing.billed_monthly": "Faturado mensalmente",
    "pricing.billed_semester": "Faturado semestralmente",
    "pricing.billed_annual": "Faturado anualmente",
    "pricing.cta": "Começar agora",
    
    // Testimonials
    "testimonials.badge": "Depoimentos",
    "testimonials.title": "O que nossos clientes dizem",
    "testimonials.subtitle": "Escritórios de todo o Brasil confiam no Kamaia",
    
    // CTA
    "cta.title": "Pronto para transformar seu escritório?",
    "cta.subtitle": "Junte-se a centenas de escritórios que já modernizaram sua gestão jurídica",
    "cta.primary": "Começar teste gratuito",
    "cta.secondary": "Falar com vendas",
    
    // Footer
    "footer.product": "Produto",
    "footer.company": "Empresa",
    "footer.resources": "Recursos",
    "footer.legal": "Legal",
    "footer.newsletter": "Receba novidades",
    "footer.newsletter.placeholder": "seu@email.com",
    "footer.newsletter.cta": "Assinar",
    "footer.rights": "Todos os direitos reservados.",
  },
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.pricing": "Pricing",
    "nav.docs": "Documentation",
    "nav.contact": "Contact",
    "nav.login": "Sign In",
    "nav.register": "Get Started",
    
    // Hero Section
    "hero.badge": "Leading legal management platform",
    "hero.title": "The future of legal management is here",
    "hero.subtitle": "Transform your firm with the most complete and intuitive platform on the market. Process, client and financial management all in one place.",
    "hero.cta.primary": "Start now for free",
    "hero.cta.secondary": "Schedule demo",
    "hero.feature.no_card": "No credit card required",
    "hero.feature.trial": "14 days free",
    "hero.feature.cancel": "Cancel anytime",
    
    // Stats
    "stats.offices": "Active offices",
    "stats.cases": "Cases managed",
    "stats.satisfaction": "Customer satisfaction",
    "stats.productivity": "Productivity increase",
    
    // Features
    "features.badge": "Features",
    "features.title": "Everything you need in one place",
    "features.subtitle": "Powerful features to optimize every aspect of your legal practice",
    
    // Pricing
    "pricing.badge": "Pricing",
    "pricing.title": "Plans for every firm",
    "pricing.subtitle": "Choose the ideal plan for your business",
    "pricing.monthly": "Monthly",
    "pricing.semester": "Semester",
    "pricing.annual": "Annual",
    "pricing.per_month": "/month",
    "pricing.billed_monthly": "Billed monthly",
    "pricing.billed_semester": "Billed every six months",
    "pricing.billed_annual": "Billed annually",
    "pricing.cta": "Get started",
    
    // Testimonials
    "testimonials.badge": "Testimonials",
    "testimonials.title": "What our clients say",
    "testimonials.subtitle": "Law firms across Brazil trust Kamaia",
    
    // CTA
    "cta.title": "Ready to transform your firm?",
    "cta.subtitle": "Join hundreds of firms that have already modernized their legal management",
    "cta.primary": "Start free trial",
    "cta.secondary": "Talk to sales",
    
    // Footer
    "footer.product": "Product",
    "footer.company": "Company",
    "footer.resources": "Resources",
    "footer.legal": "Legal",
    "footer.newsletter": "Get updates",
    "footer.newsletter.placeholder": "your@email.com",
    "footer.newsletter.cta": "Subscribe",
    "footer.rights": "All rights reserved.",
  },
  fr: {
    // Navigation
    "nav.home": "Accueil",
    "nav.pricing": "Tarifs",
    "nav.docs": "Documentation",
    "nav.contact": "Contact",
    "nav.login": "Se connecter",
    "nav.register": "Commencer",
    
    // Hero Section
    "hero.badge": "Plateforme leader en gestion juridique",
    "hero.title": "L'avenir de la gestion juridique est ici",
    "hero.subtitle": "Transformez votre cabinet avec la plateforme la plus complète et intuitive du marché. Gestion des dossiers, clients et finances en un seul endroit.",
    "hero.cta.primary": "Commencer gratuitement",
    "hero.cta.secondary": "Planifier une démo",
    "hero.feature.no_card": "Sans carte de crédit",
    "hero.feature.trial": "14 jours gratuits",
    "hero.feature.cancel": "Annuler à tout moment",
    
    // Stats
    "stats.offices": "Cabinets actifs",
    "stats.cases": "Dossiers gérés",
    "stats.satisfaction": "Satisfaction client",
    "stats.productivity": "Augmentation de productivité",
    
    // Features
    "features.badge": "Fonctionnalités",
    "features.title": "Tout ce dont vous avez besoin en un seul endroit",
    "features.subtitle": "Des fonctionnalités puissantes pour optimiser chaque aspect de votre pratique juridique",
    
    // Pricing
    "pricing.badge": "Tarifs",
    "pricing.title": "Plans pour chaque cabinet",
    "pricing.subtitle": "Choisissez le plan idéal pour votre entreprise",
    "pricing.monthly": "Mensuel",
    "pricing.semester": "Semestriel",
    "pricing.annual": "Annuel",
    "pricing.per_month": "/mois",
    "pricing.billed_monthly": "Facturé mensuellement",
    "pricing.billed_semester": "Facturé semestriellement",
    "pricing.billed_annual": "Facturé annuellement",
    "pricing.cta": "Commencer",
    
    // Testimonials
    "testimonials.badge": "Témoignages",
    "testimonials.title": "Ce que disent nos clients",
    "testimonials.subtitle": "Des cabinets à travers le Brésil font confiance à Kamaia",
    
    // CTA
    "cta.title": "Prêt à transformer votre cabinet?",
    "cta.subtitle": "Rejoignez des centaines de cabinets qui ont déjà modernisé leur gestion juridique",
    "cta.primary": "Commencer l'essai gratuit",
    "cta.secondary": "Parler aux ventes",
    
    // Footer
    "footer.product": "Produit",
    "footer.company": "Entreprise",
    "footer.resources": "Ressources",
    "footer.legal": "Légal",
    "footer.newsletter": "Recevoir des nouvelles",
    "footer.newsletter.placeholder": "votre@email.com",
    "footer.newsletter.cta": "S'abonner",
    "footer.rights": "Tous droits réservés.",
  }
}
