import { AxiosInstance, AxiosResponse } from 'axios';
import { authService } from './auth-service';
import { ICompany, CreateCompanyData, UpdateCompanyData, CompanyFilters, PaginatedCompanies } from '@/interfaces/ICompany';
import { ICompanyDashboardIKPIs, IWorkspaceKPIs, ICompanyAgendaKPIs } from '@/interfaces/ICompanyKPIS';

/**
 * Service de empresas/escritórios de advocacia.
 * Herda a instância Axios configurada do AuthService (interceptors,
 * token automático, refresh, tratamento de erros etc.).
 */
class CompanyService {
  /**
   * Instância Axios já configurada com interceptors de autenticação,
   * refresh-token e tratamento de erros centralizado — herdada do AuthService.
   */
  private api: AxiosInstance;

  constructor() {
    // Reutiliza a instância singleton do AuthService para não duplicar
    // interceptors, base URL ou lógica de token.
    this.api = authService.getApiInstance();
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // POST /v1/companies  — Cadastrar empresa  [SUPER_ADMIN]
  // ─────────────────────────────────────────────────────────────────────────────

  /**
   * Cria uma nova empresa/escritório de advocacia.
   * Requer role SUPER_ADMIN.
   * @param companyData Dados da empresa a ser criada
   * @returns Empresa criada
   */
  async createCompany(companyData: CreateCompanyData): Promise<ICompany> {
    try {
      const response: AxiosResponse<ICompany> = await this.api.post(
        '/v1/companies',
        companyData
      );

      const data = response.data;
      if (data) {
        return data;
      }

      throw new Error('Erro ao criar empresa');
    } catch (error) {
      throw error;
    }
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // GET /v1/companies?page=1&take=9  — Listar empresas  [SUPER_ADMIN]
  // ─────────────────────────────────────────────────────────────────────────────

  /**
   * Lista todas as empresas/escritórios de advocacia com paginação.
   * Requer role SUPER_ADMIN.
   * @param filters Filtros opcionais de paginação (page, take)
   * @returns Lista paginada de empresas
   */
  async getCompanies(filters?: CompanyFilters): Promise<PaginatedCompanies> {
    try {
      const response: AxiosResponse<PaginatedCompanies> = await this.api.get(
        '/v1/companies',
        { params: filters }
      );

      const data = response.data;
      if (data) {
        return data;
      }

      throw new Error('Erro ao listar empresas');
    } catch (error) {
      throw error;
    }
  }


    // ─────────────────────────────────────────────────────────────────────────────
  // GET /v1/companies/:id  — Busca uma empresa
  // ─────────────────────────────────────────────────────────────────────────────

  /**
   * Busca uma empresa/escritório de advocacia pelo ID.
   * @returns Empresa
   */
  async getCompany(companyId: string): Promise<ICompany> {
    try {
      const response: AxiosResponse<ICompany> = await this.api.get(
        `/v1/companies/${companyId}`,
      );

      const data = response.data;
      if (data) {
        return data;
      }

      throw new Error('Erro ao buscar a empresa');
    } catch (error) {
      throw error;
    }
  }

  /**
   * Busca os KPIs de uma empresa/escritório de advocacia pelo ID.
   * @returns Empresa
   */
  async getCompanyKPIs(companyId: string, page: string): Promise<ICompanyDashboardIKPIs | IWorkspaceKPIs | ICompanyAgendaKPIs> {
    try {
      const response: AxiosResponse<ICompanyDashboardIKPIs | IWorkspaceKPIs | ICompanyAgendaKPIs> = await this.api.get(
        `/v1/companies/${companyId}/kpis?page=${page}`,
      );

      const data = response.data;
      if (data) {
        return data;
      }

      throw new Error('Erro ao buscar os kpis da empresa');
    } catch (error) {
      throw error;
    }
  }


  // ─────────────────────────────────────────────────────────────────────────────
  // PUT /v1/companies  — Atualizar empresa  [SUPER_ADMIN | ADMINISTRATOR]
  // ─────────────────────────────────────────────────────────────────────────────

  /**
   * Atualiza dados de uma empresa/escritório de advocacia.
   * Requer role SUPER_ADMIN ou ADMINISTRATOR (via canOrIs).
   *
   * IMPORTANTE: O Multer só aceita multipart/form-data.
   * Todo o payload (texto + ficheiro) deve ir dentro de um único FormData —
   * nunca misturar FormData com spread de objeto JS no body do Axios.
   *
   * @param companyData Dados parciais para atualização
   * @param company_id  ID da empresa
   * @returns Empresa atualizada
   */
  async updateCompany(companyData: UpdateCompanyData, company_id: string): Promise<ICompany> {
    const formData = new FormData();

    // ── Campos de texto ────────────────────────────────────────────────────────
    // Só appenda os campos que foram preenchidos para não sobrescrever
    // valores existentes com strings vazias na API.
    if (companyData.name)      formData.append("name",      companyData.name);
    if (companyData.phone)     formData.append("phone",     companyData.phone);
    if (companyData.email)     formData.append("email",     companyData.email);
    if (companyData.nif)       formData.append("nif",       companyData.nif);
    if (companyData.address)   formData.append("address",   companyData.address);
    if (companyData.time_zone) formData.append("time_zone", companyData.time_zone);

    // ── Ficheiro ───────────────────────────────────────────────────────────────
    // O campo deve chamar-se exactamente "file" — igual ao multer().single("file").
    // Passa o File em si (fileList[0]), não a FileList inteira.
    if (companyData.file && companyData.file.length > 0) {
      formData.append("file", companyData.file[0]);
    }

    // ── Request ────────────────────────────────────────────────────────────────
    // Passar o FormData directamente como body.
    // NÃO usar { ...companyData, ...formData } — spread de FormData retorna {}
    // e mistura JSON com multipart, corrompendo o request.
    //
    // O header Content-Type pode ser omitido: o Axios/browser define
    // automaticamente "multipart/form-data; boundary=..." com o boundary correcto.
    // Se forçar o header manualmente sem o boundary, o Multer não consegue
    // fazer o parse e lança erros similares ao Unexpected field.
    const response: AxiosResponse<ICompany> = await this.api.put(
      `/v1/companies/${company_id}`,
      formData,
      // sem headers — o Axios gera o Content-Type correcto
    );

    if (response.data) {
      return response.data;
    }

    throw new Error("Erro ao atualizar empresa");
  }
}


// Exportar instância singleton — mesma convenção do auth-service
export const companyService = new CompanyService();
export default companyService;