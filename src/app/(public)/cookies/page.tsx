"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Cookie } from "lucide-react"

export default function CookiesPage() {
  const cookieTypes = [
    {
      type: "Cookies Essenciais",
      description: "Necessários para o funcionamento básico do site",
      examples: ["Autenticação de sessão", "Preferências de idioma", "Segurança"],
      required: true
    },
    {
      type: "Cookies de Desempenho",
      description: "Ajudam a melhorar o desempenho do site",
      examples: ["Análise de tráfego", "Tempo de carregamento", "Erros técnicos"],
      required: false
    },
    {
      type: "Cookies Funcionais",
      description: "Permitem recursos avançados e personalização",
      examples: ["Preferências de usuário", "Chat ao vivo", "Vídeos incorporados"],
      required: false
    },
    {
      type: "Cookies de Marketing",
      description: "Usados para publicidade direcionada",
      examples: ["Rastreamento de conversões", "Remarketing", "Análise de campanhas"],
      required: false
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="outline" className="mb-4">
              <Cookie className="size-3.5 mr-1.5" />
              Cookies
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Política de Cookies
            </h1>
            <p className="text-muted-foreground">
              Última atualização: 01 de janeiro de 2025
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card className="mb-8">
            <CardContent className="prose prose-slate dark:prose-invert max-w-none p-8">
              <h2>O que são Cookies?</h2>
              <p>
                Cookies são pequenos arquivos de texto que são armazenados no seu dispositivo quando você visita um site. 
                Eles são amplamente utilizados para fazer os sites funcionarem de forma mais eficiente, bem como para 
                fornecer informações aos proprietários do site.
              </p>

              <h2>Como Usamos Cookies</h2>
              <p>
                Utilizamos cookies para:
              </p>
              <ul>
                <li>Manter você conectado à sua conta</li>
                <li>Lembrar suas preferências e configurações</li>
                <li>Entender como você usa nosso site</li>
                <li>Melhorar o desempenho e a funcionalidade</li>
                <li>Fornecer conteúdo personalizado</li>
                <li>Analisar tendências e dados de uso</li>
              </ul>
            </CardContent>
          </Card>

          <div className="space-y-6 mb-8">
            <h2 className="text-2xl font-bold">Tipos de Cookies que Utilizamos</h2>
            {cookieTypes.map((cookie, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{cookie.type}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-2">{cookie.description}</p>
                    </div>
                    {cookie.required && (
                      <Badge variant="secondary">Obrigatório</Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm font-medium mb-2">Exemplos:</p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    {cookie.examples.map((example, i) => (
                      <li key={i}>{example}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardContent className="prose prose-slate dark:prose-invert max-w-none p-8">
              <h2>Cookies de Terceiros</h2>
              <p>
                Alguns cookies são colocados por serviços de terceiros que aparecem em nossas páginas:
              </p>
              <ul>
                <li><strong>Google Analytics:</strong> Para análise de uso e desempenho</li>
                <li><strong>Stripe:</strong> Para processamento seguro de pagamentos</li>
                <li><strong>Intercom:</strong> Para suporte ao cliente via chat</li>
              </ul>

              <h2>Gerenciamento de Cookies</h2>
              <p>
                Você pode controlar e/ou deletar cookies como desejar. Você pode deletar todos os cookies que já estão 
                no seu computador e pode configurar a maioria dos navegadores para impedir que sejam colocados.
              </p>
              <p>
                <strong>Como gerenciar cookies no seu navegador:</strong>
              </p>
              <ul>
                <li><strong>Chrome:</strong> Configurações &gt; Privacidade e segurança &gt; Cookies</li>
                <li><strong>Firefox:</strong> Opções &gt; Privacidade e segurança &gt; Cookies</li>
                <li><strong>Safari:</strong> Preferências &gt; Privacidade &gt; Cookies</li>
                <li><strong>Edge:</strong> Configurações &gt; Cookies e permissões</li>
              </ul>
              <p>
                Observe que, se você desabilitar cookies, algumas funcionalidades do site podem não funcionar corretamente.
              </p>

              <h2>Duração dos Cookies</h2>
              <p>
                Usamos dois tipos de cookies:
              </p>
              <ul>
                <li><strong>Cookies de Sessão:</strong> Temporários e expiram quando você fecha o navegador</li>
                <li><strong>Cookies Persistentes:</strong> Permanecem no dispositivo por um período definido ou até serem deletados manualmente</li>
              </ul>

              <h2>Atualizações desta Política</h2>
              <p>
                Podemos atualizar esta Política de Cookies de tempos em tempos. Recomendamos que você revise esta página 
                periodicamente para se manter informado sobre como usamos cookies.
              </p>

              <h2>Contato</h2>
              <p>
                Se você tiver dúvidas sobre nossa Política de Cookies, entre em contato conosco:
              </p>
              <ul>
                <li>Email: privacy@kamaia.com</li>
                <li>Endereço: São Paulo, SP - Brasil</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
