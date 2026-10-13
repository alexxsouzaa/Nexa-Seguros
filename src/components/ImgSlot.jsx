export default function ImgSlot({ className = "", label = "Imagem", children }) {
  return (
    <div
      className={("img-slot " + className).trim()}
      aria-hidden="true"
      data-od-id="slot-imagem"
    >
      {children ?? <span className="img-slot-tag">{label}</span>}
    </div>
  );
}
