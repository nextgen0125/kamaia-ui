export type ServiceType = {
  id: string
  client: string
  subject: string
  process: string
  recentRegister: string
  tags: Array<"review" |
  "archived" |
  "approved" |
  "urgent" |
  "pending" >
}