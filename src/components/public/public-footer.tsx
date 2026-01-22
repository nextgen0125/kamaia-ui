"use client"

import { Logo } from "@/components/logo"
import Link from "next/link"
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useLanguage } from "@/contexts/language-context"

export function PublicFooter() {
  const { t } = useLanguage()
  const footerLinks = {
    product: [
      { name: "Recursos", href: "/#features" },
      { name: "Preços", href: "/pricing" },
      { name: "Segurança", href: "/security" },
      { name: "Roadmap", href: "/roadmap" },
    ],
    company: [
      { name: "Sobre Nós", href: "/about" },
      { name: "Blog", href: "/blog" },
      { name: "Carreiras", href: "/careers" },
      { name: "Imprensa", href: "/press" },
    ],
    resources: [
      { name: "Documentação", href: "/docs" },
      // { name: "API", href: "/docs/api" },
      { name: "Tutoriais", href: "/docs/tutorials" },
      { name: "FAQ", href: "/docs/faq" },
    ],
    legal: [
      { name: "Termos de Uso", href: "/terms" },
      { name: "Política de Privacidade", href: "/privacy" },
      { name: "Política de Cookies", href: "/cookies" },
      { name: "LGPD", href: "/lgpd" },
    ],
  }

  const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "#" },
    { name: "Twitter", icon: Twitter, href: "#" },
    { name: "LinkedIn", icon: Linkedin, href: "#" },
    { name: "Instagram", icon: Instagram, href: "#" },
  ]

  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12 md:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              {/* <div className="size-8 rounded-lg bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">K</span>
              </div> */}
              <Logo size={100} />
            </Link>
            <p className="text-sm text-muted-foreground mb-6 max-w-sm">
              {t('footer.description')}
            </p>
            
            {/* Newsletter */}
            <div className="space-y-2">
              <p className="text-sm font-medium">{t('footer.newsletter.title')}</p>
              <div className="flex gap-2">
                <Input 
                  type="email" 
                  placeholder={t('footer.newsletter.placeholder')}
                  className="h-9"
                />
                <Button size="sm">{t('footer.newsletter.button')}</Button>
              </div>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-semibold mb-4">{t('footer.product.title')}</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold mb-4">{t('footer.company.title')}</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="font-semibold mb-4">{t('footer.resources.title')}</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold mb-4">{t('footer.legal.title')}</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="mb-8" />

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="flex items-start gap-3">
            <Mail className="size-5 text-muted-foreground mt-0.5" />
            <div>
              <p className="text-sm font-medium">{t('footer.contact.email')}</p>
              <a 
                href="mailto:contato@kamaia.com" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                contato@kamaia.com
              </a>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Phone className="size-5 text-muted-foreground mt-0.5" />
            <div>
              <p className="text-sm font-medium">{t('footer.contact.phone')}</p>
              <a 
                href="tel:+5511999999999" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                +244 949 473 123
              </a>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MapPin className="size-5 text-muted-foreground mt-0.5" />
            <div>
              <p className="text-sm font-medium">{t('footer.contact.address')}</p>
              <p className="text-sm text-muted-foreground">
                Luanda, Angola
              </p>
            </div>
          </div>
        </div>

        <Separator className="mb-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            © {new Date().getFullYear()} Kamaia. {t('footer.copyright')}
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => {
              const Icon = social.icon
              return (
                <Link
                  key={social.name}
                  href={social.href}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={social.name}
                >
                  <Icon className="size-5" />
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </footer>
  )
}
