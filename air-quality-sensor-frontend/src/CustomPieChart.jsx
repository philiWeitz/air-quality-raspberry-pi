import { Cell, Label, Pie, PieChart } from "recharts";

export const CustomPieChart = ({
  label,
  width,
  heigh,
  data,
  dataKey,
  caption,
  color
}) => {
  const COLORS = [color || "#0088FE", "#E8E9EB"];

  function InnerText({ viewBox }) {
    const { cx, cy } = viewBox;
    return (
      <>
        <text
          x={cx}
          y={cy}
          fill={COLORS[0]}
          textAnchor="middle"
          dominantBaseline="central"
        >
          <tspan x="50%">{label}</tspan>
        </text>
        <text x={cx} y={cy} textAnchor="middle" dominantBaseline="central">
          <tspan x="50%" y="94%">
            {caption}
          </tspan>
        </text>
      </>
    );
  }

  return (
    <PieChart width={width} height={heigh}>
      <Pie
        data={data}
        innerRadius={40}
        outerRadius={45}
        paddingAngle={2}
        startAngle={90}
        endAngle={-270}
        dataKey={dataKey}
      >
        <Label
          width={30}
          position="center"
          content={<InnerText data={data} width={width} />}
        />
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );
};
