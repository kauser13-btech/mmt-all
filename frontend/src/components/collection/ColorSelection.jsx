export default function ColorSelection({ changeColorByUrl, selectedColor, data = colorData }) {
  const needsBorder = (colorCode) => {
    const lightColors = ["#ffffff", "#f8fafc", "#fef3c7", "#fef7cd"];
    return lightColors.includes(colorCode.toLowerCase());
  };

  return (
    <div className="flex flex-wrap gap-3">
      {data.map((color) => {
        const isSelected = selectedColor.includes(color.color_name);

        return (
          <button
            key={color.color_code}
            onClick={() => changeColorByUrl(color.color_name)}
            className={`relative w-10 h-10 rounded-full border-2 flex items-center justify-center transition
              ${needsBorder(color.color_code) ? "border-gray-300" : "border-transparent"}
              ${isSelected ? "ring-2 ring-offset-2 ring-orange-500" : ""}`}
            style={{ backgroundColor: color.color_code }}
            aria-label={`Select ${color.color_name}`}
          >
            {isSelected && (
              <span className="w-3 h-3 bg-white rounded-full border border-gray-400" />
            )}
          </button>
        );
      })}
    </div>
  );
}
