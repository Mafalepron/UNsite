// UNevent Animation - минимальная версия
function animateUneventText() {
    const letters = ['letterU', 'letterN', 'letterE1', 'letterV', 'letterE2', 'letterN2', 'letterT'];
    let currentLetter = 0;
    
    const animateNextLetter = () => {
        if (currentLetter < letters.length) {
            const letterElement = document.getElementById(letters[currentLetter]);
            if (letterElement) {
                letterElement.classList.add('animate');
                currentLetter++;
                setTimeout(animateNextLetter, 600);
            }
        }
    };
    
    animateNextLetter();
}
