document.addEventListener('DOMContentLoaded', () => {

    // Referencias a los elementos del DOM
    const setupSection = document.getElementById('setup-section');
    const songInputSection = document.getElementById('song-input-section');
    const mainControls = document.getElementById('main-controls');
    const gameSection = document.getElementById('game-section');
    const verificationSection = document.getElementById('verification-section');
    const cardDisplayArea = document.getElementById('card-display-area');

    const startSetupBtn = document.getElementById('start-setup-btn');
    const saveSongsBtn = document.getElementById('save-songs-btn');
    const generateCardsBtn = document.getElementById('generate-cards-btn');
    const printCardsBtn = document.getElementById('print-cards-btn');
    const startGameBtn = document.getElementById('start-game-btn');
    const verifyCardBtn = document.getElementById('verify-card-btn');
    const nextSongBtn = document.getElementById('next-song-btn');
    const loadDefaultsBtn = document.getElementById('load-defaults-btn');

    const totalSongsInput = document.getElementById('total-songs');
    const cardSizeInput = document.getElementById('card-size');
    const songForm = document.getElementById('song-form');
    const numCardsInput = document.getElementById('num-cards');
    const cardIdInput = document.getElementById('card-id-input');
    const verificationResult = document.getElementById('verification-result');
    const youtubePlayer = document.getElementById('youtube-player');
    const songCounter = document.getElementById('song-counter');
    const playbackIssueP = document.getElementById('playback-issue');
    const youtubeFallbackLink = document.getElementById('youtube-fallback-link');


    // Variables para almacenar el estado del juego
    let totalSongs = 0;
    let cardSize = 0;
    let songUniverse = []; // Array con todas las canciones ingresadas
    let generatedCards = []; // Array con los cartones generados
    let shuffledPlaylist = []; // Array de canciones desordenado para jugar
    let playedSongs = []; // Array de canciones que ya se han reproducido
    let currentSongIndex = -1;

    console.log("Bingo Musical listo para empezar!");

    // --- FUNCIONES AUXILIARES ---
    const shuffleArray = (array) => {
        const newArr = [...array];
        for (let i = newArr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
        }
        return newArr;
    };

    const extractYouTubeID = (url) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    // --- LÓGICA DE CONFIGURACIÓN ---
    startSetupBtn.addEventListener('click', () => {
        totalSongs = parseInt(totalSongsInput.value, 10);
        cardSize = parseInt(cardSizeInput.value, 10);

        if (isNaN(totalSongs) || isNaN(cardSize) || totalSongs <= 0 || cardSize <= 0) {
            alert("Por favor, ingresa números válidos para la configuración.");
            return;
        }

        if (cardSize >= totalSongs) {
            alert("El número de canciones por cartón debe ser menor que el total de canciones.");
            return;
        }

        setupSection.style.display = 'none';
        songInputSection.style.display = 'block';

        songForm.innerHTML = '';
        for (let i = 1; i <= totalSongs; i++) {
            const songFields = document.createElement('div');
            songFields.classList.add('form-group');
            songFields.innerHTML = `
                <h4>Canción ${i}</h4>
                <input type="text" placeholder="Título de la canción" class="song-title" required>
                <input type="text" placeholder="Artista" class="song-artist" required>
                <input type="url" placeholder="Link de YouTube" class="song-url" required>
            `;
            songForm.appendChild(songFields);
        }
    });

    // --- LÓGICA DE GUARDADO DE CANCIONES ---
    saveSongsBtn.addEventListener('click', () => {
        songUniverse = [];
        const songInputs = songForm.querySelectorAll('.form-group');
        let allFieldsValid = true;

        songInputs.forEach(group => {
            const title = group.querySelector('.song-title').value.trim();
            const artist = group.querySelector('.song-artist').value.trim();
            const url = group.querySelector('.song-url').value.trim();

            if (!title || !artist || !url) {
                allFieldsValid = false;
            }
            
            songUniverse.push({ title, artist, url });
        });

        if (!allFieldsValid) {
            alert("Por favor, completa todos los campos para cada canción.");
            return;
        }

        songInputSection.style.display = 'none';
        mainControls.style.display = 'block';
        alert(`¡Universo de ${songUniverse.length} canciones creado! Ahora puedes generar los cartones.`);
    });

    // --- LÓGICA DE CARGA DE DATOS POR DEFECTO ---
    loadDefaultsBtn.addEventListener('click', () => {
        console.log("Botón 'Cargar Ejemplos' presionado.");
        if (typeof defaultSongUniverse !== 'undefined' && defaultSongUniverse.length > 0) {
            songUniverse = defaultSongUniverse;
            totalSongs = songUniverse.length;
            cardSize = parseInt(cardSizeInput.value, 10);

            // Actualizar la UI
            totalSongsInput.value = totalSongs;

            setupSection.style.display = 'none';
            songInputSection.style.display = 'none';
            mainControls.style.display = 'block';

            console.log(`Universo de canciones cargado con ${songUniverse.length} canciones. Mostrando controles principales.`);
            alert(`${totalSongs} canciones de ejemplo han sido cargadas. Ahora puedes generar los cartones.`);
        } else {
            console.error("Error: defaultSongUniverse no está definido o está vacío.");
            alert("No se encontraron datos de ejemplo para cargar.");
        }
    });



    // --- LÓGICA DE GENERACIÓN DE CARTONES ---
    generateCardsBtn.addEventListener('click', () => {
        console.log("Botón 'Generar Cartones' presionado.");
        const numCards = parseInt(numCardsInput.value, 10);
        if (isNaN(numCards) || numCards <= 0) {
            alert("Ingresa un número válido de cartones a generar.");
            return;
        }

        generatedCards = [];
        cardDisplayArea.innerHTML = '';

        for (let i = 1; i <= numCards; i++) {
            const cardId = `BINGO-${i.toString().padStart(3, '0')}`;
            const shuffledSongs = shuffleArray(songUniverse);
            const selectedSongs = shuffledSongs.slice(0, cardSize);
            
            const card = { id: cardId, songs: selectedSongs };
            generatedCards.push(card);
            
            displayCard(card);
        }
        console.log(`${generatedCards.length} cartones generados.`);

        printCardsBtn.style.display = 'inline-block';
        startGameBtn.style.display = 'inline-block';
    });
    
    function displayCard(card) {
        const cardElement = document.createElement('div');
        cardElement.classList.add('bingo-card');
        
        let songsHTML = '';
        card.songs.forEach(song => {
            songsHTML += `
                <div class="song-item">
                    <div class="song-title">${song.title}</div>
                    <div class="song-artist">${song.artist}</div>
                </div>
            `;
        });

        cardElement.innerHTML = `
            <div class="bingo-card-header">
                <div class="bingo-card-id">${card.id}</div>
            </div>
            <div class="bingo-card-songs">
                ${songsHTML}
            </div>
        `;
        cardDisplayArea.appendChild(cardElement);
    }


    // --- LÓGICA DE IMPRESIÓN ---
    printCardsBtn.addEventListener('click', () => {
        window.print();
    });

    // --- LÓGICA DE INICIO DEL JUEGO ---
    startGameBtn.addEventListener('click', () => {
        console.log("Botón 'Empezar a Jugar' presionado.");
        mainControls.style.display = 'none';
        cardDisplayArea.style.display = 'none';
        printCardsBtn.style.display = 'none';
        
        gameSection.style.display = 'block';
        verificationSection.style.display = 'block';
        console.log("Sección de juego y verificación deberían estar visibles.");

        shuffledPlaylist = shuffleArray(songUniverse);
        playedSongs = [];
        currentSongIndex = -1;

        nextSongBtn.disabled = false;
        nextSongBtn.click(); // Inicia con la primera canción
    });

    // --- LÓGICA DE REPRODUCCIÓN ---
    nextSongBtn.addEventListener('click', () => {
        currentSongIndex++;
        if (currentSongIndex >= shuffledPlaylist.length) {
            alert("¡Fin del juego! Se han reproducido todas las canciones.");
            songCounter.innerText = `Juego terminado. Se tocaron ${shuffledPlaylist.length} canciones.`;
            youtubePlayer.src = "";
            nextSongBtn.disabled = true;
            if (playbackIssueP) playbackIssueP.style.display = 'none'; // Hide on game end
            return;
        }

        const currentSong = shuffledPlaylist[currentSongIndex];
        playedSongs.push(currentSong);

        const videoId = extractYouTubeID(currentSong.url);
        if (videoId) {
            youtubePlayer.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
            if (youtubeFallbackLink) youtubeFallbackLink.href = currentSong.url;
            if (playbackIssueP) playbackIssueP.style.display = 'block';
        } else {
            console.error("URL de YouTube inválida:", currentSong.url);
            youtubePlayer.src = ""; // Clear the player
            if (playbackIssueP) playbackIssueP.style.display = 'none';
            // Opcional: saltar a la siguiente canción si la URL es mala
            // nextSongBtn.click(); 
        }

        songCounter.innerText = `Canción ${currentSongIndex + 1} de ${shuffledPlaylist.length}`;
    });

    // --- LÓGICA DE VERIFICACIÓN ---
    verifyCardBtn.addEventListener('click', () => {
        const cardIdToVerify = cardIdInput.value.trim().toUpperCase();
        if (!cardIdToVerify) {
            verificationResult.innerHTML = "Por favor, ingresa un ID de cartón.";
            return;
        }

        const card = generatedCards.find(c => c.id.toUpperCase() === cardIdToVerify);

        if (!card) {
            verificationResult.innerHTML = `No se encontró ningún cartón con el ID "${cardIdToVerify}".`;
            return;
        }

        const playedUrls = new Set(playedSongs.map(s => s.url));
        let matches = 0;
        card.songs.forEach(song => {
            if (playedUrls.has(song.url)) {
                matches++;
            }
        });

        if (matches === cardSize) {
            verificationResult.innerHTML = `<strong>¡BINGO!</strong> El cartón ${card.id} está completo. ¡Felicidades!`;
            verificationResult.style.color = 'green';
        } else {
            verificationResult.innerHTML = `El cartón ${card.id} tiene ${matches} de ${cardSize} aciertos. ¡Sigue jugando!`;
            verificationResult.style.color = 'black';
        }
    });
});
