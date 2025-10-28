# Bingo Musical

¡Una aplicación web interactiva para organizar y jugar al bingo musical con tus amigos y familiares!

## Descripción

Este proyecto es una aplicación web completa que te permite crear y gestionar tu propio juego de bingo musical. En lugar de números, los cartones se llenan con canciones. El anfitrión reproduce la música y los jugadores marcan las canciones en sus cartones. ¡El primero en completar su cartón grita "BINGO"!

La aplicación gestiona la configuración del juego, la creación de cartones, la reproducción de música a través de YouTube y la verificación de los ganadores.

## Características

- **Configuración Personalizada:** Define el número total de canciones en el universo del juego y cuántas canciones tendrá cada cartón.
- **Ingreso de Canciones:** Introduce manualmente tu propia lista de canciones con título, artista y enlace de YouTube.
- **Canciones de Ejemplo:** Carga una lista de canciones predefinida para empezar a jugar rápidamente.
- **Generación de Cartones:** Crea automáticamente la cantidad de cartones de bingo que necesites. Cada cartón es único.
- **Imprimir Cartones:** Imprime los cartones generados en un formato optimizado para papel.
- **Enviar por WhatsApp:** Envía los cartones digitales a los jugadores a través de WhatsApp con un solo clic.
- **Modo de Juego Interactivo:**
    - Reproduce las canciones de forma aleatoria desde una playlist de YouTube incrustada.
    - Muestra un contador de canciones para seguir el progreso del juego.
    - Ofrece un enlace de respaldo para abrir la canción en YouTube si la reproducción incrustada falla.
- **Verificación de Ganadores:** Introduce el ID de un cartón para comprobar automáticamente si ha resultado ganador según las canciones que ya han sonado.

## ¿Cómo se usa?

1.  **Abre la aplicación:** Simplemente abre el archivo `index.html` en tu navegador web preferido (como Chrome, Firefox, etc.).
2.  **Configura el Juego:**
    - **Opción A:** Usa los campos del "Paso 1" para definir el total de canciones y el tamaño de los cartones, y luego ingresa tus canciones en el "Paso 2".
    - **Opción B:** Haz clic en "Cargar Canciones de Ejemplo" para empezar a jugar inmediatamente.
3.  **Genera los Cartones:** En el "Paso 3", especifica cuántos cartones quieres y haz clic en "Generar Cartones".
4.  **Distribuye los Cartones:**
    - Usa el botón "Imprimir Cartones" para tenerlos en formato físico.
    - Usa el botón "Enviar por WhatsApp" en cada cartón digital para compartirlo.
5.  **¡A Jugar!:** Presiona "¡Empezar a Jugar!". Las canciones comenzarán a sonar una por una.
6.  **Verifica a los Ganadores:** Cuando un jugador anuncie "BINGO", introduce el ID de su cartón en la sección "Verificar Cartón" y haz clic en "Verificar" para confirmar los aciertos.

## Tecnologías Utilizadas

- **HTML5:** Para la estructura de la aplicación.
- **CSS3:** Para el diseño, la apariencia y la capacidad de respuesta.
- **JavaScript (ES6+):** Para toda la lógica del juego, la interactividad y la manipulación del DOM.
