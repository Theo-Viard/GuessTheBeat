import { useState } from "react";
import YouTube from "react-youtube";

function extractVideoId(url) {
  const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

function CreateTest() {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [questions, setQuestions] = useState([]);
  const [videoValid, setVideoValid] = useState(null);

  function checkVideoExists(id) {
    const img = new window.Image();
    img.onload = () => setVideoValid(true);
    img.onerror = () => setVideoValid(false);
    img.src = `https://img.youtube.com/vi/${id}/mqdefault.jpg`;
  }

  const handleYoutubeUrlChange = (e) => {
    setYoutubeUrl(e.target.value);
    const id = extractVideoId(e.target.value);
    if (id) {
      checkVideoExists(id);
    } else {
      setVideoValid(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!videoValid) return;
    setQuestions([
      ...questions,
      { title, artist, youtubeUrl }
    ]);
    setTitle("");
    setArtist("");
    setYoutubeUrl("");
    setVideoValid(null);
  };

  const videoId = extractVideoId(youtubeUrl);

  return (
    <div className="create-test-container">
      <h2>Créer un blind test</h2>
      <form onSubmit={handleSubmit} className="create-test-form">
        <div>
          <label>Titre de la chanson :</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Artiste :</label>
          <input
            type="text"
            value={artist}
            onChange={e => setArtist(e.target.value)}
            required
          />
        </div>
        <div>
          <label>URL YouTube :</label>
          <input
            type="url"
            value={youtubeUrl}
            onChange={handleYoutubeUrlChange}
            required
          />
          {videoValid === false && (
            <div style={{ color: "red", marginBottom: 10 }}>
              La vidéo YouTube n'existe pas ou est inaccessible.
            </div>
          )}
          {videoId && videoValid && (
            <div className="youtube-preview">
              <YouTube videoId={videoId} opts={{ height: '200', width: '350' }} />
            </div>
          )}
        </div>
        <button type="submit" disabled={!videoValid}>Ajouter la question</button>
      </form>
      <h3>Questions ajoutées :</h3>
      <ul>
        {questions.map((q, idx) => (
          <li key={idx}>
            {q.title} - {q.artist} ({q.youtubeUrl})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CreateTest;