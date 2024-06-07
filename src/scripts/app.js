"use strict";

function burgerMenu() {
    var boutonBurgerMenu = document.querySelector(".burgermenu");
    var listeSvgBurgermenu = document.querySelectorAll(".burgermenu__svg");
    var menuListe = document.querySelector(".nav__menu");

    if (boutonBurgerMenu && listeSvgBurgermenu && menuListe) {
        var activateBurgermenu = function activateBurgermenu() {
            listeSvgBurgermenu.forEach(function (svg) {
                if (svg.classList.contains("svg--active")) {
                    svg.classList.toggle("svg--inactive");
                    svg.classList.toggle("svg--active");
                } else if (svg.classList.contains("svg--inactive")) {
                    svg.classList.toggle("svg--active");
                    svg.classList.toggle("svg--inactive");
                }
            });
            menuListe.classList.toggle("nav__menu--active");
        };

        boutonBurgerMenu.addEventListener("click", activateBurgermenu);
    }
    
    var liensMenu = document.querySelectorAll(".nav__menu li a");
    liensMenu.forEach(function(lien) {
        lien.addEventListener("click", function() {
            menuListe.classList.remove("nav__menu--active");
        });
    });
}

burgerMenu();

if (document.querySelector('.slider')) {
document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slider__slide');
    const indicators = document.querySelectorAll('.slider__indicator');
    const readMoreButton = document.getElementById('lirePlus');
    const popupContent = document.getElementById('popup__texte');
    const popup = document.getElementById('popup');
    const closeBtn = document.querySelector('.popup__close');
    const prevButton = document.querySelector('.slider__nav--prev');
    const nextButton = document.querySelector('.slider__nav--next');
    const slider = document.querySelector('.slider');
    const totalSlides = slides.length;

    let currentIndex = 0;
    let isAnimating = false;

    // Clone first and last slide for infinite loop effect
    const firstSlide = slides[0].cloneNode(true);
    const lastSlide = slides[totalSlides - 1].cloneNode(true);

    slider.appendChild(firstSlide);
    slider.insertBefore(lastSlide, slides[0]);

    function updateSlider(index, animate = true) {
        if (animate) {
            slider.style.transition = 'transform 0.5s ease-in-out';
        } else {
            slider.style.transition = 'none';
        }
        slider.style.transform = `translateX(-${(index + 1) * 100}%)`;
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('slider__indicator--active', i === index);
        });
    }

    function goToSlide(index) {
        if (isAnimating) return;
        isAnimating = true;

        currentIndex = index;
        updateSlider(currentIndex);

        setTimeout(() => {
            if (currentIndex === -1) {
                slider.style.transition = 'none';
                currentIndex = totalSlides - 1;
                updateSlider(currentIndex, false);
            } else if (currentIndex === totalSlides) {
                slider.style.transition = 'none';
                currentIndex = 0;
                updateSlider(currentIndex, false);
            }
            isAnimating = false;
        }, 500);
    }

    function showPopup(title, paragraph1, paragraph2, linkText, linkURL) {
        popupContent.innerHTML = `
            <h3>${title}</h3>
            <p>${paragraph1}</p>
            <p>${paragraph2}</p>
            <a href="${linkURL}">${linkText}</a>
        `;
        popup.classList.add('popup--active');
    }

    function closePopup() {
        popup.classList.remove('popup--active');
    }

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            goToSlide(index);
        });
    });

    readMoreButton.addEventListener('click', () => {
        const contents = [
            {
                title: "ReadImAde",
                paragraph1: "ReadImAde est un&nbsp;projet sur lequel nous avions dû travailler au&nbsp;premier quadrimestre. Le but de ce&nbsp;projet était de changer la&nbsp;vision des choses qui nous&nbsp;entourent.",
                paragraph2: "Nous avions dû trouver un&nbsp;objet et lui donner une&nbsp;identité.",
                linkText: "En découvrir plus",
                linkURL: "http://sebastien-leonardi.be/projets/readimade/"
            },
            {
                title: "Projet Décembre",
                paragraph1: "Le projet intitulé \"Décembre\" est un&nbsp;projet où nous devions choisir un&nbsp;article dans une&nbsp;liste et créer une&nbsp;page dans le style e-commence afin de&nbsp;vendre cet article.",
                paragraph2: "J'ai choisi l\'album appelé&nbsp;Free-d du groupe Ecstasy of Saint&nbsp;Theresa.",
                linkText: "En découvrir plus",
                linkURL: "http://sebastien-leonardi.be/projets/decembre/"
            },
            {
              title: "Dataplay",
              paragraph1: "Dataplay est un&nbsp;travail de groupe. À 5, nous avions choisi un thème par lequel nous&nbsp;étions intéressés.",
              paragraph2: "Nous avons donc conçu un&nbsp;jeu sur la carte de l\'Europe, avec des&nbsp;cartes à collectionner et des&nbsp;questions sur les pays.",
              linkText: "En découvrir plus",
              linkURL: "http://sebastien-leonardi.be/projets/dataplay/dataplay/"
            },
            {
              title: "Rethinking UX",
              paragraph1: "Rethinking UX 2024 est un&nbsp;projet réalisé d\'abord en groupe. Le&nbsp;but était de repenser les locaux dans lesquels nous&nbsp;travaillons.",
              paragraph2: "Nous avons donc décidé de s\'attaquer aux typographies, en créant des&nbsp;posters permettant d\'aider les&nbsp;élèves à choisir des polices.",
              linkText: "En découvrir plus",
              linkURL: "http://sebastien-leonardi.be/projets/rethinking-ux2024/"
            }
        ];

        const { title, paragraph1, paragraph2, linkText, linkURL } = contents[currentIndex];
        showPopup(title, paragraph1, paragraph2, linkText, linkURL);
    });

    closeBtn.addEventListener('click', closePopup);

    prevButton.addEventListener('click', () => {
        goToSlide(currentIndex - 1);
    });

    nextButton.addEventListener('click', () => {
        goToSlide(currentIndex + 1);
    });

    let startX, endX;
    document.querySelector('.slider__container').addEventListener('touchstart', (e) => {
        startX = e.changedTouches[0].clientX;
    });

    document.querySelector('.slider__container').addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        if (startX > endX + 50) {
            goToSlide(currentIndex + 1);
        } else if (startX < endX - 50) {
            goToSlide(currentIndex - 1);
        }
    });

    document.querySelector('.slider__container').addEventListener('mousedown', (e) => {
        startX = e.clientX;
    });

    document.querySelector('.slider__container').addEventListener('mouseup', (e) => {
        endX = e.clientX;
        if (startX > endX + 50) {
            goToSlide(currentIndex + 1);
        } else if (startX < endX - 50) {
            goToSlide(currentIndex - 1);
        }
    });

    // Initial update to set up slider position
    updateSlider(currentIndex, false);
});
}



