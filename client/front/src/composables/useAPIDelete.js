import { ref } from "vue";
import ky from "ky";

function consentModal() {
  const modalBackground = document.createElement("div");
  modalBackground.id = "consentModal";
  modalBackground.style.position = "fixed";
  modalBackground.style.left = "0";
  modalBackground.style.top = "0";
  modalBackground.style.width = "100%";
  modalBackground.style.height = "100%";
  modalBackground.style.backgroundColor = "rgba(0,0,0,0.5)";
  modalBackground.style.display = "flex";
  modalBackground.style.justifyContent = "center";
  modalBackground.style.alignItems = "center";
  modalBackground.style.zIndex = "1000";

  const modalContainer = document.createElement("div");
  modalContainer.style.backgroundColor = "#fff";
  modalContainer.style.width = "500px";
  modalContainer.style.height = "500px";
  modalContainer.style.padding = "20px";
  modalContainer.style.borderRadius = "5px";
  modalContainer.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
  modalContainer.style.display = "flex";
  modalContainer.style.flexDirection = "column";
  modalContainer.style.justifyItems = "center";
  modalContainer.style.alignItems = "center";
  modalContainer.style.gap = "30px";
  modalContainer.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 24 24"><path fill="none" stroke="#C72C48" stroke-dasharray="32" stroke-dashoffset="32" stroke-linecap="round" stroke-width="2" d="M7 8C7 5.23858 9.23857 3 12 3C14.7614 3 17 5.23858 17 8C17 9.6356 16.2147 11.0878 15.0005 12C14.1647 12.6279 12 14 12 17"><animate fill="freeze" attributeName="stroke-dashoffset" dur="1s" values="32;0"/></path><circle cx="12" cy="21" r="1" fill="#C72C48" fill-opacity="0"><animate fill="freeze" attributeName="fill-opacity" begin="1s" dur="0.4s" values="0;1"/></circle></svg>
    <span class="text-xl font-medium">Souhaitez-vous supprimer ?</span>`;

  const modalButtonCancel = document.createElement("button");
  modalButtonCancel.id = "cancelRequest";
  modalButtonCancel.style.backgroundColor = "#000";
  modalButtonCancel.style.color = "#fff";
  modalButtonCancel.style.height = "3rem";
  modalButtonCancel.style.display = "block";
  modalButtonCancel.style.textAlign = "center";
  modalButtonCancel.style.alignContent = "center";
  modalButtonCancel.style.width = "100%";
  modalButtonCancel.innerHTML = `<span class="text-xl font-medium" >Annuler</span>`;

  const modalButtonAccept = document.createElement("button");
  modalButtonAccept.id = "acceptRequest";
  modalButtonAccept.style.backgroundColor = "#C72C48";
  modalButtonAccept.style.color = "#fff";
  modalButtonAccept.style.height = "3rem";
  modalButtonAccept.style.display = "block";
  modalButtonAccept.style.textAlign = "center";
  modalButtonAccept.style.alignContent = "center";
  modalButtonAccept.style.width = "100%";
  modalButtonAccept.innerHTML = `<span class="text-xl font-medium" >Confirmer</span>`;

  modalContainer.appendChild(modalButtonCancel);
  modalContainer.appendChild(modalButtonAccept);
  modalBackground.appendChild(modalContainer);
  document.body.appendChild(modalBackground);
}

function loadingModal() {
  const modalBackground = document.createElement("div");
  modalBackground.id = "loadingModal";
  modalBackground.style.position = "fixed";
  modalBackground.style.left = "0";
  modalBackground.style.top = "0";
  modalBackground.style.width = "100%";
  modalBackground.style.height = "100%";
  modalBackground.style.backgroundColor = "rgba(0,0,0,0.5)";
  modalBackground.style.display = "flex";
  modalBackground.style.justifyContent = "center";
  modalBackground.style.alignItems = "center";
  modalBackground.style.zIndex = "1000";

  const modalContainer = document.createElement("div");
  modalContainer.style.backgroundColor = "#fff";
  modalContainer.style.width = "500px";
  modalContainer.style.height = "500px";
  modalContainer.style.padding = "20px";
  modalContainer.style.borderRadius = "5px";
  modalContainer.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
  modalContainer.style.display = "flex";
  modalContainer.style.flexDirection = "column";
  modalContainer.style.justifyItems = "center";
  modalContainer.style.alignItems = "center";
  modalContainer.style.gap = "30px";
  modalContainer.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 24 24"><g stroke="#C72C48"><circle cx="12" cy="12" r="9.5" fill="none" stroke-linecap="round" stroke-width="3"><animate attributeName="stroke-dasharray" calcMode="spline" dur="3s" keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1" keyTimes="0;0.475;0.95;1" repeatCount="indefinite" values="0 150;42 150;42 150;42 150"/><animate attributeName="stroke-dashoffset" calcMode="spline" dur="3s" keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1" keyTimes="0;0.475;0.95;1" repeatCount="indefinite" values="0;-16;-59;-59"/></circle><animateTransform attributeName="transform" dur="4s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/></g></svg>
  <span class="text-xl font-medium">Votre requête est en cours d'éxécution...</span>`;

  modalBackground.appendChild(modalContainer);
  document.body.appendChild(modalBackground);
}

