import { BarChart, Bar, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import svgPaths from "../../imports/svg-ifwz00yaeh";
import { ChartSkeleton, EmptyStateSkeleton } from "./skeletons";
import { useEmptyStateHint } from "../hooks/useEmptyStateHint";
import { EmptyState } from "./EmptyState";
import emptyChartImage from "../../assets/empty-chart.png";

interface WeeklyChartProps {
  data: { day: string; sessions: number }[];
  loading?: boolean;
}

export function WeeklyChart({ data, loading = false }: WeeklyChartProps) {
  const isEmpty = data.every((d) => d.sessions === 0);
  const emptyHint = useEmptyStateHint("dashboard.weeklyChart", loading, isEmpty);

  return (
    <div className="flex-1 min-w-0 bg-white rounded-[12px] border border-[#e5e7eb] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] self-stretch">
      <div className="flex flex-col gap-[16px] pb-[48px] pt-[24px] px-[24px] h-full">
        {/* Header */}
        <div className="flex gap-[8px] items-start">
          <svg width="20" height="20" fill="none" viewBox="0 0 20 20" className="shrink-0 mt-[2px]">
            <path d={svgPaths.p27b3b400} fill="#317DFF" />
          </svg>
          <div className="flex flex-col gap-[4px]">
            <span className="font-['Geist',sans-serif] font-medium text-[16px] leading-[19.2px] text-black">
              Atendimentos na semana
            </span>
            <span className="font-['Geist',sans-serif] font-normal text-[14px] leading-[16.8px] text-[#939393]">
              Quantidade de sessões por dia
            </span>
          </div>
        </div>

        {/* Chart */}
        {loading ? (
          emptyHint ? (
            <EmptyStateSkeleton media="image" />
          ) : (
            <ChartSkeleton height={240} bars={data.length || 6} />
          )
        ) : isEmpty ? (
          <EmptyState
            image={emptyChartImage}
            title="Sem dados para exibir"
            description="Complete atendimentos para visualizar suas estatísticas semanais. Os dados aparecerão aqui conforme você utilizar a plataforma."
          />
        ) : (
        <div className="flex-1 w-full animate-in fade-in duration-200" style={{ minHeight: 240 }}>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart
              data={data}
              margin={{ top: 12, right: 12, left: 12, bottom: 0 }}
            >
              <CartesianGrid
                vertical={false}
                stroke="#e5e7eb"
                strokeDasharray="3 3"
              />
              <XAxis
                dataKey="day"
                type="category"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                interval={0}
                tick={{
                  fill: "#6b7280",
                  fontSize: 12,
                  fontFamily: "Geist, sans-serif",
                }}
              />
              <Tooltip
                cursor={{ fill: "rgba(17,24,39,0.04)" }}
                content={({ active, payload, label }) => {
                  if (!active || !payload?.length) return null;
                  const item = payload[0];
                  return (
                    <div className="rounded-[8px] border border-[#e5e7eb] bg-white px-[12px] py-[8px] shadow-[0px_4px_12px_rgba(0,0,0,0.08)] min-w-[140px]">
                      <p className="font-['Geist',sans-serif] font-medium text-[12px] text-[#6b7280] mb-[4px]">
                        {label}
                      </p>
                      <div className="flex items-center gap-[8px]">
                        <span
                          className="h-[10px] w-[10px] rounded-[2px] shrink-0"
                          style={{ backgroundColor: "#317DFF" }}
                        />
                        <div className="flex flex-1 items-center justify-between gap-[12px]">
                          <span className="font-['Geist',sans-serif] font-normal text-[13px] text-[#6b7280]">
                            Sessões
                          </span>
                          <span className="font-['Geist',sans-serif] font-medium text-[13px] text-[#111827] tabular-nums">
                            {item.value?.toLocaleString("pt-BR")}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                }}
              />
              <Bar dataKey="sessions" fill="#317DFF" radius={8} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        )}
      </div>
    </div>
  );
}