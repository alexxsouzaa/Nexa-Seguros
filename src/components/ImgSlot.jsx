export default function ImgSlot({ className = "", label = "Imagem", children, decorative = true }) {
  return (
    <div
      className={("img-slot " + className).trim()}
      aria-hidden={decorative ? "true" : undefined}
      data-od-id="slot-imagem"
    >
      {children ?? <span className="img-slot-tag">{label}</span>}
    </div>
  );
}