function confirmModal() {
  const modalBackground = document.createElement("div");
  modalBackground.id = "confirmModal";
  modalBackground.style.position = "fixed";
  modalBackground.style.left = "0";
  modalBackground.style.top = "0";
  modalBackground.style.width = "100%";
  modalBackground.style.height = "100%";
  modalBackground.style.backgroundColor = "rgba(0,0,0,0.5)";
  modalBackground.style.display = "flex";
  modalBackground.style.justifyContent = "center";
  modalBackground.style.alignItems = "center";
  modalBackground.style.zIndex = "1000";

  const modalContainer = document.createElement("div");
  modalContainer.style.backgroundColor = "#fff";
  modalContainer.style.width = "500px";
  modalContainer.style.height = "500px";
  modalContainer.style.padding = "20px";
  modalContainer.style.borderRadius = "5px";
  modalContainer.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
  modalContainer.style.display = "flex";
  modalContainer.style.flexDirection = "column";
  modalContainer.style.justifyItems = "center";
  modalContainer.style.alignItems = "center";
  modalContainer.style.gap = "30px";
  modalContainer.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 24 24"><g fill="none" stroke="#C72C48" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M20 19V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1Z"/><path stroke-dasharray="14" stroke-dashoffset="14" d="M8 12L11 15L16 10"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.4s" values="14;0"/></path></g></svg>
  <span class="text-xl font-medium">Votre requête est terminée </span>`;

  modalBackground.appendChild(modalContainer);
  document.body.appendChild(modalBackground);
}

/**
 *
 * @param {string} errorMessage
 */
function errorModal(errorMessage) {
  const modalBackground = document.createElement("div");
  modalBackground.id = "errorModal";
  modalBackground.style.position = "fixed";
  modalBackground.style.left = "0";
  modalBackground.style.top = "0";
  modalBackground.style.width = "100%";
  modalBackground.style.height = "100%";
  modalBackground.style.backgroundColor = "rgba(0,0,0,0.5)";
  modalBackground.style.display = "flex";
  modalBackground.style.justifyContent = "center";
  modalBackground.style.alignItems = "center";
  modalBackground.style.zIndex = "1000";

  const modalContainer = document.createElement("div");
  modalContainer.style.backgroundColor = "#fff";
  modalContainer.style.width = "500px";
  modalContainer.style.height = "500px";
  modalContainer.style.padding = "20px";
  modalContainer.style.borderRadius = "5px";
  modalContainer.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
  modalContainer.style.display = "flex";
  modalContainer.style.flexDirection = "column";
  modalContainer.style.justifyItems = "center";
  modalContainer.style.alignItems = "center";
  modalContainer.style.gap = "30px";
  modalContainer.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 24 24"><g stroke="#C72C48" stroke-linecap="round" stroke-width="2"><path fill="#C72C48" fill-opacity="0.3" d="M12 4H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1Z"/><path fill="none" d="M12 7V13" stroke-width="2"/></g><circle cx="12" cy="17" r="1" fill="#C72C48"/></svg>
  <span class="text-xl font-medium">Oops! Erreur :( </span>
  <p>${errorMessage}</p>`;

  modalBackground.appendChild(modalContainer);
  document.body.appendChild(modalBackground);
}

/**
 *
 * @param {string} modalId
 */
function closeModal(modalId) {
  const modal = document.getElementById(`${modalId}`);
  document.body.removeChild(modal);
}

/**
 *
 * @param {string} URL ex: 'URLExemple'
 */
export const useAPIDelete = async (URL) => {
  const isDone = ref(false);

  consentModal();
  const cancelBtn = document.getElementById("cancelRequest");
  if (cancelBtn) {
    cancelBtn.addEventListener("click", () => {
      closeModal("consentModal");
    });
  }
  const acceptBtn = document.getElementById("acceptRequest");
  if (acceptBtn) {
    acceptBtn.addEventListener("click", async () => {
      closeModal("consentModal");
      loadingModal();
      try {
        await ky.delete(`${import.meta.env.VITE_API_BASE_URL}/${URL}`, {
          hooks: {
            afterResponse: [
              async (request, options, response) => {
                closeModal("loadingModal");
                if ([500].includes(response.status)) {
                  confirmModal();
                  setTimeout(() => {
                    closeModal("confirmModal");
                  }, 3000);
                  isDone.value = true;
                }
              },
            ],
          },
        });
      } catch (error) {
        closeModal("loadingModal");
        errorModal(error.message);
        setTimeout(() => {
          closeModal("errorModal");
        }, 3000);
      }
    });
  }

  return {
    isDone,
  };
};
