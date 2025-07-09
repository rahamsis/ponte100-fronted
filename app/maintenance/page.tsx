export default function MaintenancePage() {
  return (
    <main style={{ textAlign: 'center', padding: '10%' }}>
      <h1 style={{fontWeight:'bold', color:'#10439c'}}>🚧 En mantenimiento</h1>
      <p style={{color:'#10439c', fontSize:'20px'}}>Estamos actualizando la plataforma. Por favor, vuelve más tarde.</p>
      <img
        src="/images/mantenimiento.png"
        alt="Página en mantenimiento"
        style={{ marginTop: '2rem', maxWidth: 400 }}
      />
    </main>
  );
}
