"use client";

import { useState } from "react";
import EventLogger from "@/components/EventLogger";
import { createCliente, updateCliente, deleteCliente } from "@/app/actions";
import { Plus, Search, Edit3, Trash2, Info, Rocket, Zap, Database } from "lucide-react";

// Updated type definition based on REAL Introspected DB
type Cliente = {
    id: number;
    nombre: string;
    correo: string;
    telefono: string | null;
    direccion: string | null;
    fechaRegistro: Date;
};

export default function ClientDashboard({ clientes }: { clientes: Cliente[] }) {
    const [logs, setLogs] = useState<{ id: string; event: string; timestamp: string }[]>([]);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [search, setSearch] = useState("");

    const logEvent = (eventName: string) => {
        const now = new Date();
        const timeString = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}.${now.getMilliseconds()}`;
        // FIX: Use randomUUID + timestamp to ensure uniqueness and prevent key collision errors
        const uniqueId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

        setLogs((prev) => [
            ...prev,
            { id: uniqueId, event: eventName, timestamp: timeString },
        ]);
    };

    const filteredClientes = clientes.filter((c) =>
        c.nombre.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="flex bg-[#050b14] min-h-screen text-cyan-400 font-sans selection:bg-cyan-900 selection:text-white">
            {/* BACKGROUND GRID EFFECT */}
            <div className="fixed inset-0 pointer-events-none opacity-10"
                style={{ backgroundImage: 'linear-gradient(#00f2ff 1px, transparent 1px), linear-gradient(90deg, #00f2ff 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
            </div>

            <div className="flex-1 p-8 mr-96 relative z-10">
                <header className="mb-8 flex items-center justify-between border-b-2 border-cyan-800 pb-4">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-cyan-900/20 rounded-full border border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.5)]">
                            <Rocket size={32} className="text-cyan-300" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-black italic tracking-tighter text-white drop-shadow-[0_2px_0px_rgba(255,0,0,0.8)]">
                                NEXT.EVENT.GRUD
                            </h1>
                            <p className="text-xs text-orange-400 font-mono tracking-widest">OFFICIAL CRM TERMINAL v3000</p>
                        </div>
                    </div>
                    <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-full shadow-[0_0_15px_rgba(220,38,38,0.6)] hover:shadow-[0_0_25px_rgba(220,38,38,1)] transition-all flex items-center gap-2"
                        // Event 2: onMouseEnter
                        onMouseEnter={() => logEvent("onMouseEnter (New)")}
                        onClick={() => {
                            logEvent("onClick (New Client)");
                            // Scroll to form or focus
                            document.getElementById('nombreInput')?.focus();
                        }}
                    >
                        <Plus size={20} strokeWidth={3} />
                        AÑADIR TRIPULANTE
                    </button>
                </header>

                {/* --- SEARCH BAR --- */}
                <div className="mb-8 p-1 rounded-full bg-gradient-to-r from-cyan-900/50 to-transparent border border-cyan-700 shadow-lg flex items-center gap-3 px-4 py-3 backdrop-blur-sm">
                    <Search className="text-cyan-500 w-6 h-6" />
                    <input
                        type="text"
                        placeholder="Escanear base de datos biológica..."
                        className="bg-transparent outline-none w-full text-lg text-white placeholder-cyan-700/70 font-mono"
                        value={search}
                        // Event 5: onChange
                        onChange={(e) => { setSearch(e.target.value); logEvent("onChange (Search)"); }}
                        // Event 7: onFocus
                        onFocus={() => logEvent("onFocus (Search)")}
                        // Event 8: onBlur
                        onBlur={() => logEvent("onBlur (Search)")}
                    />
                    <button
                        // Click to execute erase command if 'd[id]' is typed
                        onClick={() => {
                            const match = search.match(/^d(\d+)$/i);
                            if (match) {
                                const idToDelete = parseInt(match[1]);
                                deleteCliente(idToDelete);
                                logEvent(`COMMAND: DELETE ${idToDelete}`);
                                setSearch("");
                            }
                        }}
                        className="hidden md:flex items-center gap-2 px-3 py-1 bg-yellow-900/30 border border-yellow-600/50 rounded text-xs text-yellow-400 font-bold uppercase tracking-wider cursor-pointer hover:bg-yellow-900/50 transition-colors"
                    >
                        <Zap size={14} />
                        borrar
                    </button>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">

                    {/* --- ENTRIES LIST --- */}
                    <div className="xl:col-span-2 space-y-4">
                        {/* Headers */}
                        <div className="grid grid-cols-12 gap-4 px-6 text-xs font-bold text-cyan-600 uppercase tracking-widest">
                            <div className="col-span-1">ID</div>
                            <div className="col-span-4">Entidad</div>
                            <div className="col-span-4">Comunicación</div>
                            <div className="col-span-3 text-right">Protocolos</div>
                        </div>

                        {filteredClientes.map((cliente) => (
                            <div
                                key={cliente.id}
                                className="group relative bg-[#0d1424] border border-cyan-900/50 hover:border-cyan-400 rounded-xl p-4 grid grid-cols-12 gap-4 items-center transition-all duration-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] hover:-translate-y-1 cursor-pointer overflow-hidden"
                                // Event 4: onDoubleClick
                                onDoubleClick={() => {
                                    setEditingId(cliente.id);
                                    logEvent(`onDoubleClick (Edit ID:${cliente.id})`);
                                }}
                                // Event 20: onPointerDown
                                onPointerDown={() => logEvent("onPointerDown (Row)")}
                            >
                                {/* Decorator Line */}
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-800 group-hover:bg-cyan-400 transition-colors"></div>

                                <div className="col-span-1 font-mono text-cyan-700">#{cliente.id}</div>

                                <div className="col-span-4">
                                    <div className="font-bold text-lg text-white group-hover:text-cyan-300 transition-colors">{cliente.nombre}</div>
                                    <div className="text-xs text-cyan-600 mt-1 flex items-center gap-1">
                                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                        SECTOR 7-G
                                    </div>
                                </div>

                                <div className="col-span-4 flex flex-col justify-center">
                                    <span className="text-sm text-cyan-200 font-mono">{cliente.correo}</span>
                                    <span className="text-xs text-cyan-700 mt-1">{cliente.telefono || "N/A"}</span>
                                </div>

                                <div className="col-span-3 flex justify-end gap-3 opacity-60 group-hover:opacity-100 transition-opacity">
                                    <button
                                        className="p-2 hover:bg-cyan-500/20 text-cyan-400 hover:text-cyan-200 rounded-full border border-transparent hover:border-cyan-500/50 transition-all"
                                        title="Modificar Datos"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setEditingId(cliente.id);
                                            logEvent("onClick (Edit Icon)");
                                        }}
                                    >
                                        <Edit3 size={18} />
                                    </button>
                                    <button
                                        className="p-2 hover:bg-red-500/20 text-red-700 hover:text-red-400 rounded-full border border-transparent hover:border-red-500/50 transition-all"
                                        title="Terminar Contrato"
                                        onClick={async (e) => {
                                            e.stopPropagation();
                                            if (confirm("¿Ejecutar orden de terminación?")) {
                                                await deleteCliente(cliente.id);
                                                logEvent("onClick (Delete)");
                                            }
                                        }}
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}

                        {filteredClientes.length === 0 && (
                            <div className="p-12 text-center border-2 border-dashed border-cyan-900/50 rounded-xl text-cyan-800 font-mono">
                                <Database size={48} className="mx-auto mb-4 opacity-50" />
                                NO SE DETECTAN FORMAS DE VIDA
                            </div>
                        )}

                        {/* --- DEMO AREA (Events 13-16) --- */}
                        <section className="mt-8 relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-violet-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                            <div className="relative p-6 bg-[#0a0e17] rounded-lg border-2 border-dashed border-cyan-800 hover:border-cyan-500/50 transition-colors">
                                <div className="flex items-center gap-3 mb-4 text-cyan-500">
                                    <Zap className="animate-spin-slow w-5 h-5" />
                                    <h2 className="font-bold uppercase tracking-widest text-sm">Cámara de Pruebas (Zona Interactiva)</h2>

                                    <Info
                                        className="ml-auto w-4 h-4 text-cyan-700 cursor-help"
                                        // Event 19: onContextMenu
                                        onContextMenu={(e) => { e.preventDefault(); logEvent("onContextMenu"); }}
                                    />
                                </div>
                                <textarea
                                    className="w-full p-4 bg-black/50 border border-cyan-900 rounded text-cyan-300 font-mono text-sm focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 focus:outline-none transition-all resize-none shadow-inner"
                                    rows={4}
                                    placeholder="> INICIAR PROTOCOLO DE PRUEBAS DE EVENTOS..."
                                    // Event 13: onCopy
                                    onCopy={() => logEvent("onCopy")}
                                    // Event 14: onCut
                                    onCut={() => logEvent("onCut")}
                                    // Event 15: onPaste
                                    onPaste={() => logEvent("onPaste")}
                                    // Event 16: onSelect
                                    onSelect={() => logEvent("onSelect")}
                                />
                            </div>
                        </section>
                    </div>

                    {/* --- FORMULARIO (Right Side / Sticky) --- */}
                    <div className="xl:col-span-1">
                        <div className={`bg-[#0d1424] p-6 rounded-2xl shadow-2xl border ${editingId ? 'border-yellow-500/50 shadow-yellow-900/20' : 'border-cyan-800'} sticky top-8 transition-all duration-500`}>
                            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-cyan-900/50">
                                {editingId
                                    ? <div className="p-2 bg-yellow-500/20 rounded text-yellow-500"><Edit3 size={24} /></div>
                                    : <div className="p-2 bg-green-500/20 rounded text-green-500"><Plus size={24} /></div>
                                }
                                <h2 className={`text-xl font-bold uppercase tracking-wider ${editingId ? 'text-yellow-400' : 'text-white'}`}>
                                    {editingId ? "Modificar" : "Nuevo Ingreso"}
                                </h2>
                            </div>

                            <form
                                action={async (formData) => {
                                    try {
                                        if (editingId) {
                                            await updateCliente(editingId, formData);
                                            setEditingId(null);
                                        } else {
                                            await createCliente(formData);
                                        }
                                        logEvent("SERVER ACTION SUCCESS");
                                        (document.getElementById("clientForm") as HTMLFormElement).reset();
                                    } catch (e) {
                                        logEvent("SERVER ACTION FAILED");
                                    }
                                }}
                                id="clientForm"
                                // Event 11: onSubmit
                                onSubmit={() => logEvent("onSubmit")}
                                // Event 12: onReset
                                onReset={() => { logEvent("onReset"); setEditingId(null); }}
                                // Event 21: onInvalid
                                onInvalid={() => logEvent("onInvalid")}
                                className="space-y-5"
                            >
                                <div className="group">
                                    <label className="block text-xs font-bold text-cyan-600 uppercase mb-1 tracking-wider group-focus-within:text-cyan-400">Identificación (Nombre)</label>
                                    <input
                                        id="nombreInput"
                                        name="nombre"
                                        type="text"
                                        required
                                        className="w-full bg-black/40 border border-cyan-900 rounded p-3 text-white placeholder-cyan-800 focus:border-cyan-400 focus:outline-none focus:shadow-[0_0_10px_rgba(6,182,212,0.3)] transition-all"
                                        placeholder="Ej. Philip J. Fry"
                                        // Event 6: onInput
                                        onInput={() => logEvent("onInput (Nombre)")}
                                    />
                                </div>
                                <div className="group">
                                    <label className="block text-xs font-bold text-cyan-600 uppercase mb-1 tracking-wider group-focus-within:text-cyan-400">Canal de Comunicación (Correo)</label>
                                    <input
                                        name="email"
                                        type="email"
                                        required
                                        className="w-full bg-black/40 border border-cyan-900 rounded p-3 text-white placeholder-cyan-800 focus:border-cyan-400 focus:outline-none focus:shadow-[0_0_10px_rgba(6,182,212,0.3)] transition-all"
                                        placeholder="fry@planetexpress.com"
                                    />
                                </div>
                                <div className="group">
                                    <label className="block text-xs font-bold text-cyan-600 uppercase mb-1 tracking-wider group-focus-within:text-cyan-400">Frecuencia (Teléfono)</label>
                                    <input
                                        name="telefono"
                                        type="tel"
                                        className="w-full bg-black/40 border border-cyan-900 rounded p-3 text-white placeholder-cyan-800 focus:border-cyan-400 focus:outline-none focus:shadow-[0_0_10px_rgba(6,182,212,0.3)] transition-all"
                                        placeholder="555-0199"
                                    />
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <button
                                        type="submit"
                                        className={`flex-1 py-3 px-4 rounded font-bold uppercase tracking-wider text-sm shadow-lg transform transition-all active:scale-95 ${editingId
                                            ? 'bg-yellow-600 hover:bg-yellow-500 text-black shadow-yellow-900/50'
                                            : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-cyan-900/50'
                                            }`}
                                        // Event 1: onClick
                                        onClick={() => logEvent("onClick (Guardar)")}
                                        // Event 3: onMouseLeave
                                        onMouseLeave={() => logEvent("onMouseLeave")}
                                    >
                                        {editingId ? "Actualizar Datos" : "Registrar"}
                                    </button>
                                    <button
                                        type="reset"
                                        className="px-4 py-3 border border-cyan-800 rounded text-cyan-600 hover:bg-cyan-900/30 hover:text-cyan-300 transition uppercase text-sm font-bold active:scale-95"
                                        onClick={() => logEvent("onClick (Cancelar)")}
                                    >
                                        X
                                    </button>
                                </div>
                            </form>

                            <div className="mt-6 pt-4 border-t border-cyan-900/30 text-center">
                                <p className="text-[10px] text-cyan-800 uppercase">
                                    Sistema Protegido por
                                </p>
                                <p className="text-xs text-cyan-700 font-mono tracking-widest mt-1">DOOP SECURE NET</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Visual Console */}
            <EventLogger logs={logs} />
        </div>
    );
}
