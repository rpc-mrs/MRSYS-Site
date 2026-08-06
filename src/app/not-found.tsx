import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh', 
      backgroundColor: '#000000', // Черный фон
      color: '#ffffff',           // Белый текст
      fontFamily: 'system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' 
    }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <h1 style={{ 
          borderRight: '1px solid rgba(255, 255, 255, .3)', // Светлая линия-разделитель
          display: 'inline-block', 
          margin: '0 20px 0 0', 
          padding: '10px 23px 10px 0', 
          fontSize: '24px', 
          fontWeight: 500, 
          verticalAlign: 'top' 
        }}>
          404
        </h1>
        <div style={{ display: 'inline-block', textAlign: 'left' }}>
          <h2 style={{ fontSize: '14px', fontWeight: '400', lineHeight: '28px', margin: 0 }}>
            Эта страница не найдена.
          </h2>
        </div>
      </div>
      
      <Link href="/" style={{ 
        marginTop: '20px', 
        color: '#38bdf8', // Голубая ссылка, которая хорошо видна на черном
        textDecoration: 'underline',
        fontSize: '14px'
      }}>
        Вернуться на главную
      </Link>
    </div>
  );
}
