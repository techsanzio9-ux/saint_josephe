<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>École Saint Joseph</title>

    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.13/cropper.min.css">
    <head>
   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">

</head>

<body>

    <!-- NAVBAR ACCUEIL -->
    <div class="navbar">
        <h1>École Saint Joseph</h1>
        <div class="nav-links">
            <a href="#">Accueil</a>
            <a href="#">Inscription</a>
            <a href="#">Galerie</a>
            <a href="#">Palmarès</a>
            <a href="#">Nous contacter</a>
        </div>
    </div>

    <!-- CONTENU ACCUEIL -->
<div class="container">

        <!-- Présentation -->
    <div class="col presentation">
            <h2>Présentation de l'école</h2>
          <p>
        L’École Saint Joseph est une institution éducative fondée avec la conviction profonde que chaque enfant mérite une formation complète, équilibrée et adaptée aux défis du monde moderne. Située au cœur de notre communauté, elle se veut un lieu d’apprentissage, de croissance et d’épanouissement où les élèves découvrent non seulement les savoirs académiques, mais aussi les valeurs humaines essentielles telles que le respect, la solidarité et la responsabilité.

        Notre mission est de former des citoyens conscients, capables de contribuer activement au développement de leur pays et de s’intégrer harmonieusement dans une société en constante évolution. Pour atteindre cet objectif, nous mettons l’accent sur une pédagogie moderne, interactive et participative, qui encourage la curiosité intellectuelle, l’esprit critique et la créativité. Les enseignants, hautement qualifiés et passionnés, accompagnent chaque élève dans son parcours, en tenant compte de ses talents et de ses besoins spécifiques.

        L’École Saint Joseph se distingue également par son environnement accueillant et sécurisé. Les infrastructures sont conçues pour favoriser l’apprentissage dans les meilleures conditions : des salles de classe lumineuses et équipées, une bibliothèque riche en ressources, des espaces de jeux et de sport, ainsi que des outils numériques intégrés dans le processus éducatif. Nous croyons que l’éducation ne se limite pas aux manuels scolaires, mais qu’elle doit aussi ouvrir les portes vers la culture, les arts et la découverte scientifique.

        Au‑delà de l’enseignement, nous cultivons un esprit de famille et de communauté. Les élèves apprennent à travailler en équipe, à respecter la diversité et à développer des compétences sociales indispensables pour leur avenir. Les parents sont des partenaires actifs dans le processus éducatif, et nous encourageons une collaboration étroite entre la maison et l’école afin de garantir la réussite de chaque enfant.

        En choisissant l’École Saint Joseph, vous optez pour une formation qui allie excellence académique, valeurs morales et ouverture sur le monde. Nous sommes fiers de préparer les générations futures à relever les défis de demain, avec confiance, compétence et humanité.
        </p>    
    </div>

        <!-- Carte + Slider -->
    <div class="col">

        <div class="map">
            <iframe src="https://www.google.com/maps/embed?pb=!1m14..." allowfullscreen loading="lazy"></iframe>
        </div>

        <div class="slider">
            <div class="slides">
            <img src="images/photo1.jpg" alt="Photo 1">
            <img src="images/photo2.jpg" alt="Photo 2">
            <img src="images/photo3.jpg" alt="Photo 3">
            <img src="images/photo4.jpg" alt="Photo 4">
        </div>
            <button class="prev" onclick="moveSlide(-1)">◀</button>
            <button class="next" onclick="moveSlide(1)">▶</button>
           
        </div>
    </div>
