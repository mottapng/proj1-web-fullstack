import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Button,
  Chip,
  Stack,
} from "@mui/material";

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
    <Card sx={{ maxWidth: 345, m: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        sx={{
          height: 400,
          objectFit: 'contain',
          objectPosition: 'center',
          backgroundColor: '#f5f5f5',
          paddingTop: '26px'
        }}
        image={imageUrl}
        alt={name}
        onError={(e) => (e.target.src = "/placeholder-show.jpg")}
      />
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h6" gutterBottom>
          {name}
        </Typography>
        <Stack direction="row" spacing={1} sx={{ mb: 1, flexWrap: "wrap" }}>
          {genres.length > 0
            ? genres.map((genre) => <Chip key={genre} label={genre} size="small" />)
            : <Chip label="Gênero não informado" size="small" />}
          <Chip label={year} size="small" color="primary" />
          <Chip label={`⭐ ${ratingText}`} size="small" />
        </Stack>
        <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1 }}>
          {cleanSummary}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          href={url}
          target="_blank"
          rel="noopener noreferrer"
        >
          Ver detalhes no TVMaze
        </Button>
      </CardActions>
    </Card>
  );
};

export default ResultCard;
