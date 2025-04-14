//Pagina Inicial

import styles from './mainPage.module.css';

function MainPage() {
  return (
    <>
      <section className={styles.section}>
        <h2>O Problema</h2>
        <p>
        No mundo moderno, muitos donos de animais de estimação enfrentam dificuldades para garantir que seus animais de estimação recebam os cuidados diários de que acontecerão, especialmente em relação aos passeios regulares. Com rotinas cada vez mais exigentes, falta de tempo e compromissos inesperados, muitos donos de animais de estimação se veem impossibilitados de oferecer a atenção necessária para seus cães, o que pode resultar em problemas de comportamento, saúde e bem-estar dos animais.
        Além disso, encontrar alguém de confiança para passear com os animais de estimação, especialmente em cima da hora, pode ser um desafio. Embora existam serviços de pet sitter e dog walker, eles nem sempre são acessíveis ou simples de agendar, deixando aos donos de animais de estimação sem uma solução prática e rápida para atender às necessidades diárias de seus animais.
        </p>
      </section>
      <section className={styles.section}>
        <h2>A Solução</h2>
        <p>
        O Au-migo foi desenvolvido para resolver este problema, oferecendo uma solução simples e eficiente para conectar donos de animais de estimação a passeadores de animais de confiança, de maneira rápida e segura. A aplicação foi pensada para facilitar a vida dos donos de animais de estimação, permitindo que eles encontrem e contratem pet walkers disponíveis em sua região com apenas alguns cliques.
        </p>
      </section>
      <section className={styles.section}>
        <h2>Colaboradores</h2>
        <ul>
          <li>Mikael Sousa Bueno</li>
          <li>Leonardo Peron Krause</li>
          <li>Willian Scheuermann</li>
          <li>Giordano Cerutti Cassini</li>
          <li>Riskala Tedoldi</li>
        </ul>
      </section>
    </>
  );
}

export default MainPage;
