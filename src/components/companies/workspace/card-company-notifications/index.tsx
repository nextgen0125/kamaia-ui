"use client"

import { useMemo } from "react"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"

import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { InfiniteScroll } from "@/components/ui/infinite-scroll"
import { Skeleton } from "@/components/ui/skeleton"
import { useCompanyDashboardContext } from "@/contexts/company-contexts/company-dashboard"
import { useInfiniteNotifications } from "@/hooks/queries/use-notification"
import { INotificationType, INotificationPriority, INotification } from "@/interfaces/INotification"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import {
  Bell,
  CheckCircle2,
  Calendar,
  AlertCircle,
  FileText,
  Info
} from "lucide-react"

const getPriorityColor = (priority: INotificationPriority) => {
  switch (priority) {
    case INotificationPriority.HIGH:
      return "border-l-red-500"
    case INotificationPriority.MEDIUM:
      return "border-l-yellow-500"
    case INotificationPriority.LOW:
      return "border-l-blue-500"
    default:
      return "border-l-gray-500"
  }
}

const getNotificationIcon = (type: INotificationType) => {
  switch (type) {
    case INotificationType.DEADLINE:
      return <AlertCircle className="h-4 w-4 text-red-500" />
    case INotificationType.MEETING:
      return <Calendar className="h-4 w-4 text-yellow-500" />
    case INotificationType.TASK:
      return <CheckCircle2 className="h-4 w-4 text-green-500" />
    case INotificationType.DOCUMENT:
      return <FileText className="h-4 w-4 text-blue-500" />
    default:
      return <Info className="h-4 w-4 text-gray-500" />
  }
}

function NotificationSkeleton() {
  return (
    <div className="rounded-lg border-l-4 border-l-gray-200 p-3 flex items-start space-x-4 mb-3 bg-muted/20">
      <Skeleton className="h-4 w-4 rounded-full mt-1 flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-1/4" />
      </div>
    </div>
  )
}

export default function CardCompanyNotifications() {
  const { isLoading: isContextLoading, company } = useCompanyDashboardContext()

  const {
    data,
    isLoading: isQueryLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useInfiniteNotifications(company?.id as string)

  const notifications = useMemo(() => {
    return data?.pages.flatMap((page) => page.notifications) ?? []
  }, [data])

  const isLoading = isContextLoading || isQueryLoading
  // O unread_count pode ser obtido da primeira página (pages[0])
  const unreadCount = data?.pages?.[0]?.unread_count ?? 0

  return (
    <Card className="flex flex-col">
      <CardHeader className="flex-none">
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center">
            <Bell className="mr-2 h-5 w-5" />
            Notificações
          </span>
          {unreadCount > 0 && (
            <Badge variant="destructive">
              {unreadCount}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden p-0 px-6 pb-6">
        <ScrollArea className="h-[300px] w-full" id="activity-feed-top">
          <div className="space-y-3 pr-4">
            {isLoading ? (
              <>
                <NotificationSkeleton />
                <NotificationSkeleton />
                <NotificationSkeleton />
                <NotificationSkeleton />
              </>
            ) : isError ? (
              <div className="text-sm text-center text-muted-foreground p-4">
                Erro ao carregar notificações.
              </div>
            ) : notifications.length === 0 ? (
              <div className="text-sm text-center text-muted-foreground p-4">
                Nenhuma notificação encontrada.
              </div>
            ) : (
              <InfiniteScroll
                onLoadMore={async () => {
                  if (hasNextPage && !isFetchingNextPage) {
                    await fetchNextPage()
                  }
                }}
                hasMore={!!hasNextPage}
                loadingMessage="Carregando mais notificações..."
                endMessage={
                  notifications.length > 0 ? "Fim das notificações" : undefined
                }
              >
                {notifications.map((notification: INotification) => (
                  <div
                    key={notification.id}
                    className={`rounded-lg border-l-4 p-3 transition-colors hover:bg-muted/50 mb-3 ${getPriorityColor(
                      notification.priority
                    )} ${!notification.is_read ? "bg-muted/30" : "bg-background"}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-1 flex-shrink-0">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="space-y-1 flex-1">
                        <p className="text-sm font-medium leading-none flex items-center justify-between">
                          <span>{notification.title}</span>
                          {!notification.is_read && (
                            <span className="ml-2 inline-block h-2 w-2 rounded-full bg-blue-500" />
                          )}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {notification.message}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatDistanceToNow(new Date(notification.created_at), { addSuffix: true, locale: ptBR })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </InfiniteScroll>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}