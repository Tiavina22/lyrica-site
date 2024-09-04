$('.screenshoot').slick({
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 900,
    responsive: [
        {
            breakpoint: 1070,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1
            }
        },
        {
            breakpoint: 650,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
});
document.addEventListener('DOMContentLoaded', () => {
    const downloadButton = document.querySelector('#downloadButton');
    const downloadCountElement = document.querySelector('#downloadCount');

    // Fonction pour obtenir le nombre de téléchargements
    const getDownloadCount = async () => {
        try {
            const response = await fetch('/api/downloads');
            if (!response.ok) throw new Error('Erreur de réseau');
            const data = await response.json();
            downloadCountElement.textContent = `Nombre de téléchargements : ${data.count}`;
        } catch (error) {
            console.error('Erreur lors de la récupération du nombre de téléchargements :', error);
            downloadCountElement.textContent = 'Erreur lors de la récupération du nombre de téléchargements';
        }
    };

    // Fonction pour incrémenter le nombre de téléchargements
    const incrementDownloadCount = async () => {
        try {
            const response = await fetch('/api/downloads', { method: 'POST' });
            if (!response.ok) throw new Error('Erreur de réseau');
            const data = await response.json();
            downloadCountElement.textContent = `Nombre de téléchargements : ${data.count}`;
        } catch (error) {
            console.error('Erreur lors de l\'incrémentation du nombre de téléchargements :', error);
        }
    };

    // Mettre à jour le nombre de téléchargements au chargement de la page
    getDownloadCount();

    // Événement de clic sur le bouton de téléchargement
    downloadButton.addEventListener('click', () => {
        incrementDownloadCount();
    });
});
