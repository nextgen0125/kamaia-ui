// ─────────────────────────────────────────────────────────────────────────────
// KPIs Types
// ─────────────────────────────────────────────────────────────────────────────

export type IKpiTrend = "up" | "down" | "neutral";

export interface IKpiComparativePercent {
    /** Valor absoluto do mês corrente. */
    value: number;
    /** Variação percentual em relação ao mês anterior (positivo = crescimento). */
    percentChange: number;
    /** Indicativo visual de direção. */
    trend: IKpiTrend;
}

export interface IKpiComparativeNumeric {
    /** Valor absoluto do mês corrente. */
    value: number;
    /** Diferença numérica em relação ao mês anterior (positivo = crescimento). */
    numericChange: number;
    /** Indicativo visual de direção. */
    trend: IKpiTrend;
}

export interface ICompanyDashboardIKPIs {
    /** Total de processos criados no mês corrente vs. mês anterior. */
    totalProcesses: IKpiComparativePercent;
    /** Clientes com ao menos um processo ativo (≠ Arquivado) no mês corrente vs. anterior. */
    activeClients: IKpiComparativePercent;
    /** Membros com role do tipo "lawyer" ingressados no mês corrente vs. anterior. */
    lawyers: IKpiComparativeNumeric;
    /** Soma das receitas (AccessTypeFinance.income) no mês corrente vs. anterior. */
    monthlyRevenue: IKpiComparativePercent;
}


/**
 * KPI com valor absoluto e comparativo numérico (delta inteiro).
 * Ex: "Tarefas Pendentes" — valor atual + quantas foram adicionadas hoje.
 */
export interface IKpiNumericDelta {
    /** Valor absoluto do período/snapshot corrente. */
    value: number;
    /** Diferença numérica em relação ao período de comparação. */
    numericChange: number;
    /** Indicativo visual de direção. */
    trend: IKpiTrend;
}

/**
 * KPI com valor absoluto e comparativo percentual.
 * Ex: "Atividade da Equipe" — percentual hoje vs. ontem.
 */
export interface IKpiPercentDelta {
    /** Valor absoluto do período corrente. */
    value: number;
    /** Variação percentual em relação ao período anterior. */
    percentChange: number;
    /** Indicativo visual de direção. */
    trend: IKpiTrend;
}

export interface IWorkspaceKPIs {
    /**
     * Total de tarefas pendentes (task_list.status != "concluída").
     * numericChange = tarefas adicionadas hoje vs. ontem.
     */
    pendingTasks: IKpiNumericDelta;

    /**
     * Total de eventos com end_date dentro dos próximos 7 dias (prazos próximos).
     * numericChange = diferença em relação à semana passada no mesmo período.
     */
    upcomingDeadlines: IKpiNumericDelta;

    /**
     * Total de eventos do tipo "Reunião" com start_date = hoje.
     * numericChange = total das reuniões já concluídas (end_date < agora).
     */
    meetingsToday: IKpiNumericDelta;

    /**
     * Percentual de atividade da equipe hoje vs. ontem.
     * Calculado como: (ações de hoje / ações de ontem) * 100.
     * numericChange = diferença percentual entre hoje e ontem.
     */
    teamActivity: IKpiPercentDelta;
}

export interface ICompanyAgendaKPIs {
    /**
     * Total de eventos agendados para hoje.
     * value = eventos de hoje.
     */
    todayEvents: {
        value: number;
    };

    /**
     * Total de eventos agendados para esta semana.
     * numericChange = diferença em relação à semana passada.
     * percentChange = variação percentual em relação à semana passada.
     * trend = indicativo de tendência (up/down/neutral).
     */
    thisWeekEvents: {
        value: number;
        numericChange?: number;
        percentChange?: number;
        trend?: "up" | "down" | "neutral";
    };

    /**
     * Total de eventos agendados para este mês.
     * numericChange = diferença em relação ao mês passado.
     * percentChange = variação percentual em relação ao mês passado.
     * trend = indicativo de tendência (up/down/neutral).
     */
    thisMonthEvents: {
        value: number;
        numericChange?: number;
        percentChange?: number;
        trend?: "up" | "down" | "neutral";
    };

    /**
     * Total de eventos do tipo "Prazo".
     * value = eventos de prazo.
     */
    deadlines: {
        value: number;
    };
}