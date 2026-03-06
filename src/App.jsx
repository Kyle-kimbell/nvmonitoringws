export default function DashboardApp() {
  const sensorPoints = [
    { id: 1, label: "Camera", pin: "Barn", value: "0", status: "Off" },
    { id: 2, label: "Temperature", pin: "Field 3", value: "0", status: "Off" },
    { id: 3, label: "Humidity", pin: "Field 1", value: "0", status: "Off" },
    { id: 4, label: "Equipment Runtime", pin: "Betsy", value: "0", status: "Off" },
    { id: 5, label: "Water Flow Rate", pin: "Pump 1", value: "0", status: "Off" },
  ];

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 p-6">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight">North Valley Monitoring</h1>
          <p className="text-slate-600 mt-2">
            A simple React dashboard with space for 5 ESP32 input/output data points.
          </p>
        </header>

        <section className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {sensorPoints.map((point) => {
              const liveValue = point.status === "Off" ? "0" : point.value;

              return (
                <div
                  key={point.id}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-semibold">{point.label}</h2>
                      <p className="mt-1 text-sm text-slate-500">{point.pin}</p>
                    </div>
                    <span
                      className="rounded-full px-3 py-1 text-xs font-medium border border-rose-200 bg-rose-100 text-rose-800"
                    >
                      Off
                    </span>
                  </div>

                  <div className="mt-6">
                    <p className="text-sm text-slate-500">Live Value</p>
                    <p className="mt-1 text-3xl font-bold">{liveValue}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
