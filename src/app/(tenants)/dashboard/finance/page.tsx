import Stats02 from "@/components/stats-02";
import { Button } from "@/components/ui/button";

export default function FinancialPage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-row items-center justify-between gap-4">
                <h2>Financeiro</h2>
                <Button>Entrada/saida</Button>
            </div>
            <Stats02 /></div>
    )
}
