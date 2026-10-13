/* Desenhos técnicos ilustrativos em SVG (geometria pura, sem imagens). */

function Defs({ id }: { id: string }) {
  return (
    <defs>
      <marker id={`${id}-arrow`} viewBox="0 0 10 6" refX="9.5" refY="3" markerWidth="10" markerHeight="6" markerUnits="userSpaceOnUse" orient="auto-start-reverse">
        <path d="M0,0 L10,3 L0,6 z" className="dw-arrow" />
      </marker>
      <pattern id={`${id}-hatch`} width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <line x1="0" y1="0" x2="0" y2="7" className="dw-hatch-line" />
      </pattern>
    </defs>
  );
}

/** Flange em duas vistas (frontal + corte A-A) com cotas. As linhas se desenham ao carregar. */
export function FlangeDrawing() {
  const id = "flange";
  const holes = [
    [218, 92],
    [82, 92],
    [82, 228],
    [218, 228],
  ];
  return (
    <svg className="drawing drawing-animated" viewBox="0 0 520 330" role="img" aria-labelledby="flange-title">
      <title id="flange-title">Desenho técnico ilustrativo de um flange em vista frontal e corte, com cotas de diâmetro e espessura</title>
      <Defs id={id} />

      {/* Linhas de centro */}
      <g className="dw-center">
        <line x1="18" y1="160" x2="282" y2="160" pathLength={1} style={{ ["--d" as string]: 0 }} />
        <line x1="150" y1="28" x2="150" y2="292" pathLength={1} style={{ ["--d" as string]: 0.05 }} />
        <circle cx="150" cy="160" r="96" pathLength={1} style={{ ["--d" as string]: 0.1 }} />
        <line x1="325" y1="160" x2="425" y2="160" pathLength={1} style={{ ["--d" as string]: 0.15 }} />
      </g>

      {/* Vista frontal */}
      <g className="dw-visible">
        <circle cx="150" cy="160" r="120" pathLength={1} style={{ ["--d" as string]: 0.2 }} />
        <circle cx="150" cy="160" r="72" pathLength={1} style={{ ["--d" as string]: 0.35 }} />
        <circle cx="150" cy="160" r="58" pathLength={1} style={{ ["--d" as string]: 0.45 }} />
        {holes.map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="8" pathLength={1} style={{ ["--d" as string]: 0.55 + i * 0.05 }} />
        ))}
      </g>

      {/* Plano de corte A-A */}
      <g className="dw-cut">
        <line x1="150" y1="18" x2="150" y2="34" />
        <line x1="150" y1="286" x2="150" y2="302" />
        <text x="160" y="24" className="dw-label">A</text>
        <text x="160" y="304" className="dw-label">A</text>
      </g>

      {/* Corte A-A */}
      <g className="dw-section">
        <path d="M340 40 H410 V88 H380 V102 H340 Z" fill={`url(#${id}-hatch)`} pathLength={1} style={{ ["--d" as string]: 0.6 }} />
        <path d="M340 280 H410 V232 H380 V218 H340 Z" fill={`url(#${id}-hatch)`} pathLength={1} style={{ ["--d" as string]: 0.65 }} />
        <line x1="380" y1="102" x2="380" y2="218" pathLength={1} style={{ ["--d" as string]: 0.7 }} />
      </g>

      {/* Cotas */}
      <g className="dw-dim">
        <line x1="414" y1="40" x2="466" y2="40" />
        <line x1="414" y1="280" x2="466" y2="280" />
        <line x1="458" y1="40" x2="458" y2="280" markerStart={`url(#${id}-arrow)`} markerEnd={`url(#${id}-arrow)`} />
        <text x="450" y="160" transform="rotate(-90 450 160)" className="dw-text">Ø120</text>

        <line x1="360" y1="102" x2="360" y2="218" markerStart={`url(#${id}-arrow)`} markerEnd={`url(#${id}-arrow)`} />
        <text x="353" y="160" transform="rotate(-90 353 160)" className="dw-text">Ø58</text>

        <line x1="396" y1="88" x2="396" y2="232" markerStart={`url(#${id}-arrow)`} markerEnd={`url(#${id}-arrow)`} />
        <text x="389" y="160" transform="rotate(-90 389 160)" className="dw-text">Ø72</text>

        <line x1="340" y1="284" x2="340" y2="314" />
        <line x1="410" y1="284" x2="410" y2="314" />
        <line x1="340" y1="308" x2="410" y2="308" markerStart={`url(#${id}-arrow)`} markerEnd={`url(#${id}-arrow)`} />
        <text x="375" y="302" className="dw-text" textAnchor="middle">35</text>

        <polyline points="224,86 252,48 300,48" fill="none" markerStart={`url(#${id}-arrow)`} />
        <text x="256" y="43" className="dw-text">4× Ø8</text>
      </g>

      <text x="375" y="26" className="dw-label" textAnchor="middle">CORTE A-A</text>
    </svg>
  );
}

/** Eixo escalonado com zona desgastada a recuperar. */
export function ShaftRecoveryDrawing() {
  const id = "shaft";
  return (
    <svg className="drawing" viewBox="0 0 530 230" role="img" aria-labelledby="shaft-title">
      <title id="shaft-title">Desenho ilustrativo de um eixo com zona desgastada marcada para recuperação ao diâmetro original</title>
      <Defs id={id} />

      <g className="dw-center">
        <line x1="14" y1="120" x2="506" y2="120" />
      </g>

      {/* Contorno original (tracejado) na zona de desgaste */}
      <g className="dw-hidden">
        <line x1="200" y1="75" x2="300" y2="75" />
        <line x1="200" y1="165" x2="300" y2="165" />
      </g>

      {/* Material a repor */}
      <g className="dw-recover">
        <rect x="200" y="75" width="100" height="9" />
        <rect x="200" y="156" width="100" height="9" />
      </g>

      {/* Perfil atual */}
      <path
        className="dw-visible-path"
        d="M40 90 H130 V75 H200 V84 H300 V75 H380 V90 H480 V150 H380 V165 H300 V156 H200 V165 H130 V150 H40 Z"
      />
      <g className="dw-visible">
        <line x1="130" y1="90" x2="130" y2="150" />
        <line x1="380" y1="90" x2="380" y2="150" />
        <line x1="200" y1="84" x2="200" y2="156" />
        <line x1="300" y1="84" x2="300" y2="156" />
      </g>

      <g className="dw-dim">
        <line x1="300" y1="71" x2="300" y2="36" />
        <line x1="200" y1="71" x2="200" y2="36" />
        <line x1="200" y1="42" x2="300" y2="42" markerStart={`url(#${id}-arrow)`} markerEnd={`url(#${id}-arrow)`} />
        <text x="250" y="34" textAnchor="middle" className="dw-text">ZONA DESGASTADA</text>

        <line x1="384" y1="75" x2="502" y2="75" />
        <line x1="384" y1="165" x2="502" y2="165" />
        <line x1="496" y1="75" x2="496" y2="165" markerStart={`url(#${id}-arrow)`} markerEnd={`url(#${id}-arrow)`} />
        <text x="510" y="120" transform="rotate(-90 510 120)" textAnchor="middle" className="dw-text">Ø ORIGINAL</text>

        <polyline points="250,162 250,200 290,200" fill="none" markerStart={`url(#${id}-arrow)`} />
        <text x="296" y="204" className="dw-text">RECUPERAR</text>
      </g>
    </svg>
  );
}
