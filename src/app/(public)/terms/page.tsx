"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { FileText } from "lucide-react"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="outline" className="mb-4">
              <FileText className="size-3.5 mr-1.5" />
              Legal
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Termos de Uso
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
          <Card>
            <CardContent className="prose prose-slate dark:prose-invert max-w-none p-8">
              <h2>1. Aceitação dos Termos</h2>
              <p>
                Ao acessar e usar a plataforma Kamaia, você concorda em cumprir e estar vinculado a estes Termos de Uso. 
                Se você não concorda com qualquer parte destes termos, não deve usar nossos serviços.
              </p>

              <h2>2. Descrição do Serviço</h2>
              <p>
                O Kamaia é uma plataforma SaaS (Software as a Service) que oferece soluções de gestão para escritórios 
                de advocacia e departamentos jurídicos, incluindo gestão de processos, clientes, documentos, finanças e outros recursos.
              </p>

              <h2>3. Registro e Conta</h2>
              <p>
                Para usar nossos serviços, você deve:
              </p>
              <ul>
                <li>Fornecer informações precisas e completas durante o registro</li>
                <li>Manter a confidencialidade de suas credenciais de acesso</li>
                <li>Notificar-nos imediatamente sobre qualquer uso não autorizado de sua conta</li>
                <li>Ser responsável por todas as atividades que ocorrem em sua conta</li>
              </ul>

              <h2>4. Uso Aceitável</h2>
              <p>
                Você concorda em NÃO:
              </p>
              <ul>
                <li>Usar o serviço para qualquer propósito ilegal ou não autorizado</li>
                <li>Tentar obter acesso não autorizado a qualquer parte do serviço</li>
                <li>Interferir ou interromper o serviço ou servidores conectados ao serviço</li>
                <li>Transmitir vírus, malware ou qualquer código malicioso</li>
                <li>Coletar ou armazenar dados pessoais de outros usuários sem permissão</li>
              </ul>

              <h2>5. Propriedade Intelectual</h2>
              <p>
                Todos os direitos de propriedade intelectual relacionados ao Kamaia, incluindo software, design, textos, 
                gráficos e marcas comerciais, são de propriedade exclusiva da Kamaia SaaS ou de seus licenciadores.
              </p>

              <h2>6. Seus Dados</h2>
              <p>
                Você mantém todos os direitos sobre os dados que carrega na plataforma. Concedemos a você uma licença 
                limitada para usar nosso serviço para armazenar e processar seus dados. Para mais informações, consulte 
                nossa Política de Privacidade.
              </p>

              <h2>7. Pagamentos e Assinaturas</h2>
              <p>
                Os planos pagos são cobrados antecipadamente de forma recorrente. Você pode cancelar sua assinatura a 
                qualquer momento, mas não oferecemos reembolsos proporcionais para cancelamentos no meio do período de cobrança.
              </p>

              <h2>8. Suspensão e Encerramento</h2>
              <p>
                Reservamos o direito de suspender ou encerrar sua conta se você violar estes Termos de Uso ou se 
                acreditarmos que seu uso do serviço pode causar danos à Kamaia ou outros usuários.
              </p>

              <h2>9. Limitação de Responsabilidade</h2>
              <p>
                O serviço é fornecido "como está" e "conforme disponível". Não garantimos que o serviço será ininterrupto, 
                seguro ou livre de erros. Em nenhuma circunstância seremos responsáveis por danos indiretos, incidentais, 
                especiais ou consequenciais.
              </p>

              <h2>10. Modificações dos Termos</h2>
              <p>
                Reservamos o direito de modificar estes termos a qualquer momento. Notificaremos você sobre mudanças 
                significativas por email ou através da plataforma. O uso continuado do serviço após as alterações 
                constitui aceitação dos novos termos.
              </p>

              <h2>11. Lei Aplicável</h2>
              <p>
                Estes termos são regidos pelas leis da República Federativa do Brasil. Qualquer disputa será resolvida 
                nos tribunais competentes de São Paulo, SP.
              </p>

              <h2>12. Contato</h2>
              <p>
                Para questões sobre estes Termos de Uso, entre em contato conosco em:
              </p>
              <ul>
                <li>Email: legal@kamaia.com</li>
                <li>Endereço: São Paulo, SP - Brasil</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
