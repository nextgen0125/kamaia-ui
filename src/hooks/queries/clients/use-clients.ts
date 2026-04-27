import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { clientsService, ICreateClientData } from '@/services/clients.service';

export function useClients(companyId: string, page = 1, take = 50) {
  return useQuery({
    queryKey: ['clients', companyId, page, take],
    queryFn: () => clientsService.getClients(companyId, page, take),
    enabled: !!companyId,
  });
}

export function useClient(companyId: string, clientId: string) {
  return useQuery({
    queryKey: ['client', companyId, clientId],
    queryFn: () => clientsService.getClientById(companyId, clientId),
    enabled: !!companyId && !!clientId,
  });
}

export function useCreateClient() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ companyId, data }: { companyId: string; data: ICreateClientData }) =>
      clientsService.createClient(companyId, data),
    onSuccess: (_, { companyId }) => {
      queryClient.invalidateQueries({ queryKey: ['clients', companyId] });
      queryClient.invalidateQueries({ queryKey: ['companyDashboardKPIs', companyId] });
    },
  });
}

export function useUpdateClient() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ companyId, clientId, data }: { companyId: string; clientId: string; data: Partial<ICreateClientData> }) =>
      clientsService.updateClient(companyId, clientId, data),
    onSuccess: (_, { companyId, clientId }) => {
      queryClient.invalidateQueries({ queryKey: ['clients', companyId] });
      queryClient.invalidateQueries({ queryKey: ['client', companyId, clientId] });
    },
  });
}

export function useDeleteClient() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ companyId, clientId }: { companyId: string; clientId: string }) =>
      clientsService.deleteClient(companyId, clientId),
    onSuccess: (_, { companyId }) => {
      queryClient.invalidateQueries({ queryKey: ['clients', companyId] });
      queryClient.invalidateQueries({ queryKey: ['companyDashboardKPIs', companyId] });
    },
  });
}
