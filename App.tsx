
import React, { useState, useCallback, useRef } from 'react';
import {
  Rocket,
  Zap,
  Trash2,
  Edit3,
  Terminal,
  X,
  Search,
  UserPlus,
  Database,
  Info,
  Ship,
  MousePointer2,
  Atom,
  Globe,
  Radio
} from 'lucide-react';

// --- Types ---
interface Cliente {
  id: number;
  nombre: string;
  email: string;
  telefono: string;
  direccion: string;
  creadoEn: string;
}

interface LogEntry {
  id: string;
  event: string;
  timestamp: string;
}

// --- Mock Data con personajes de la serie ---
const INITIAL_CLIENTES: Cliente[] = [
  { id: 1, nombre: "Philip J. Fry", email: "fry@planetexpress.com", telefono: "3000-0101", direccion: "Apartamento de Bender, NNY", creadoEn: new Date().toISOString() },
  { id: 2, nombre: "Turanga Leela", email: "leela@planetexpress.com", telefono: "3000-0102", direccion: "Orfanatorio de NNY", creadoEn: new Date().toISOString() },
  { id: 3, nombre: "Bender B. Rodríguez", email: "bender@ilovebeer.com", telefono: "3000-0666", direccion: "Armario 1x1, NNY", creadoEn: new Date().toISOString() },
];

