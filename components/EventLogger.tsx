"use client";

import { useEffect, useRef, useState } from "react";

type LogEntry = {
    id: string;
    event: string;
    timestamp: string;
};

export default function EventLogger({ logs }: { logs: LogEntry[] }) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [logs]);

    return (
        <div className="flex flex-col h-full bg-[#030508] border-l-2 border-cyan-900/50 w-96 fixed right-0 top-0 bottom-0 z-50 shadow-2xl">
            {/* Header Panel */}
            <div className="p-4 bg-[#0a0f18] border-b border-cyan-800 relative overflow-hidden">
                {/* Scan line effect */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-cyan-500 shadow-[0_0_10px_#06b6d4] animate-scan"></div>

                <div className="flex justify-between items-center mb-1">
                    <h2 className="text-sm font-black text-cyan-400 uppercase tracking-widest flex items-center gap-2 font-mono">
                        <span className="w-2 h-2 rounded-sm bg-cyan-500 animate-pulse" />
                        HOLO-DISPLAY v3.0
                    </h2>
                    <span className="px-2 py-0.5 rounded text-[9px] bg-red-900/30 text-red-500 border border-red-900 font-mono">LIVE FEED</span>
                </div>
                <p className="text-[10px] text-cyan-700 font-mono">Flux Capacitor: ONLINE</p>
            </div>

            {/* Logs Area */}
            <div
                ref={containerRef}
                className="flex-1 overflow-y-auto p-4 font-mono text-xs space-y-2 relative"
                style={{ fontFamily: '"Press Start 2P", monospace', }}
                // Event 17: onScroll
                onScroll={() => { }}
                // Event 18: onWheel
                onWheel={() => { }}
            >
                {/* Matrix background hint */}
                <div className="absolute inset-0 opacity-5 pointer-events-none text-green-500 overflow-hidden text-[8px] leading-3 select-none z-0">
                    <MatrixEffect />
                </div>

                {logs.length === 0 && (
                    <div className="text-cyan-900 text-center mt-20 font-mono text-[10px] uppercase tracking-wider relative z-10 animate-pulse">
                        [ Espacialmente Vacío ]<br /><br />Esperando interacción...
                    </div>
                )}

                {logs.map((log) => (
                    <div
                        key={log.id}
                        className="relative z-10 group flex flex-col p-2 bg-cyan-950/20 border-l-2 border-cyan-700 hover:border-green-400 hover:bg-cyan-900/20 transition-all duration-100"
                    >
                        <span className="text-[10px] text-cyan-600 font-mono mb-1 block">[{log.timestamp}]</span>
                        <span className="text-green-400 font-bold font-mono text-xs group-hover:text-green-300 group-hover:shadow-[0_0_5px_rgba(74,222,128,0.5)] transition-all">
                            &gt; {log.event}
                        </span>
                    </div>
                ))}
            </div>

            {/* Footer Status */}
            <div className="py-2 px-4 bg-[#0a0f18] border-t border-cyan-900 text-[10px] text-cyan-600 flex justify-between items-center font-mono uppercase">
                <span>Eventos: {logs.length}</span>
                <div className="flex gap-1" title="Barra de Sincronización">
                    {[1, 2, 3, 4, 5].map(i => (
                        <div key={i} className={`w-1 h-3 bg-cyan-800 rounded-sm ${i % 2 === 0 ? 'animate-pulse' : ''}`} style={{ animationDelay: `${i * 100}ms` }}></div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function MatrixEffect() {
    const [lines, setLines] = useState<string[]>([]);

    useEffect(() => {
        // Generate lines only on client side to avoid hydration mismatch
        setLines(Array(50).fill(0).map(() => Math.random().toString(2).substr(2)));
    }, []);

    return (
        <>
            {lines.map((line, i) => (
                <div key={i}>{line}</div>
            ))}
        </>
    );
}