</div>

    <!-- SECTION INSCRIPTION -->
    <div class="inscription-nav">
        <h1>INSCRIPTION</h1>
    </div>

    <div class="inscription-container">

        <!-- FORMULAIRE ELEVE -->
        <div class="inscription-col col-large">
            <h2>Formulaire Élève</h2>

            <div class="photo-upload" id="photoPreview">Photo de l'élève</div>

            <!-- DEUX OPTIONS -->
            <button id="btnCamera" class="submit-btn">📷 Prendre une photo</button>
            <input type="file" id="photoInput" accept="image/*">
        
            <label>Nom</label>
            <input type="text" id="eleve_nom">

            <label>Postnom</label>
            <input type="text" id="eleve_postnom">

            <label>Prénom</label>
            <input type="text" id="eleve_prenom">

            <label>Date de naissance</label>
            <input type="date" id="eleve_dob">

            <label>Lieu de naissance</label>
                <input list="chefLieuxList" id="eleve_lieu" placeholder="Choisir ou écrire..." autocomplete="off">
                <datalist id="chefLieuxList"></datalist>

            <label>Sexe</label>
            <select id="eleve_sexe">
                <option>Masculin</option>
                <option>Féminin</option>
            </select>

            <label>Adresse</label>
            <input type="text" id="eleve_adresse">

            <label>Classe d'inscription</label>
            <select id="eleve_classe">
                <option>Maternelle</option>
                <option>1ère Primaire</option>
                <option>2ème Primaire</option>
                <option>3ème Primaire</option>
                <option>4ème Primaire</option>
                <option>5ème Primaire</option>
                <option>6ème Primaire</option>
            </select>
        </div>

        <!-- FORMULAIRE TUTEUR -->
        <div class="inscription-col col-large">
            <h2>Tuteur / Responsable</h2>

            <label>Nom</label>
            <input type="text" id="tuteur_nom">

            <label>Postnom</label>
            <input type="text" id="tuteur_postnom">

            <label>Prénom</label>
            <input type="text" id="tuteur_prenom">

            <label>Téléphone</label>
            <input type="text" id="tuteur_tel">

            <label>Adresse</label>
            <input type="text" id="tuteur_adresse">

            <label>Sexe</label>
            <select id="tuteur_sexe">
                <option>Masculin</option>
                <option>Féminin</option>
            </select>

            <label>Qui êtes-vous pour l'élève ?</label>
            <select id="tuteur_relation">
                <option>Mère</option>
                <option>Père</option>
                <option>Frère</option>
                <option>Sœur</option>
                <option>Oncle</option>
                <option>Tante</option>
                <option>Grand-père</option>
                <option>Grand-mère</option>
                <option>Beau-frère</option>
                <option>Autre</option>
            </select>
        </div>

        <!-- DOSSIER -->
        <div class="inscription-col col-small">
            <h2>Dossier de l'élève</h2>

            <label>Bulletin précédent</label>
            <input type="file">

            <label>Autres documents</label>
            <input type="file">
        </div>

        <!-- BOUTON SOUMETTRE -->
        <div style="width:100%; text-align:center; margin-top:20px;">
            <button id="btnSoumettre" class="submit-btn">Soumettre l'inscription</button>
        </div>

    </div>

    <!-- Zone de recadrage (affichée en grand pour positionner le crop box) -->
    <div id="cropZone" class="crop-zone" style="display:none;"></div>
    <button id="btnValiderCrop" class="submit-btn" style="display:none; margin:10px auto; display:block;">Valider la photo</button>

    <!-- PAGE A4 -->
    <div id="pageA4" class="page-a4" style="display:none;">

        <div class="header-a4">
            <img src="logo.png" class="logo-a4" alt="logo">
            <h2>COMPLEXE SCOLAIRE SAINT JOSEPH</h2>
            <h4>MINISTÈRE DE L'ENSEIGNEMENT PRIMAIRE, SECONDAIRE ET PROFESSIONNEL</h4>
        </div>

        <h3>FICHE D’INSCRIPTION</h3>

        <div class="a4-photo">
            <img id="a4Photo" alt="Photo élève">
        </div>

        <h3>Informations de l'élève</h3>
        <div id="a4Eleve"></div>

        <h3>Informations du tuteur</h3>
        <div id="a4Tuteur"></div>

        <button id="btnConfirmer" class="submit-btn">Confirmer</button>
        <div style="text-align:center; margin-top:12px;">
            <button id="btnDownloadPdf" class="submit-btn">Télécharger PDF</button>
            <button id="btnRetour" class="submit-btn">Retour au formulaire</button>
        </div>
    </div>