export default function App() {
  const [clientes, setClientes] = useState<Cliente[]>(INITIAL_CLIENTES);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [editingCliente, setEditingCliente] = useState<Cliente | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const logContainerRef = useRef<HTMLDivElement>(null);

  const addLog = useCallback((eventName: string) => {
    const newLog = {
      id: Math.random().toString(36).substr(2, 9),
      event: eventName,
      timestamp: new Date().toLocaleTimeString()
    };
    setLogs(prev => [newLog, ...prev].slice(0, 50));
  }, []);

  const handleEvent = (e: React.SyntheticEvent, eventName: string) => {
    addLog(`Detección de evento: ${eventName}`);
  };

  const handleSaveCliente = (e: React.FormEvent) => {
    e.preventDefault();
    addLog('Protocolo onSubmit iniciado por el DOOP');

    const formData = new FormData(e.target as HTMLFormElement);
    const newClient: Cliente = {
      id: editingCliente?.id || Math.max(...clientes.map(c => c.id), 0) + 1,
      nombre: formData.get('nombre') as string,
      email: formData.get('email') as string,
      telefono: formData.get('telefono') as string,
      direccion: formData.get('direccion') as string,
      creadoEn: editingCliente?.creadoEn || new Date().toISOString()
    };

    if (editingCliente) {
      setClientes(prev => prev.map(c => c.id === editingCliente.id ? newClient : c));
      addLog(`Auditoría de Hermes: Tripulante #${newClient.id} modificado en el archivo.`);
    } else {
      setClientes(prev => [...prev, newClient]);
      addLog(`Auditoría de Hermes: ¡Buenas noticias! Nuevo cliente ${newClient.nombre} registrado.`);
    }

    setEditingCliente(null);
    setShowForm(false);
  };

  const handleDelete = (id: number) => {
    setClientes(prev => prev.filter(c => c.id !== id));
    addLog(`Auditoría: Registro #${id} enviado a la dimensión del olvido.`);
  };

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-slate-100 p-4 md:p-8 font-sans selection:bg-yellow-400 selection:text-black">
      {/* Header Estilo Next.Event.Grud */}
      <header className="max-w-7xl mx-auto mb-10 flex flex-col md:flex-row justify-between items-center gap-6 border-b-4 border-teal-600 pb-6">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-teal-500 rounded-full border-4 border-white shadow-[0_0_20px_rgba(20,184,166,0.6)] animate-pulse">
            <Ship className="text-white w-8 h-8 -rotate-45" />
          </div>
          <div>
            <h1 className="text-4xl font-black italic tracking-tighter text-teal-400 uppercase">
              Planet <span className="text-red-500">Express</span>
            </h1>
            <p className="text-xs font-mono text-yellow-400 tracking-widest uppercase flex items-center gap-2">
              <Radio className="w-3 h-3" /> Oficina de Gestión Central del Prof. Farnsworth
            </p>
          </div>
        </div>

        <button
          onClick={(e) => {
            handleEvent(e, 'onClick (Nueva Entrega)');
            setEditingCliente(null);
            setShowForm(true);
          }}
          onMouseEnter={(e) => handleEvent(e, 'onMouseEnter')}
          className="group relative flex items-center gap-2 bg-red-600 text-white px-8 py-4 rounded-full font-black uppercase tracking-widest hover:bg-red-500 transition-all shadow-[0_5px_0_rgb(153,27,27)] active:translate-y-1 active:shadow-none"
        >
          <UserPlus className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          Añadir Tripulante
        </button>
      </header>

      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Panel de Clientes (Contenedor Estilo Nave) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-[#16213e] rounded-[3rem] border-4 border-teal-700 overflow-hidden shadow-2xl">
            <div className="p-6 border-b-4 border-teal-700 bg-teal-900/30 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-teal-400" />
                <input
                  type="text"
                  placeholder="Escanear base de datos..."
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); handleEvent(e, 'onChange (Búsqueda)'); }}
                  className="w-full pl-12 pr-4 py-3 rounded-full bg-[#0a0f1a] border-2 border-teal-600 text-teal-300 placeholder-teal-800 focus:outline-none focus:ring-4 focus:ring-teal-500/20 transition-all"
                />
              </div>
              <div
                className="flex items-center gap-2 text-[10px] font-bold text-yellow-500 bg-black/40 px-4 py-2 rounded-full border border-yellow-500/30 animate-bounce"
              >
                <Atom className="w-3 h-3" />
                ¡20 EVENTOS DETECTADOS!
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-teal-800/20 text-teal-400 text-xs uppercase font-black">
                    <th className="px-8 py-5">Entidad Biológica / Robótica</th>
                    <th className="px-8 py-5">Frecuencia de Radio</th>
                    <th className="px-8 py-5 text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y-2 divide-teal-900/50">
                  {clientes.filter(c => c.nombre.toLowerCase().includes(searchQuery.toLowerCase())).map(cliente => (
                    <tr
                      key={cliente.id}
                      className="group hover:bg-teal-500/10 transition-colors cursor-pointer"
                      onDoubleClick={(e) => { handleEvent(e, 'onDoubleClick'); setEditingCliente(cliente); setShowForm(true); }}
                    >
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-teal-500/20 border-2 border-teal-500 flex items-center justify-center text-teal-400 font-black shadow-[inset_0_0_10px_rgba(20,184,166,0.3)]">
                            {cliente.nombre.charAt(0)}
                          </div>
                          <div>
                            <div className="font-bold text-lg text-white group-hover:text-yellow-400 transition-colors">{cliente.nombre}</div>
                            <div className="text-[10px] text-teal-600 font-mono">SECTOR: {cliente.id * 102}-X</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <div className="text-sm text-teal-200">{cliente.email}</div>
                        <div className="text-xs text-teal-700 font-mono italic">{cliente.telefono}</div>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex justify-center items-center gap-4">
                          <button
                            onClick={(e) => { e.stopPropagation(); setEditingCliente(cliente); setShowForm(true); }}
                            className="p-3 text-teal-400 hover:bg-teal-400 hover:text-black rounded-xl transition-all border-2 border-transparent hover:border-white"
                          >
                            <Edit3 className="w-5 h-5" />
                          </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); handleDelete(cliente.id); }}
                            className="p-3 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all border-2 border-transparent hover:border-white"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Area de Demo con estilo "Laboratorio de Farnsworth" */}
          <div className="bg-[#1a1a2e] p-8 rounded-[2rem] border-4 border-dashed border-teal-800 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Atom className="w-24 h-24 text-teal-500" />
            </div>
            <h3 className="text-lg font-black text-yellow-400 mb-4 flex items-center gap-3">
              <Zap className="w-6 h-6 animate-bounce" />
              Cámara de Pruebas de Eventos (Portapapeles)
            </h3>
            <textarea
              placeholder="Prueba Copiar/Cortar/Pegar como si fueras un Bender sobrio..."
              onCopy={(e) => handleEvent(e, 'onCopy')}
              onCut={(e) => handleEvent(e, 'onCut')}
              onPaste={(e) => handleEvent(e, 'onPaste')}
              onSelect={(e) => handleEvent(e, 'onSelect')}
              className="w-full h-32 p-4 rounded-2xl border-2 border-teal-600 bg-black/50 text-teal-400 font-mono text-sm focus:ring-4 focus:ring-teal-500/20 focus:outline-none transition-all placeholder-teal-900"
            />
          </div>
        </div>

        {/* Holo-Consola de Logs */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-black rounded-3xl shadow-[0_0_30px_rgba(34,197,94,0.2)] flex flex-col h-[650px] border-4 border-zinc-800 relative">
            {/* Scanline effect */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,128,0.06))] bg-[length:100%_4px,3px_100%] z-10" />

            <div className="p-5 border-b-4 border-zinc-800 flex justify-between items-center bg-zinc-900 rounded-t-[1.4rem]">
              <div className="flex items-center gap-3 text-green-500">
                <Terminal className="w-5 h-5" />
                <span className="text-sm font-black tracking-widest uppercase">Holo-Display v3.0</span>
              </div>
              <button
                onClick={() => setLogs([])}
                className="text-[10px] bg-red-900/30 text-red-400 px-3 py-1.5 rounded-full border border-red-900 hover:bg-red-500 hover:text-white transition-all font-bold"
              >
                PURGAR
              </button>
            </div>

            <div
              ref={logContainerRef}
              className="flex-1 p-6 overflow-y-auto font-mono text-xs space-y-3 relative z-0"
              onScroll={(e) => handleEvent(e, 'onScroll')}
              onWheel={(e) => handleEvent(e, 'onWheel')}
            >
              {logs.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-green-900 text-center italic">
                  <Globe className="w-12 h-12 mb-4 opacity-20" />
                  <p className="max-w-[150px]">Esperando señales del cuadrante gamma...</p>
                </div>
              ) : (
                logs.map((log) => (
                  <div key={log.id} className="border-l-2 border-green-900 pl-4 py-1 hover:bg-green-500/5 transition-colors">
                    <span className="text-green-800">[{log.timestamp}]</span><br />
                    <span className={log.event.includes('Auditoría') ? 'text-yellow-400 font-bold' : 'text-green-400'}>
                      {'>'} {log.event}
                    </span>
                  </div>
                ))
              )}
            </div>

            <div className="p-4 bg-zinc-900 border-t-4 border-zinc-800 rounded-b-[1.4rem] flex items-center justify-center gap-4">
              <div className="flex gap-1">
                <div className="w-2 h-4 bg-green-500 animate-bounce [animation-delay:-0.3s]" />
                <div className="w-2 h-4 bg-green-500 animate-bounce [animation-delay:-0.15s]" />
                <div className="w-2 h-4 bg-green-500 animate-bounce" />
              </div>
              <span className="text-[10px] text-green-700 font-black uppercase tracking-widest">Sincronizando con el DOOP...</span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-teal-600 to-teal-800 rounded-3xl p-6 text-white border-4 border-white/20 shadow-xl">
            <h4 className="font-black italic flex items-center gap-2 mb-3 text-lg">
              <Database className="w-5 h-5 text-yellow-400" /> REPORTE TÉCNICO
            </h4>
            <div className="space-y-3 text-xs font-medium text-teal-100">
              <div className="flex justify-between items-center border-b border-white/10 pb-2">
                <span>Base de Datos:</span>
                <span className="font-mono text-yellow-400">GMAIL (PostgreSQL)</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/10 pb-2">
                <span>Esquema:</span>
                <span className="font-mono text-yellow-400">Public</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Estado:</span>
                <span className="bg-green-500 text-[8px] px-2 py-1 rounded-full text-black font-black uppercase">Operativo</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modal Estilo Escotilla de Nave */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#16213e] w-full max-w-xl rounded-[3rem] border-8 border-teal-600 shadow-[0_0_100px_rgba(20,184,166,0.3)] overflow-hidden">
            <div className="p-8 border-b-4 border-teal-600 flex justify-between items-center bg-teal-900/20">
              <h2 className="text-2xl font-black text-white italic uppercase tracking-tighter">
                {editingCliente ? 'Modificar Archivo' : 'Nuevo Contrato de Entrega'}
              </h2>
              <button
                onClick={() => setShowForm(false)}
                className="bg-red-600 p-2 rounded-full border-4 border-white hover:scale-110 transition-transform shadow-lg"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            <form
              onSubmit={handleSaveCliente}
              onReset={(e) => { handleEvent(e, 'onReset'); setShowForm(false); }}
              className="p-8 space-y-6"
            >
              <div className="space-y-2">
                <label className="block text-xs font-black text-teal-500 uppercase tracking-widest ml-2">Nombre de la Entidad</label>
                <input
                  name="nombre"
                  defaultValue={editingCliente?.nombre || ''}
                  required
                  placeholder="Ej: Scruffy (El conserje)"
                  onInput={(e) => handleEvent(e, 'onInput')}
                  onInvalid={(e) => handleEvent(e, 'onInvalid')}
                  className="w-full px-6 py-4 rounded-2xl bg-[#0a0f1a] border-2 border-teal-700 text-teal-300 focus:border-yellow-400 focus:outline-none transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-xs font-black text-teal-500 uppercase tracking-widest ml-2">Canal de Datos (Email)</label>
                  <input
                    name="email"
                    type="email"
                    defaultValue={editingCliente?.email || ''}
                    required
                    placeholder="correo@galaxia.com"
                    className="w-full px-6 py-4 rounded-2xl bg-[#0a0f1a] border-2 border-teal-700 text-teal-300 focus:border-yellow-400 focus:outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-black text-teal-500 uppercase tracking-widest ml-2">Frecuencia (Tel.)</label>
                  <input
                    name="telefono"
                    defaultValue={editingCliente?.telefono || ''}
                    placeholder="3000-XXXX"
                    className="w-full px-6 py-4 rounded-2xl bg-[#0a0f1a] border-2 border-teal-700 text-teal-300 focus:border-yellow-400 focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-black text-teal-500 uppercase tracking-widest ml-2">Coordenadas de Entrega (Dir.)</label>
                <textarea
                  name="direccion"
                  defaultValue={editingCliente?.direccion || ''}
                  rows={2}
                  placeholder="Ej: Luna Park, Cráter 5..."
                  className="w-full px-6 py-4 rounded-2xl bg-[#0a0f1a] border-2 border-teal-700 text-teal-300 focus:border-yellow-400 focus:outline-none transition-all resize-none"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="reset"
                  className="flex-1 px-6 py-4 rounded-full border-4 border-teal-700 font-black text-teal-500 uppercase tracking-widest hover:bg-teal-900/30 transition-all"
                >
                  Abortar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-4 rounded-full bg-teal-500 text-black font-black uppercase tracking-widest hover:bg-yellow-400 transition-all shadow-[0_5px_0_rgb(13,148,136)] active:translate-y-1 active:shadow-none"
                >
                  Sellar Contrato
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
