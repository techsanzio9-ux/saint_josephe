document.addEventListener('DOMContentLoaded', function () {

  /* ========================= */
  /*   SLIDER ACCUEIL          */
  /* ========================= */
  let index = 0;
  function moveSlide(step) {
    const slides = document.querySelector('.slides');
    if (!slides) return;
    const total = slides.children.length;
    index = (index + step + total) % total;
    slides.style.transform = `translateX(-${index * 100}%)`;
  }
  // Exposer la fonction si appelée depuis HTML inline
  window.moveSlide = moveSlide;

  /* ========================= */
  /*   ELEMENTS GLOBAUX        */
  /* ========================= */
  let cropper = null;
  const photoInput = document.getElementById("photoInput");
  const photoPreview = document.getElementById("photoPreview");
  const cropZone = document.getElementById("cropZone");
  const btnValiderCrop = document.getElementById("btnValiderCrop");
  const btnCamera = document.getElementById("btnCamera");
  const btnSoumettre = document.getElementById("btnSoumettre");
  const btnConfirmer = document.getElementById("btnConfirmer");
  const btnDownloadPdf = document.getElementById("btnDownloadPdf");
  const btnRetour = document.getElementById("btnRetour");

  // Liste des chefs-lieux (villes) de la RDC — suggestions seulement
const chefLieuxRDC = [
  "Kinshasa","Matadi","Kenge","Bandundu","Inongo","Lusambo","Kananga",
  "Mbuji-Mayi","Kabinda","Kindu","Bukavu","Goma","Bunia","Isiro",
  "Kisangani","Aketi","Gbadolite","Lisala","Gemena","Mbandaka",
  "Boende","Kalemie","Kamina","Kolwezi","Lubumbashi"
];

// Remplir le datalist (exécuté au chargement du DOM)
(function populateChefLieuxDatalist() {
  const datalist = document.getElementById('chefLieuxList');
  if (!datalist) return;
  datalist.innerHTML = '';
  chefLieuxRDC.forEach(city => {
    const opt = document.createElement('option');
    opt.value = city;
    datalist.appendChild(opt);
  });
})();

// Optionnel : si tu veux détecter quand l'utilisateur tape une ville non listée
const eleveLieuInput = document.getElementById('eleve_lieu');
if (eleveLieuInput) {
  eleveLieuInput.addEventListener('input', function () {
    // valeur libre ou choisie
    const valeur = this.value.trim();
    // tu peux ajouter ici une logique si tu veux valider ou proposer autre chose
    // ex: console.log('Lieu saisi', valeur);
  });
}
  /* ========================= */
  /*   UTILITAIRES             */
  /* ========================= */
  function destroyCropper() {
    if (cropper) {
      try { cropper.destroy(); } catch (e) {}
      cropper = null;
    }
  }

  function val(id) {
    const el = document.getElementById(id);
    return el ? el.value.trim() : "";
  }

  function markRequired(ids) {
    let ok = true;
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (!el || !el.value.trim()) {
        ok = false;
        el && el.classList.add('field-error');
      } else {
        el && el.classList.remove('field-error');
      }
    });
    return ok;
  }

  /* ========================= */
  /*   CHARGER UNE PHOTO (PC)  */
  /* ========================= */
  if (photoInput) {
    photoInput.addEventListener("change", function (event) {
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = function (e) {
        const img = document.createElement("img");
        img.src = e.target.result;
        img.classList.add("crop-image");

        if (cropZone) {
          cropZone.style.display = "block";
          cropZone.innerHTML = "";
          cropZone.appendChild(img);
        }

        if (btnValiderCrop) btnValiderCrop.style.display = "block";

        destroyCropper();

        // initialiser CropperJS sur l'image en grand
        cropper = new Cropper(img, {
          aspectRatio: 3 / 2.8,
          viewMode: 1,
          autoCropArea: 0.6,
          background: true,
          modal: true,
          guides: true,
          highlight: true,
          cropBoxMovable: true,
          cropBoxResizable: true,
          dragMode: 'move'
        });
      };
      reader.readAsDataURL(file);
    });
  }

  /* ========================= */
  /*   PRENDRE UNE PHOTO (CAM) */
  /* ========================= */
  if (btnCamera) {
    btnCamera.addEventListener("click", async function () {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        alert("Votre appareil ne supporte pas la caméra.");
        return;
      }

      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        const video = document.createElement("video");
        video.srcObject = stream;
        video.autoplay = true;
        video.playsInline = true;

        if (cropZone) {
          cropZone.style.display = "block";
          cropZone.innerHTML = "";
          cropZone.appendChild(video);
        }
        if (btnValiderCrop) btnValiderCrop.style.display = "block";

        await new Promise(resolve => {
          video.onloadedmetadata = () => resolve();
        });

        destroyCropper();
        // Cropper peut accepter <video>, mais certains navigateurs ont des limites.
        // Si problème, on pourrait capturer un frame et initialiser Cropper sur une <img>.
        cropper = new Cropper(video, {
          aspectRatio: 3 / 2.8,
          viewMode: 1,
          autoCropArea: 0.6,
          background: true,
          modal: true,
          guides: true,
          highlight: true,
          cropBoxMovable: true,
          cropBoxResizable: true,
          dragMode: 'move'
        });

      } catch (err) {
        alert("Impossible d'accéder à la caméra.");
      }
    });
  }

  /* ========================= */
  /*   VALIDER LE RECADRAGE    */
  /* ========================= */
  if (btnValiderCrop) {
    btnValiderCrop.addEventListener("click", function () {
      if (!cropper) {
        alert("Aucune image à recadrer.");
        return;
      }

      const canvas = cropper.getCroppedCanvas({
        width: 300,
        height: 320,
        imageSmoothingQuality: 'high'
      });

      if (photoPreview) {
        photoPreview.innerHTML = "";
        photoPreview.appendChild(canvas);
      }

      destroyCropper();
      if (cropZone) cropZone.style.display = "none";
      btnValiderCrop.style.display = "none";
    });
  }

  /* ========================= */
  /*   SOUMETTRE L'INSCRIPTION */
  /* ========================= */
  if (btnSoumettre) {
    btnSoumettre.addEventListener("click", function (e) {
      e.preventDefault();

      // validation des champs obligatoires (liste à adapter si besoin)
      const requiredIds = [
        "eleve_nom","eleve_postnom","eleve_prenom","eleve_dob",
        "eleve_lieu","eleve_sexe","eleve_adresse","eleve_classe",
        "tuteur_nom","tuteur_postnom","tuteur_prenom","tuteur_tel"
      ];
      if (!markRequired(requiredIds)) {
        alert("Veuillez remplir tous les champs obligatoires (en rouge).");
        return;
      }

      // vérifier photo validée
      const preview = document.getElementById("photoPreview");
      const previewCanvas = preview ? (preview.querySelector("canvas") || preview.querySelector("img")) : null;
      if (!previewCanvas) {
        alert("Veuillez d'abord choisir et valider une photo.");
        return;
      }

      // mettre la photo dans la fiche A4
      const a4Photo = document.getElementById("a4Photo");
      if (a4Photo) {
        if (previewCanvas.tagName.toLowerCase() === "canvas") {
          a4Photo.src = previewCanvas.toDataURL();
        } else if (previewCanvas.tagName.toLowerCase() === "img") {
          a4Photo.src = previewCanvas.src;
        }
      }

      // récupérer les valeurs via id
      const eleve = {
        nom: val("eleve_nom"),
        postnom: val("eleve_postnom"),
        prenom: val("eleve_prenom"),
        dob: val("eleve_dob"),
        lieu: val("eleve_lieu"),
        sexe: val("eleve_sexe"),
        adresse: val("eleve_adresse"),
        classe: val("eleve_classe")
      };

      const tuteur = {
        nom: val("tuteur_nom"),
        postnom: val("tuteur_postnom"),
        prenom: val("tuteur_prenom"),
        tel: val("tuteur_tel"),
        adresse: val("tuteur_adresse"),
        sexe: val("tuteur_sexe"),
        relation: val("tuteur_relation")
      };

      // injecter dans A4
      const a4Eleve = document.getElementById("a4Eleve");
      if (a4Eleve) {
        a4Eleve.innerHTML = `
          <p><strong>Nom :</strong> ${eleve.nom}</p>
          <p><strong>Postnom :</strong> ${eleve.postnom}</p>
          <p><strong>Prénom :</strong> ${eleve.prenom}</p>
          <p><strong>Date de naissance :</strong> ${eleve.dob}</p>
          <p><strong>Lieu :</strong> ${eleve.lieu}</p>
          <p><strong>Sexe :</strong> ${eleve.sexe}</p>
          <p><strong>Adresse :</strong> ${eleve.adresse}</p>
          <p><strong>Classe :</strong> ${eleve.classe}</p>
        `;
      }

      const a4Tuteur = document.getElementById("a4Tuteur");
      if (a4Tuteur) {
        a4Tuteur.innerHTML = `
          <p><strong>Nom :</strong> ${tuteur.nom}</p>
          <p><strong>Postnom :</strong> ${tuteur.postnom}</p>
          <p><strong>Prénom :</strong> ${tuteur.prenom}</p>
          <p><strong>Téléphone :</strong> ${tuteur.tel}</p>
          <p><strong>Adresse :</strong> ${tuteur.adresse}</p>
          <p><strong>Sexe :</strong> ${tuteur.sexe}</p>
          <p><strong>Lien :</strong> ${tuteur.relation}</p>
        `;
      }

      // afficher A4 et cacher formulaire
      const pageA4 = document.getElementById("pageA4");
      if (pageA4) pageA4.style.display = "block";
      const form = document.querySelector(".inscription-container");
      if (form) form.style.display = "none";
    });
  }

  /* ========================= */
  /*   TELECHARGER EN PDF      */
  /* ========================= */
  if (btnDownloadPdf) {
    btnDownloadPdf.addEventListener('click', function () {
      if (typeof html2pdf === 'undefined') {
        alert("La fonction de téléchargement PDF n'est pas disponible (html2pdf manquant).");
        return;
      }
      const el = document.getElementById('pageA4');
      const opt = {
        margin: 0.4,
        filename: 'fiche_inscription.pdf',
        image: { type: 'jpeg', quality: 0.95 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
      };
      html2pdf().set(opt).from(el).save();
    });
  }

if (btnRetour) {
  btnRetour.addEventListener('click', function () {
    const pageA4 = document.getElementById('pageA4');
    if (pageA4) pageA4.style.display = 'none';

    const form = document.querySelector('.inscription-container');
    if (form) {
      form.style.display = 'block';
      form.style.width = '';   // réinitialise la largeur
      form.style.fontSize = ''; // réinitialise la taille
      form.style.position = ''; // réinitialise la position
    }
  });
}

  /* ========================= */
  /*   BOUTON CONFIRMER (PAIEMENT) */
  /* ========================= */
  if (btnConfirmer) {
    btnConfirmer.addEventListener("click", function () {
      // éviter plusieurs modals
      if (document.querySelector('.pay-modal-overlay')) return;

      const overlay = document.createElement('div');
      overlay.className = 'pay-modal-overlay';
      overlay.innerHTML = `
        <div class="pay-modal">
          <h3>Moyens de paiement</h3>
          <p>Choisissez un moyen de paiement :</p>
          <div style="display:flex; gap:8px; justify-content:center; margin:10px 0;">
            <button class="pay-option">Mobile Money</button>
            <button class="pay-option">Carte bancaire</button>
          </div>
          <button id="closePay">Fermer</button>
        </div>
      `;
      document.body.appendChild(overlay);

      const closeBtn = document.getElementById('closePay');
      if (closeBtn) closeBtn.addEventListener('click', () => overlay.remove());
    });
  }

      // PARTIE PALMARESSE


const searchEleve = document.getElementById('searchEleve');
const palmaresPhotos = document.getElementById('palmaresPhotos');
const palmaresResultat = document.getElementById('palmaresResultat');

if (searchEleve) {
  searchEleve.addEventListener('input', function() {
    const query = this.value.trim().toLowerCase();
    if (query.length > 0) {
      palmaresPhotos.style.display = 'none';
      palmaresResultat.style.display = 'block';
      // Exemple de résultat (à remplacer par tes données réelles)
      palmaresResultat.innerHTML = `
        <p><strong>Nom :</strong> Jean Muteba</p>
        <p><strong>Mention :</strong> Premier de la classe</p>
      `;
    } else {
      palmaresPhotos.style.display = 'block';
      palmaresResultat.style.display = 'none';
      palmaresResultat.innerHTML = '';
    }
  });
}
  /* ========================= */
  /*   FIN DOMContentLoaded     */
  /* ========================= */
});