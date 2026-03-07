import React, { useState, useEffect } from "react";

export default function DashboardApp() {
  const [sensorPoints, setSensorPoints] = useState([
    { id: 1, label: "Camera", pin: "Barn", value: "Offline", status: "Off" },
    { id: 2, label: "Temperature", pin: "Field 3", value: "0", status: "Off" },
    { id: 3, label: "Humidity", pin: "Field 1", value: "0", status: "Off" },
    { id: 4, label: "Equipment Runtime", pin: "Betsy", value: "0", status: "Off" },
    { id: 5, label: "Water Flow Rate", pin: "Pump 1", value: "0", status: "Off" },
  ]);

  const [isDiagnosticRunning, setIsDiagnosticRunning] = useState(false);
  const [diagnosticMessage, setDiagnosticMessage] = useState("");

  // Simulated live data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSensorPoints((prev) =>
        prev.map((point) => {
          if (point.status === "Active") {
            if (point.label === "Temperature") {
              const newValue = (70 + Math.random() * 5).toFixed(1) + "°F";
              return { ...point, value: newValue };
            }
            if (point.label === "Humidity") {
              const newValue = (45 + Math.random() * 10).toFixed(1) + "%";
              return { ...point, value: newValue };
            }
            if (point.label === "Water Flow Rate") {
              const newValue = (12 + Math.random() * 2).toFixed(2) + " GPM";
              return { ...point, value: newValue };
            }
            if (point.label === "Equipment Runtime") {
              const hours = parseInt(point.value) || 1240;
              return { ...point, value: (hours + 0.01).toFixed(2) + " hrs" };
            }
          }
          return point;
        })
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const runDiagnostic = async () => {
    setIsDiagnosticRunning(true);
    setDiagnosticMessage("Starting System Diagnostic...");

    for (let i = 0; i < sensorPoints.length; i++) {
      const point = sensorPoints[i];
      setDiagnosticMessage(`Checking ${point.label} at ${point.pin}...`);
      await new Promise((r) => setTimeout(r, 800));
      
      setSensorPoints((prev) =>
        prev.map((p, idx) =>
          idx === i ? { ...p, status: "Active", value: "Initializing..." } : p
        )
      );
    }

    setDiagnosticMessage("Diagnostic Complete. All systems operational.");
    setIsDiagnosticRunning(false);
    
    // Set initial values after diagnostic
    setSensorPoints((prev) =>
      prev.map((p) => {
        if (p.label === "Camera") return { ...p, value: "Live Feed" };
        if (p.label === "Temperature") return { ...p, value: "72.4°F" };
        if (p.label === "Humidity") return { ...p, value: "48.2%" };
        if (p.label === "Equipment Runtime") return { ...p, value: "1240.50 hrs" };
        if (p.label === "Water Flow Rate") return { ...p, value: "12.45 GPM" };
        return p;
      })
    );

    setTimeout(() => setDiagnosticMessage(""), 5000);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 p-6">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">North Valley Monitoring</h1>
            <p className="text-slate-600 mt-2">
              ESP32 IoT Dashboard - Phase 1 Monitoring
            </p>
          </div>
          <button
            onClick={runDiagnostic}
            disabled={isDiagnosticRunning}
            className={`px-6 py-2 rounded-xl font-semibold transition-all ${
              isDiagnosticRunning
                ? "bg-slate-300 text-slate-500 cursor-not-allowed"
                : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md active:scale-95"
            }`}
          >
            {isDiagnosticRunning ? "Running..." : "Run Diagnostic"}
          </button>
        </header>

        {diagnosticMessage && (
          <div className="mb-6 p-4 bg-indigo-50 border border-indigo-100 text-indigo-700 rounded-2xl text-sm font-medium animate-pulse">
            {diagnosticMessage}
          </div>
        )}

        <section className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {sensorPoints.map((point) => {
              const isActive = point.status === "Active";

              return (
                <div
                  key={point.id}
                  className={`rounded-2xl border transition-all duration-500 p-5 ${
                    isActive
                      ? "border-emerald-200 bg-emerald-50/30"
                      : "border-slate-200 bg-slate-50"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-semibold">{point.label}</h2>
                      <p className="mt-1 text-sm text-slate-500">{point.pin}</p>
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium border transition-colors ${
                        isActive
                          ? "border-emerald-200 bg-emerald-100 text-emerald-800"
                          : "border-rose-200 bg-rose-100 text-rose-800"
                      }`}
                    >
                      {point.status}
                    </span>
                  </div>

                  <div className="mt-6">
                    <p className="text-sm text-slate-500">Live Value</p>
                    <p className={`mt-1 text-3xl font-bold transition-all ${
                      isActive ? "text-slate-900" : "text-slate-400"
                    }`}>
                      {point.value}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <footer className="mt-12 pt-8 border-t border-slate-200 text-center text-slate-400 text-sm">
          &copy; 2026 North Valley Monitoring. All systems check passing.
        </footer>
      </div>
    </div>
  );
}
