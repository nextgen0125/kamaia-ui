# 🚀 Guia Rápido - Kamaia SaaS

## 📖 Índice
1. [Instalação e Configuração](#instalação-e-configuração)
2. [Estrutura do Projeto](#estrutura-do-projeto)
3. [Navegação Principal](#navegação-principal)
4. [Funcionalidades por Módulo](#funcionalidades-por-módulo)
5. [Atalhos de Teclado](#atalhos-de-teclado)
6. [Dicas de Uso](#dicas-de-uso)

---

## 🔧 Instalação e Configuração

### Pré-requisitos
- Node.js 18+ 
- pnpm, npm ou yarn

### Instalação
```bash
# Instalar dependências
pnpm install

# Executar em desenvolvimento
pnpm dev

# Build para produção
pnpm build

# Executar produção
pnpm start
```

### Acessar
- **Desenvolvimento:** http://localhost:3000
- **Landing Page:** http://localhost:3000
- **Dashboard:** http://localhost:3000/dashboard

---

## 📁 Estrutura do Projeto

```
kamaia-saas/
├── src/
│   ├── app/                    # Rotas Next.js 15
│   │   ├── (auth)/            # Páginas de autenticação
│   │   ├── (public)/          # Landing page pública
│   │   └── (tenants)/         # Dashboard (área logada)
│   │       └── dashboard/     # Todas as páginas do dashboard
│   ├── components/            # Componentes reutilizáveis
│   │   ├── ui/               # Componentes shadcn/ui
│   │   ├── auth/             # Formulários de auth
│   │   ├── dashboard/        # Widgets do dashboard
│   │   ├── notifications/    # Sistema de notificações
│   │   ├── search/           # Busca global
│   │   ├── export/           # Exportação de dados
│   │   ├── filters/          # Filtros avançados
│   │   └── ...               # Outros módulos
│   ├── lib/                  # Utilitários
│   └── hooks/                # Custom hooks
└── public/                   # Assets estáticos
```

---

## 🧭 Navegação Principal

### Área Pública
- **/** - Página inicial
- **/pricing** - Planos e preços
- **/docs** - Documentação
- **/contact** - Contato

### Autenticação
- **/login** - Login
- **/register** - Cadastro
- **/forgot-password** - Recuperar senha
- **/reset-password** - Redefinir senha
- **/check-code** - Verificar código

### Dashboard
- **/dashboard** - Dashboard principal
- **/dashboard/cases** - Processos
- **/dashboard/clients** - Clientes
- **/dashboard/lawyers** - Advogados
- **/dashboard/agenda** - Calendário
- **/dashboard/task** - Tarefas
- **/dashboard/finance** - Financeiro
- **/dashboard/document** - Documentos
- **/dashboard/service** - Serviços
- **/dashboard/workspace** - Workspace
- **/dashboard/notifications** - Notificações
- **/dashboard/reports** - Relatórios
- **/dashboard/templates** - Templates
- **/dashboard/integrations** - Integrações
- **/dashboard/audit-logs** - Logs de auditoria
- **/dashboard/settings** - Configurações

---

## 🎯 Funcionalidades por Módulo

### 1. Dashboard Principal
**O que fazer:**
- ✅ Visualizar estatísticas gerais
- ✅ Acompanhar prazos próximos
- ✅ Ver atividades recentes da equipe
- ✅ Acessar ações rápidas
- ✅ Verificar eventos do dia

**Como usar:**
1. Acesse `/dashboard`
2. Os widgets mostram dados em tempo real
3. Clique em qualquer card para ver detalhes
4. Use "Ações Rápidas" para criar novos registros

---

### 2. Gestão de Processos

**O que fazer:**
- ✅ Criar novo processo
- ✅ Visualizar lista de processos
- ✅ Filtrar por status e prioridade
- ✅ Ver detalhes completos
- ✅ Acompanhar timeline
- ✅ Anexar documentos
- ✅ Criar tarefas relacionadas

**Como usar:**
1. Acesse `/dashboard/cases`
2. Clique em "Novo Processo" (botão azul)
3. Preencha o formulário
4. Clique em um processo para ver detalhes
5. Na página de detalhes, use as abas:
   - **Timeline:** Histórico do processo
   - **Documentos:** Arquivos anexados
   - **Tarefas:** Tarefas relacionadas
   - **Anotações:** Observações internas

---

### 3. Gestão de Clientes

**O que fazer:**
- ✅ Cadastrar cliente (PF ou PJ)
- ✅ Visualizar lista de clientes
- ✅ Filtrar por tipo
- ✅ Ver processos do cliente
- ✅ Acompanhar histórico financeiro
- ✅ Gerenciar documentos

**Como usar:**
1. Acesse `/dashboard/clients`
2. Clique em "Adicionar Cliente"
3. Selecione o tipo (Pessoa Física ou Jurídica)
4. Preencha os dados
5. Use as tabs para filtrar: Todos / PF / PJ

**Dica:** Os campos mudam automaticamente baseado no tipo selecionado.

---

### 4. Gestão de Advogados

**O que fazer:**
- ✅ Cadastrar advogado
- ✅ Definir especialidades
- ✅ Atribuir casos
- ✅ Acompanhar performance
- ✅ Ver estatísticas individuais

**Como usar:**
1. Acesse `/dashboard/lawyers`
2. Clique em "Adicionar Advogado"
3. Preencha dados pessoais e OAB
4. Selecione especialidades
5. Clique em um advogado para ver:
   - Casos atribuídos
   - Clientes sob responsabilidade
   - Performance mensal
   - Taxa de sucesso

---

### 5. Calendário e Agenda

**O que fazer:**
- ✅ Visualizar eventos (mês/semana/dia/agenda)
- ✅ Criar novo evento
- ✅ Arrastar e soltar eventos (DnD)
- ✅ Definir lembretes
- ✅ Vincular a processos

**Como usar:**
1. Acesse `/dashboard/agenda`
2. Alterne entre visualizações (botões no topo)
3. Clique em "Adicionar Evento"
4. Preencha:
   - Título
   - Tipo (Audiência, Reunião, Prazo)
   - Data e hora
   - Local
   - Participantes
5. Arraste eventos para reagendar

**Dica:** Use a visualização "Agenda" para lista cronológica.

---

### 6. Tarefas

**O que fazer:**
- ✅ Criar tarefas
- ✅ Atribuir para membros
- ✅ Definir prioridade
- ✅ Estabelecer prazos
- ✅ Marcar como concluída

**Como usar:**
1. Acesse `/dashboard/task`
2. Clique em "Nova Tarefa"
3. Preencha:
   - Título e descrição
   - Responsável
   - Prioridade (Alta/Média/Baixa)
   - Data de vencimento
4. Use filtros para organizar

---

### 7. Financeiro

**O que fazer:**
- ✅ Registrar receitas
- ✅ Registrar despesas
- ✅ Categorizar transações
- ✅ Ver gráficos financeiros
- ✅ Exportar relatórios

**Como usar:**
1. Acesse `/dashboard/finance`
2. Clique em "Nova Transação"
3. Selecione tipo (Receita/Despesa)
4. Preencha valor e categoria
5. Adicione descrição
6. Use filtros de período para análise

---

### 8. Documentos

**O que fazer:**
- ✅ Upload de arquivos (drag & drop)
- ✅ Criar pastas
- ✅ Organizar hierarquicamente
- ✅ Buscar documentos
- ✅ Categorizar
- ✅ Vincular a processos

**Como usar:**
1. Acesse `/dashboard/document`
2. **Upload:** Arraste arquivos ou clique em "Upload"
3. **Pastas:** Clique em "Nova Pasta"
4. **Organizar:** Mova arquivos entre pastas
5. Use busca para encontrar rapidamente

---

### 9. Workspace

**O que fazer:**
- ✅ Ver atividades da equipe
- ✅ Enviar mensagens no chat
- ✅ Ver membros online
- ✅ Acompanhar notificações
- ✅ Acesso rápido a estatísticas

**Como usar:**
1. Acesse `/dashboard/workspace`
2. Use as tabs:
   - **Atividades:** Feed em tempo real
   - **Chat:** Mensagens da equipe
3. Veja membros online no painel lateral
4. Clique em um membro para:
   - Enviar mensagem
   - Ligar
   - Videochamada

---

### 10. Busca Global

**O que fazer:**
- ✅ Buscar em todo o sistema
- ✅ Resultados por tipo
- ✅ Navegação rápida
- ✅ Ações rápidas

**Como usar:**
1. Pressione `⌘K` (Mac) ou `Ctrl+K` (Windows)
2. Digite sua busca
3. Navegue com setas ↑↓
4. Pressione `Enter` para acessar

**Buscável:**
- Processos
- Clientes
- Advogados
- Documentos
- Tarefas
- Eventos
- Páginas do sistema

---

### 11. Notificações

**O que fazer:**
- ✅ Ver notificações não lidas
- ✅ Filtrar por tipo
- ✅ Marcar como lida
- ✅ Acessar diretamente o item

**Como usar:**
1. **No header:** Clique no ícone de sino
2. **Badge vermelha:** Indica quantidade não lida
3. **Página completa:** `/dashboard/notifications`
4. **Filtros:** Por tipo ou prioridade
5. Clique na notificação para ir ao item

**Tipos de notificação:**
- 🔴 Prazos (alta prioridade)
- 📅 Reuniões
- ✅ Tarefas
- 💬 Mensagens
- 💰 Pagamentos
- ⚙️ Sistema

---

### 12. Relatórios e Analytics

**O que fazer:**
- ✅ Ver estatísticas gerais
- ✅ Analisar performance
- ✅ Gráficos de evolução
- ✅ Top advogados
- ✅ Processos por área

**Como usar:**
1. Acesse `/dashboard/reports`
2. Selecione período (semana/mês/trimestre/ano)
3. Analise os dashboards:
   - Receita total
   - Processos ativos
   - Taxa de conclusão
   - Performance mensal
4. Use "Exportar" para gerar relatórios

---

### 13. Templates

**O que fazer:**
- ✅ Criar templates de documentos
- ✅ Usar variáveis dinâmicas
- ✅ Categorizar templates
- ✅ Favoritar mais usados
- ✅ Duplicar templates

**Como usar:**
1. Acesse `/dashboard/templates`
2. Clique em "Novo Template"
3. Preencha:
   - Nome
   - Categoria
   - Conteúdo
4. **Variáveis:** Use `{{nome_variavel}}`
   - Ex: `{{cliente_nome}}`, `{{processo_numero}}`
5. Clique em "Usar Template" para aplicar

**Templates padrão:**
- Petição Inicial
- Contestação
- Procuração
- Recurso Ordinário

---

### 14. Integrações

**O que fazer:**
- ✅ Conectar com serviços externos
- ✅ Configurar APIs
- ✅ Ativar/desativar integrações
- ✅ Sincronizar dados

**Como usar:**
1. Acesse `/dashboard/integrations`
2. Escolha a integração desejada
3. Clique em "Conectar"
4. Forneça credenciais (API Key)
5. Configure opções:
   - Sincronização automática
   - Notificações
   - Webhooks

**Integrações disponíveis:**
- 📧 Gmail
- 📅 Google Calendar
- ☁️ Google Drive
- 💳 Stripe
- ⚖️ PJe
- ⚖️ e-SAJ
- 💬 WhatsApp Business
- 🛡️ OAB

---

### 15. Exportação de Dados

**O que fazer:**
- ✅ Exportar em PDF/Excel/CSV
- ✅ Selecionar campos
- ✅ Filtrar por período
- ✅ Opções personalizadas

**Como usar:**
1. Em qualquer lista, clique em "Exportar"
2. Escolha o formato
3. Selecione período
4. Marque campos a incluir
5. Configure opções:
   - Incluir arquivados
   - Incluir notas
   - Logo do escritório (PDF)
6. Clique em "Exportar"

---

### 16. Filtros Avançados

**O que fazer:**
- ✅ Filtrar listas complexas
- ✅ Múltiplos critérios
- ✅ Salvar filtros
- ✅ Badges visuais

**Como usar:**
1. Em qualquer lista, clique em "Filtros"
2. Configure os filtros:
   - Texto (busca)
   - Select (dropdown)
   - Datas (range)
   - Números (min/max)
3. Clique em "Aplicar"
4. **Badges** mostram filtros ativos
5. "Limpar" remove todos

---

### 17. Configurações

**O que fazer:**
- ✅ Configurar escritório
- ✅ Gerenciar equipe
- ✅ Ajustar notificações
- ✅ Configurar segurança
- ✅ Personalizar aparência
- ✅ Gerenciar plano

**Como usar:**
1. Acesse `/dashboard/settings`
2. Use as abas:
   - **Geral:** Logo, nome, endereço
   - **Equipe:** Membros e permissões
   - **Notificações:** Preferências
   - **Segurança:** 2FA, sessões
   - **Aparência:** Tema, idioma
   - **Faturamento:** Plano, pagamento

---

### 18. Logs de Auditoria

**O que fazer:**
- ✅ Ver todas as ações do sistema
- ✅ Rastrear mudanças
- ✅ Identificar usuário responsável
- ✅ Ver antes/depois

**Como usar:**
1. Acesse `/dashboard/audit-logs`
2. Use filtros:
   - Por usuário
   - Por ação
   - Por entidade
3. Veja detalhes:
   - Quem fez
   - O que fez
   - Quando fez
   - Mudanças realizadas
   - IP e navegador

---

## ⌨️ Atalhos de Teclado

### Globais
- `⌘K` ou `Ctrl+K` - Busca global
- `Esc` - Fechar dialogs/popovers

### Navegação
- `Tab` - Próximo campo
- `Shift+Tab` - Campo anterior
- `Enter` - Confirmar/Enviar
- `Esc` - Cancelar

### Busca Global
- `↑` `↓` - Navegar resultados
- `Enter` - Abrir item selecionado
- `Esc` - Fechar busca

---

## 💡 Dicas de Uso

### 1. Organização
- 📁 **Use pastas** para organizar documentos
- 🏷️ **Categorize** processos e serviços
- ⭐ **Favorite** templates mais usados
- 📌 **Priorize** tarefas importantes

### 2. Produtividade
- ⌨️ Use **⌘K** para navegação rápida
- 🎯 Configure **ações rápidas** no dashboard
- 📋 Crie **templates** para documentos recorrentes
- 🔔 Configure **notificações** por prioridade

### 3. Colaboração
- 💬 Use o **Workspace** para comunicação
- 📅 Compartilhe **eventos** da agenda
- ✅ **Atribua tarefas** para membros
- 👥 Acompanhe **atividades** da equipe

### 4. Segurança
- 🔐 Ative **2FA** nas configurações
- 📊 Revise **logs de auditoria** regularmente
- 🔑 Configure **permissões** por função
- 🚪 Encerre **sessões** não utilizadas

### 5. Análise
- 📈 Acompanhe **relatórios** semanalmente
- 💰 Monitore **financeiro** mensalmente
- ⚖️ Analise **performance** por advogado
- 📊 Use **filtros** para insights específicos

### 6. Backup
- ☁️ Configure **Google Drive** para backup
- 💾 **Exporte** dados periodicamente
- 📄 Mantenha **templates** atualizados
- 🔄 **Sincronize** com serviços externos

---

## 🆘 Solução de Problemas

### Problema: Página não carrega
**Solução:**
1. Limpe o cache do navegador
2. Verifique conexão com internet
3. Tente `pnpm dev` novamente

### Problema: Notificações não aparecem
**Solução:**
1. Verifique permissões do navegador
2. Vá em Configurações > Notificações
3. Ative as opções desejadas

### Problema: Busca global não funciona
**Solução:**
1. Pressione `⌘K` ou `Ctrl+K` (não `Cmd+K`)
2. Verifique se não há outro app usando o atalho
3. Use o botão de busca no header

### Problema: Upload de arquivo falha
**Solução:**
1. Verifique tamanho do arquivo (máx 10MB)
2. Tipos permitidos: PDF, DOCX, XLSX, JPG, PNG
3. Tente arrastar e soltar

### Problema: Dark mode não muda
**Solução:**
1. Vá em Configurações > Aparência
2. Selecione tema desejado
3. Recarregue a página

---

## 📞 Suporte

### Documentação Completa
- 📖 `FUNCIONALIDADES_IMPLEMENTADAS.md` - Lista completa
- 📝 `PROJETO_COMPLETO.md` - Documentação técnica
- 🔧 `DESENVOLVIMENTO.md` - Guia para devs

### Recursos
- **Demo:** http://localhost:3000
- **Docs:** http://localhost:3000/docs
- **GitHub:** [seu-repo]

---

## 🎓 Próximos Passos

### Para Usuários
1. ✅ Complete seu perfil
2. ✅ Configure notificações
3. ✅ Cadastre sua equipe
4. ✅ Crie templates personalizados
5. ✅ Configure integrações

### Para Desenvolvedores
1. 🔧 Configurar backend
2. 🗄️ Conectar banco de dados
3. 🔐 Implementar auth real
4. 📤 Configurar uploads
5. 🚀 Deploy para produção

---

**Desenvolvido com ❤️ - Kamaia SaaS**  
**Versão:** 2.0  
**Última atualização:** Março 2024
