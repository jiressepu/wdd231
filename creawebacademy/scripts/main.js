function renderCourses(courses) {
    const courseListContainer = document.getElementById('course-list');
    courseListContainer.innerHTML = ''; // Effacer les anciens éléments
    courses.forEach(course => {
        const courseElement = document.createElement('div');
        courseElement.classList.add('course');
        courseElement.innerHTML = `
            <h3>${course.title}</h3>
            <button class="view-course-btn">View Details</button>
        `;
        courseElement.setAttribute('data-title', course.title);  // Ajouter un attribut de données pour le titre
        courseElement.setAttribute('data-description', course.description);  // Ajouter un attribut de données pour la description
        courseListContainer.appendChild(courseElement);
    });
}

// Fonction pour afficher la modale avec plus de détails sur un cours
function showModal(title, description) {
    const modal = document.getElementById('modal');
    const modalData = document.getElementById('modal-data');
    modalData.innerHTML = `
        <h2>${title}</h2>
        <p>${description}</p>
    `;
    modal.style.display = 'flex';
}

// Fonction pour fermer la modale
function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

// Fonction pour charger les données depuis un fichier JSON local
async function loadCourses() {
    try {
        const response = await fetch('data/cours.json');  // Assurez-vous que le chemin est correct
        const coursesData = await response.json();
        renderCourses(coursesData);
    } catch (error) {
        console.error("Erreur lors du chargement des cours:", error);
    }
}

// Ajout d'événements
document.getElementById('fetchDataBtn').addEventListener('click', loadCourses);
document.getElementById('closeModal').addEventListener('click', closeModal);

// Ajouter un gestionnaire d'événements pour les clics sur les boutons "View Details"
document.getElementById('course-list').addEventListener('click', function(event) {
    if (event.target.classList.contains('view-course-btn')) {
        const courseElement = event.target.closest('.course');  // Trouver l'élément du cours contenant le bouton
        const courseTitle = courseElement.getAttribute('data-title');  // Récupérer le titre depuis l'attribut data
        const courseDesc = courseElement.getAttribute('data-description');  // Récupérer la description depuis l'attribut data
        showModal(courseTitle, courseDesc);  // Afficher les détails dans la modale
    }
});
// Sélectionner le bouton hamburger et la liste de navigation
const hamburgerMenu = document.querySelector('.hamburger-menu');
const navList = document.querySelector('.nav-list');

// Ajouter un écouteur d'événement sur le clic du bouton hamburger
hamburgerMenu.addEventListener('click', () => {
    // Toggle la classe 'active' sur la liste de navigation pour l'afficher/masquer
    navList.classList.toggle('active');
});
// Initialisation des cours
loadCourses();  // Charger les cours au démarrage

// Exemple de redirection après la soumission du formulaire
document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault(); // Empêcher le rechargement de la page

    // Traitez le formulaire via AJAX si nécessaire

    // Redirigez vers la page de remerciement
    window.location.href = 'thank-you.html';
});
document.querySelector('form').addEventListener('submit', function(event) {
    // Empêcher la soumission par défaut pour faire une validation côté client
    event.preventDefault();

    // Vérifier si les mots de passe sont identiques
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
        alert("Les mots de passe ne correspondent pas.");
    } else {
        // Soumettre le formulaire après validation
        this.submit();
    }
});
