document.addEventListener('DOMContentLoaded', function() {
    var modal = document.getElementById("modal");
    var modalContentWrapper = document.getElementById("modalContentWrapper");
    var modalImage = document.getElementById("modalImage");
    var closeModal = document.getElementById("closeModal");
    var relatedImagesContainer = document.getElementById("related-images");
    var leftArrow = document.getElementById("leftArrow");
    var rightArrow = document.getElementById("rightArrow");
    var currentCategoryImages = [];
    var currentIndex = 0;

    // Fonction pour ouvrir le modal avec l'image sélectionnée
    function openModal(img) {
        console.log("Modal ouvert avec l'image :", img.src);
        modal.style.display = "flex";
        modalContentWrapper.style.display = "flex";
        modalImage.src = img.src;

        // Identifie la catégorie de l'image en utilisant le dossier dans le chemin de l'image
        var category = img.src.split('/')[1];
        console.log("Catégorie détectée :", category);

        // Récupère toutes les images de la même catégorie
        currentCategoryImages = Array.from(document.querySelectorAll(`.image-grid img[src*="${category}"]`));
        console.log("Images dans la même catégorie :", currentCategoryImages);

        // Définit l'index actuel de l'image cliquée
        currentIndex = currentCategoryImages.findIndex(image => image.src === img.src);
        console.log("Index de l'image actuelle :", currentIndex);

        generateRelatedImages();
    }

    // Fonction pour générer des images similaires dans la même catégorie
    function generateRelatedImages() {
        relatedImagesContainer.innerHTML = ''; // Vide la section avant d'ajouter

        // Affiche les premières images de la même catégorie sous l'image principale
        currentCategoryImages.forEach(function(img, index) {
            var imgElement = document.createElement("img");
            imgElement.src = img.src;
            imgElement.alt = img.alt;
            relatedImagesContainer.appendChild(imgElement);
            console.log("Ajout de l'image similaire :", img.src);

            // Événement pour cliquer sur une image de suggestion
            imgElement.addEventListener('click', function() {
                showImageAtIndex(index);
            });
        });
    }

    // Fonction pour afficher l'image à un index donné dans la liste de la catégorie actuelle
    function showImageAtIndex(index) {
        currentIndex = (index + currentCategoryImages.length) % currentCategoryImages.length;
        modalImage.src = currentCategoryImages[currentIndex].src;
        console.log("Image affichée :", modalImage.src);
    }

    // Événements pour les flèches de navigation
    leftArrow.addEventListener('click', function() {
        showImageAtIndex(currentIndex - 1); // Image précédente
    });

    rightArrow.addEventListener('click', function() {
        showImageAtIndex(currentIndex + 1); // Image suivante
    });

    // Ouvre le modal lorsqu'une image de la galerie est cliquée
    var images = document.querySelectorAll('.image-grid img');
    images.forEach(function(img) {
        img.addEventListener('click', function() {
            openModal(this);
        });
    });

    // Ferme le modal
    closeModal.onclick = function() {
        modal.style.display = "none";
        console.log("Modal fermé.");
    };

    // Ferme le modal en cliquant en dehors du contenu
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            console.log("Modal fermé en cliquant en dehors.");
        }
    };
});
