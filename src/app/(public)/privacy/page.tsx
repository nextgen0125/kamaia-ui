"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Shield } from "lucide-react"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="outline" className="mb-4">
              <Shield className="size-3.5 mr-1.5" />
              Privacidade
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Política de Privacidade
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
              <h2>1. Introdução</h2>
              <p>
                A Kamaia SaaS está comprometida em proteger sua privacidade. Esta Política de Privacidade explica como 
                coletamos, usamos, divulgamos e protegemos suas informações pessoais em conformidade com a Lei Geral de 
                Proteção de Dados (LGPD) e outras regulamentações aplicáveis.
              </p>

              <h2>2. Informações que Coletamos</h2>
              
              <h3>2.1 Informações Fornecidas por Você</h3>
              <ul>
                <li>Dados de cadastro: nome, email, telefone, CPF/CNPJ</li>
                <li>Dados de pagamento: informações de cartão de crédito (processadas por terceiros seguros)</li>
                <li>Dados de uso: informações sobre processos, clientes e documentos que você gerencia na plataforma</li>
                <li>Comunicações: conteúdo de mensagens enviadas para nosso suporte</li>
              </ul>

              <h3>2.2 Informações Coletadas Automaticamente</h3>
              <ul>
                <li>Dados de log: endereço IP, tipo de navegador, páginas visitadas</li>
                <li>Cookies e tecnologias similares</li>
                <li>Informações de dispositivo: sistema operacional, versão do aplicativo</li>
              </ul>

              <h2>3. Como Usamos Suas Informações</h2>
              <p>
                Utilizamos suas informações para:
              </p>
              <ul>
                <li>Fornecer, manter e melhorar nossos serviços</li>
                <li>Processar transações e enviar notificações relacionadas</li>
                <li>Responder a suas solicitações e fornecer suporte ao cliente</li>
                <li>Enviar atualizações sobre produtos, novos recursos e ofertas</li>
                <li>Detectar, prevenir e resolver problemas técnicos ou de segurança</li>
                <li>Cumprir obrigações legais e regulatórias</li>
              </ul>

              <h2>4. Compartilhamento de Informações</h2>
              <p>
                Não vendemos suas informações pessoais. Podemos compartilhar suas informações com:
              </p>
              <ul>
                <li>Provedores de serviços que nos auxiliam em operações comerciais</li>
                <li>Autoridades legais quando exigido por lei</li>
                <li>Em caso de fusão, aquisição ou venda de ativos</li>
              </ul>

              <h2>5. Segurança dos Dados</h2>
              <p>
                Implementamos medidas de segurança técnicas e organizacionais para proteger suas informações:
              </p>
              <ul>
                <li>Criptografia AES-256 para dados em trânsito e em repouso</li>
                <li>Autenticação multifator (MFA)</li>
                <li>Backups regulares e seguros</li>
                <li>Monitoramento contínuo de segurança</li>
                <li>Conformidade com ISO 27001</li>
              </ul>

              <h2>6. Seus Direitos (LGPD)</h2>
              <p>
                De acordo com a LGPD, você tem direito a:
              </p>
              <ul>
                <li>Confirmar se tratamos seus dados pessoais</li>
                <li>Acessar seus dados</li>
                <li>Corrigir dados incompletos, inexatos ou desatualizados</li>
                <li>Solicitar a anonimização, bloqueio ou eliminação de dados</li>
                <li>Solicitar a portabilidade de dados</li>
                <li>Revogar consentimento</li>
                <li>Opor-se ao tratamento de dados</li>
              </ul>

              <h2>7. Retenção de Dados</h2>
              <p>
                Mantemos suas informações pelo tempo necessário para fornecer nossos serviços e cumprir obrigações legais. 
                Após o encerramento da conta, seus dados são retidos por um período de até 5 anos para fins de backup e 
                conformidade legal.
              </p>

              <h2>8. Cookies</h2>
              <p>
                Utilizamos cookies para melhorar sua experiência. Você pode gerenciar preferências de cookies nas 
                configurações do navegador. Para mais informações, consulte nossa Política de Cookies.
              </p>

              <h2>9. Transferência Internacional de Dados</h2>
              <p>
                Seus dados são armazenados em servidores localizados no Brasil. Caso seja necessária transferência 
                internacional, garantiremos proteção adequada conforme exigido pela LGPD.
              </p>

              <h2>10. Menores de Idade</h2>
              <p>
                Nossos serviços não são direcionados a menores de 18 anos. Não coletamos intencionalmente informações 
                de menores.
              </p>

              <h2>11. Alterações nesta Política</h2>
              <p>
                Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos você sobre mudanças 
                significativas por email ou através da plataforma.
              </p>

              <h2>12. Encarregado de Dados (DPO)</h2>
              <p>
                Para exercer seus direitos ou fazer perguntas sobre privacidade, entre em contato com nosso Encarregado 
                de Proteção de Dados:
              </p>
              <ul>
                <li>Email: dpo@kamaia.com</li>
                <li>Endereço: São Paulo, SP - Brasil</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
