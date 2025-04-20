import { useEffect, useRef } from 'react';
import JsBarcode from 'jsbarcode';

const CodigoDeBarras = ({ value }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    if (value && svgRef.current) {
      JsBarcode(svgRef.current, value, {
        format: "CODE128",
        lineColor: "#000",
        width: 2,
        height: 60,
        displayValue: true,
      });
    }
  }, [value]);

  return (
    <div className="text-center">
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default CodigoDeBarras;