<section class="galerie">
  
  <div class="galerie-container">

    <!-- Colonne 1 : Actualité -->
    <div class="colonne colonne-actualite">
      <div class="imagesmedia-haut">
        <img src="images/PHOTO2.jpg" alt="Actualité">
      </div>
      <div class="texte-bas">
        <h3>Actualité</h3>
        <p>
  L’école Saint Joseph s’engage à offrir aux enfants une éducation moderne et adaptée aux défis du monde numérique. 
  Notre objectif est de leur donner les bases nécessaires pour comprendre et utiliser les outils informatiques dès leur plus jeune âge.
</p>

<p>
  En initiant les élèves à l’informatique, nous leur ouvrons la porte vers un univers de connaissances et de créativité. 
  Ils découvrent comment la technologie peut devenir un instrument d’apprentissage, de communication et d’innovation.
</p>

<p>
  Nous croyons que l’informatique n’est pas seulement une compétence technique, mais aussi un moyen de développer l’esprit critique, 
  la logique et la capacité à résoudre des problèmes. Chaque enfant est encouragé à explorer, expérimenter et apprendre à son rythme.
</p>

<p>
  À travers cette démarche, Saint Joseph prépare ses élèves à devenir des citoyens responsables et compétents dans un monde 
  où le numérique occupe une place centrale. Notre mission est de leur donner confiance et de les accompagner vers l’avenir.
</p>
      </div>
    </div>

    <!-- Colonne 2 : Palmarès -->
    <div class="colonne colonne-palmares">
      <div class="palmares-haut">
        <div class="search-box">
          <input type="text" id="searchEleve" placeholder="Rechercher un élève...">
          <span class="search-icon">&#128269;</span>
        </div>
      </div>
      <div class="palmares-bas" id="palmaresPhotos">
        <div class="slider-palmares">
          <img src="images/PHOTO1.jpg" alt="Élève 1">
          <img src="images/PHOTO2.jpg" alt="Élève 2">
          <img src="images/PHOTO3.jpg" alt="Élève 3">
        </div>
      </div>
      <div class="palmares-resultat" id="palmaresResultat" style="display:none;"></div>
    </div>

    <!-- Colonne 3 : Nous écrire -->
    <div class="colonne colonne-contact">
      <h3>Nous écrire</h3>
      <form id="contactForm">
        <input type="text" id="contactNom" placeholder="Votre nom" required>
        <input type="email" id="contactMail" placeholder="Votre email" required>
        <textarea id="contactMessage" placeholder="Votre message" required></textarea>
        <button type="submit">Envoyer</button>
      </form>
    </div>

  </div>
</section>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.13/cropper.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.9.3/html2pdf.bundle.min.js"></script>
    <script src="script.js"></script>
</body>

    <footer class="footer">
        <div class="social-icons">
            <!-- Facebook -->
            <a href="https://www.facebook.com/profile.php?id=61588158450428&sk=directory_links" target="_blank">
            <i class="fab fa-facebook fa-2x"></i>
            </a>
            <!-- LinkedIn -->
            <a href="https://www.linkedin.com/in/sanzio-tech-7004863b1/" target="_blank">
            <i class="fab fa-linkedin fa-2x"></i>
            </a>
            <!-- WhatsApp -->
            <a href="https://wa.me/+243997190772" target="_blank">
            <i class="fab fa-whatsapp fa-2x"></i>
            </a>
            <!-- Instagram -->
            <a href="https://www.instagram.com/sanzio_tech/" target="_blank">
            <i class="fab fa-instagram fa-2x"></i>
            </a>
            <!-- Twitter (X) -->
            <a href="https://twitter.com/tonprofil" target="_blank">
            <i class="fab fa-twitter fa-2x"></i>
            </a>
        </div>

        <hr class="footer-line">
        <p class="footer-text">© Tous droits réservés – Saint Joseph</p>
        <p class="footer-tech">Conçu par SANZIO TECH</p>
    </footer>
</html>
