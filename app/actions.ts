"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getClientes() {
    // Model 'Cliente' -> prisma.cliente
    return await prisma.cliente.findMany({
        orderBy: { id: "asc" },
    });
}

export async function createCliente(formData: FormData) {
    const nombre = formData.get("nombre") as string;
    const correo = formData.get("email") as string; // Form field is 'email', DB is 'correo'
    const telefono = formData.get("telefono") as string;

    await prisma.cliente.create({
        data: {
            nombre,
            correo,
            telefono,
            fechaRegistro: new Date(),
        },
    });

    revalidatePath("/");
}

export async function updateCliente(id: number, formData: FormData) {
    const nombre = formData.get("nombre") as string;
    const correo = formData.get("email") as string;
    const telefono = formData.get("telefono") as string;

    // 1. Update Client
    const clientePrevio = await prisma.cliente.findUnique({ where: { id } });

    await prisma.cliente.update({
        where: { id },
        data: { nombre, correo, telefono },
    });

    // 2. Audit Log
    // Model 'AuditoriaCambios' -> prisma.auditoriaCambios
    // Fields: tabla, accion, detalle, fecha
    await prisma.auditoriaCambios.create({
        data: {
            tabla: "Cliente",
            accion: "UPDATE",
            detalle: `Actualizado: ${clientePrevio?.nombre} -> ${nombre}`,
            fecha: new Date(),
        },
    });

    revalidatePath("/");
}

export async function deleteCliente(id: number) {
    await prisma.cliente.delete({ where: { id } });
    revalidatePath("/");
}
