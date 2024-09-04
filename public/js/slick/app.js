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

    const getDownloadCount = async () => {
        const response = await fetch('/api/downloads');
        const data = await response.json();
        downloadCountElement.textContent = `Nombre de téléchargements : ${data.count}`;
    };

    const incrementDownloadCount = async () => {
        await fetch('/api/downloads', { method: 'POST' });
        getDownloadCount();
    };

    getDownloadCount();

    downloadButton.addEventListener('click', () => {
        incrementDownloadCount();
    });
});