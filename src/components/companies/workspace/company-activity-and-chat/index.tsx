"use client"


import { Card, CardHeader } from "@/components/ui/card"
import {
  Activity,
  MessageSquare,
} from "lucide-react"
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CompanyWorkspaceActivityFeedTab from "./company-workspace-activity-feed-tab"
import CompanyWorkspaceChatTab from "./company-workspace-chat-tab"


export default function CompanyActivityAndChat () {
    const [activeTab, setActiveTab] = useState("activity")

  return (
        <div className="md:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="activity" className="cursor-pointer">
                    <Activity className="mr-2 h-4 w-4" />
                    Atividades
                  </TabsTrigger>
                  <TabsTrigger value="chat" className="cursor-pointer">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Chat da Equipe
                  </TabsTrigger>
                </TabsList>

                {/* Activity Feed */}
                <TabsContent value="activity" className="mt-4">
                  <CompanyWorkspaceActivityFeedTab />
                </TabsContent>

                {/* Chat */}
                <TabsContent value="chat" className="mt-4">
                  <CompanyWorkspaceChatTab />
                </TabsContent>
              </Tabs>
            </CardHeader>
          </Card>
        </div>
    )
}