if (document.getElementById('boutonReset')) {
    if (document.getElementById('boutonReset')) {
        // Liste de mots à deviner
        const words = ['hello', 'world', 'javascript', 'ordinateur', 'programmation', 'algorithme', 'internet', 'application', 'developpeur', 'balise', 'site', 'mobile', 'ordinateur', 'tablette', 'souris', 'clavier', 'portfolio', 'logiciel', 'processeur', 'ecran', 'variable', 'constante', 'fonction', 'boucle', 'condition', 'interface', 'experience'];
    
        let word; // Mot à deviner
        let guessedWord; // Mot caché (avec les lettres devinées)
        let lives; // Vies restantes
        let score = 0; // Score du joueur
    
        const wordContainer = document.getElementById('hiddenWord');
        const livesDisplay = document.getElementById('vies');
        const lettersContainer = document.getElementById('letters');
        const scoreDisplay = document.getElementById('points');
    
        // Initialisation du jeu
        function initGame() {
            word = words[Math.floor(Math.random() * words.length)];
            guessedWord = '_'.repeat(word.length);
            lives = 8;
    
            wordContainer.classList.remove('lostWord');
            wordContainer.classList.remove('wonWord'); // Retire la classe wonWord
            displayWord();
            displayLetters();
            updateLivesDisplay();
        }
    
        // Affiche le mot caché avec les lettres devinées
        function displayWord() {
            wordContainer.textContent = guessedWord.split('').join(' ');
        }
    
        // Affiche les lettres disponibles pour deviner
        function displayLetters() {
            lettersContainer.innerHTML = '';
            for (let i = 97; i <= 122; i++) {
                const letter = String.fromCharCode(i);
                const btn = document.createElement('button');
                btn.textContent = letter;
                btn.addEventListener('click', () => guessLetter(letter));
                lettersContainer.appendChild(btn);
            }
        }
    
        // Vérifie si la lettre proposée est dans le mot
        // Vérifie si la lettre proposée est dans le mot
        function guessLetter(letter) {
            if (lives === 0 || guessedWord === word) return; // Arrête le jeu si le joueur a perdu ou gagné

            if (word.includes(letter)) {
                for (let i = 0; i < word.length; i++) {
                    if (word[i] === letter) {
                        guessedWord = guessedWord.substring(0, i) + letter + guessedWord.substring(i + 1);
                    }
                }
                displayWord();
                if (guessedWord === word) {
                    score++;
                    scoreDisplay.textContent = score;
                    wordContainer.classList.add('wonWord');
                    animateWordWon();
                    setTimeout(initGame, 2000);
                } else {
                    animateLetterGuessed(letter);
                }
            } else {
                lives--;
                updateLivesDisplay();
                if (lives === 0) {
                    score = 0;
                    scoreDisplay.textContent = score;
                    wordContainer.textContent = word.split('').join(' ');
                    wordContainer.classList.add('lostWord');
                    animateWordLost();
                    setTimeout(initGame, 2000);
                } else {
                    animateLetterGuessed(letter);
                }
            }
        }

    
        // Met à jour l'affichage des vies restantes
        function updateLivesDisplay() {
            livesDisplay.textContent = lives;
        }
    
        // Animation lorsque la lettre est devinée
        // Animation lorsque la lettre est devinée
        function animateLetterGuessed(letter) {
            const letterBtn = document.querySelector(`#letters button:nth-child(${letter.charCodeAt(0) - 96})`);
            if (word.includes(letter)) {
                letterBtn.classList.add('animate-correct-guess'); // Ajoute une classe pour l'animation de la lettre correctement devinée
            } else {
                letterBtn.classList.add('animate-incorrect-guess'); // Ajoute une classe pour l'animation de la lettre incorrectement devinée
            }
            setTimeout(() => {
                letterBtn.classList.remove('animate-correct-guess'); // Retire la classe après 1 seconde
                letterBtn.classList.remove('animate-incorrect-guess'); // Retire la classe après 1 seconde
            }, 1000);
        }




        // Animation pour célébrer la victoire du joueur
        function animateWordWon() {
            // Ajoutez une animation pour célébrer la victoire du joueur, par exemple, des confettis qui tombent ou un écran qui tremble
            // Vous pouvez utiliser des classes CSS pour définir les animations
            const gameContainer = document.querySelector('.pendu');
            gameContainer.classList.add('animate-word-won');
            setTimeout(() => {
                gameContainer.classList.remove('animate-word-won');
            }, 2000);
        }
    
        // Animation pour signaler la défaite du joueur
        function animateWordLost() {
            // Ajoutez une animation pour signaler la défaite du joueur, par exemple, faire bouger le pendu ou afficher un écran clignotant
            // Vous pouvez utiliser des classes CSS pour définir les animations
            const gameContainer = document.querySelector('.pendu');
            gameContainer.classList.add('animate-word-lost');
            setTimeout(() => {
                gameContainer.classList.remove('animate-word-lost');
            }, 2000);
        }
    
        // Réinitialise le jeu lorsque le joueur clique sur "Nouvelle partie"
        document.getElementById('boutonReset').addEventListener('click', () => {
            initGame();
            score = 0; // Réinitialise le score à zéro
            scoreDisplay.textContent = score; // Met à jour l'affichage du score
        });
    
        // Démarrage du jeu
        initGame();
    }
    

}