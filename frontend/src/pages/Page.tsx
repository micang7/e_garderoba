import Layout from '../components/templates/Layout';

export default function Page({ children }: { children: React.ReactNode }) {
  return (
    <Layout
      sidenavOptions={[
        { name: 'Strona główna', link: '/' },
        { name: 'Użytkownicy', link: '/users' },
        { name: 'Elementy', link: '/items' },
        { name: 'Zdarzenia', link: '/events' },
      ]}
    >
      {children}
    </Layout>
  );
}
