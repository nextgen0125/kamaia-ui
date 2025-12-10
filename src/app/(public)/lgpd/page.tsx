"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Shield } from "lucide-react"

export default function LGPDPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="py-20 border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="outline" className="mb-4">
              <Shield className="size-3.5 mr-1.5" />
              LGPD
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Conformidade com a LGPD
            </h1>
            <p className="text-muted-foreground">
              Como protegemos seus dados conforme a Lei Geral de Proteção de Dados
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card>
            <CardContent className="prose prose-slate dark:prose-invert max-w-none p-8">
              <h2>Nosso Compromisso com a LGPD</h2>
              <p>
                A Kamaia SaaS está totalmente comprometida com a conformidade à Lei Geral de Proteção de Dados 
                (Lei nº 13.709/2018). Entendemos a importância da privacidade e proteção de dados pessoais.
              </p>

              <h2>Bases Legais para Tratamento de Dados</h2>
              <p>Tratamos seus dados pessoais com base nas seguintes hipóteses legais:</p>
              <ul>
                <li><strong>Consentimento:</strong> Quando você nos autoriza expressamente</li>
                <li><strong>Execução de Contrato:</strong> Para fornecer nossos serviços</li>
                <li><strong>Legítimo Interesse:</strong> Para melhorar nossos produtos e serviços</li>
                <li><strong>Obrigação Legal:</strong> Para cumprir requisitos legais e regulatórios</li>
              </ul>

              <h2>Seus Direitos como Titular de Dados</h2>
              <p>De acordo com a LGPD, você tem os seguintes direitos:</p>
              <ul>
                <li>Confirmação da existência de tratamento</li>
                <li>Acesso aos dados</li>
                <li>Correção de dados incompletos, inexatos ou desatualizados</li>
                <li>Anonimização, bloqueio ou eliminação de dados desnecessários</li>
                <li>Portabilidade dos dados a outro fornecedor</li>
                <li>Eliminação dos dados tratados com consentimento</li>
                <li>Informação sobre compartilhamento de dados</li>
                <li>Informação sobre a possibilidade de não fornecer consentimento</li>
                <li>Revogação do consentimento</li>
              </ul>

              <h2>Como Exercer Seus Direitos</h2>
              <p>
                Para exercer qualquer um dos seus direitos, entre em contato com nosso Encarregado de Proteção 
                de Dados (DPO) através de:
              </p>
              <ul>
                <li>Email: dpo@kamaia.com</li>
                <li>Portal de Privacidade: disponível na plataforma</li>
              </ul>
              <p>
                Responderemos sua solicitação em até 15 dias, conforme estabelecido pela LGPD.
              </p>

              <h2>Medidas de Segurança</h2>
              <p>Implementamos medidas técnicas e administrativas robustas:</p>
              <ul>
                <li>Criptografia AES-256 em trânsito e em repouso</li>
                <li>Controles de acesso baseados em função (RBAC)</li>
                <li>Autenticação multifator (MFA)</li>
                <li>Monitoramento e auditoria contínuos</li>
                <li>Backups seguros e regulares</li>
                <li>Testes de segurança periódicos</li>
                <li>Treinamento regular da equipe em proteção de dados</li>
              </ul>

              <h2>Compartilhamento de Dados</h2>
              <p>
                Só compartilhamos seus dados quando necessário e sempre com garantias adequadas:
              </p>
              <ul>
                <li>Com prestadores de serviços sob contrato de processamento de dados</li>
                <li>Com autoridades quando exigido por lei</li>
                <li>Mediante seu consentimento expresso para outras finalidades</li>
              </ul>

              <h2>Retenção de Dados</h2>
              <p>
                Mantemos seus dados apenas pelo tempo necessário para:
              </p>
              <ul>
                <li>Fornecer os serviços contratados</li>
                <li>Cumprir obrigações legais (até 5 anos após término do contrato)</li>
                <li>Exercer direitos em processos judiciais</li>
              </ul>

              <h2>Transferência Internacional</h2>
              <p>
                Seus dados são armazenados em servidores no Brasil. Caso seja necessária transferência 
                internacional, garantimos:
              </p>
              <ul>
                <li>Adequação do país de destino aos padrões da LGPD</li>
                <li>Cláusulas contratuais padrão aprovadas</li>
                <li>Certificações internacionais de segurança</li>
              </ul>

              <h2>Incidentes de Segurança</h2>
              <p>
                Em caso de incidente de segurança que possa causar risco aos seus dados:
              </p>
              <ul>
                <li>Notificaremos você em prazo razoável</li>
                <li>Informaremos a Autoridade Nacional de Proteção de Dados (ANPD)</li>
                <li>Tomaremos medidas imediatas para mitigar os danos</li>
              </ul>

              <h2>Encarregado de Proteção de Dados (DPO)</h2>
              <p>
                Nosso DPO é responsável por:
              </p>
              <ul>
                <li>Garantir conformidade com a LGPD</li>
                <li>Atender solicitações de titulares</li>
                <li>Ser canal de comunicação com a ANPD</li>
                <li>Orientar colaboradores sobre proteção de dados</li>
              </ul>
              <p><strong>Contato:</strong> dpo@kamaia.com</p>

              <h2>Atualizações</h2>
              <p>
                Esta página pode ser atualizada periodicamente. A última atualização foi em 01 de janeiro de 2025.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
