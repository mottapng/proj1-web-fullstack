import React from "react";

const ResultCard = ({ show }) => {
  // Extrair dados do show
  const {
    id,
    name,
    genres = [],
    image,
    summary,
    url,
    network,
    premiered,
    rating,
  } = show;

  // URL da imagem ou placeholder
  const imageUrl = image?.medium || image?.original || "/placeholder-show.jpg";

  // Limpar HTML do summary
  const cleanSummary = summary
    ? summary.replace(/<[^>]*>/g, "").substring(0, 150) + "..."
    : "Descrição não disponível";

  // Formatar gêneros
  const genresText =
    genres.length > 0 ? genres.join(", ") : "Gênero não informado";

  // Formatar ano de estreia
  const year = premiered ? new Date(premiered).getFullYear() : "N/A";

  // Rating formatado
  const ratingText = rating?.average
    ? `⭐ ${rating.average}/10`
    : "Sem avaliação";

  return (
    <div className="result-card">
      <div className="card-image">
        <img
          src={imageUrl}
          alt={`Poster de ${name}`}
          loading="lazy"
          onError={(e) => {
            e.target.src = "/placeholder-show.jpg";
          }}
        />
      </div>

      <div className="card-content">
        <h3 className="card-title">{name}</h3>

        <div className="card-meta">
          <span className="card-genres">{genresText}</span>
          <span className="card-year">{year}</span>
          <span className="card-rating">{ratingText}</span>
        </div>

        <p className="card-summary">{cleanSummary}</p>

        <div className="card-actions">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="card-link"
          >
            Ver detalhes no TVMaze
          </a>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
