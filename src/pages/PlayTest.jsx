import { useParams } from 'react-router-dom';

function PlayTest() {
  const { id } = useParams();

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Jouer au Blind Test</h2>
      <p>Test ID : {id}</p>
    </div>
  );
}

export default PlayTest;
