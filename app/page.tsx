import { getClientes } from "./actions";
import ClientDashboard from "@/components/ClientDashboard";

// Force dynamic rendering so we always see fresh data
export const dynamic = "force-dynamic";

export default async function Home() {
    const clientes = await getClientes();

    return (
        <main>
            <ClientDashboard clientes={clientes} />
        </main>
    );
}
