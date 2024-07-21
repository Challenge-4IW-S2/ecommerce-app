import { ref } from "vue";
import ky from "ky";

function addModal() {
  const modalBackground = document.createElement("div");
  modalBackground.id = "modalCancelApi";
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

  const modalButton = document.createElement("button");
  modalButton.id = "modalCancelButton";
  modalButton.style.backgroundColor = "#000";
  modalButton.style.color = "#fff";
  modalButton.style.height = "3rem";
  modalButton.style.display = "block";
  modalButton.style.textAlign = "center";
  modalButton.style.alignContent = "center";
  modalButton.style.width = "100%";
  modalButton.innerHTML = `<span class="text-xl font-medium" >Annuler la requête</span>`;

  modalContainer.appendChild(modalButton);
  modalBackground.appendChild(modalContainer);
  document.body.appendChild(modalBackground);
}

function closeModal() {
  const modal = document.getElementById('modalCancelApi');
  document.body.removeChild(modal);
}

/**
 * 
 * @param {string} method ex: get, post, put etc 
 * @param {string} URL ex: 'URLExemple'
 * @param {object} searchParams ex: { key : value }
 * @param {object} JSON ex: { key : value }
 * @param {string} Credentials ex: 'include'
 * @returns A array of the response
 */

export const useAPI =  async (method, URL, searchParams, JSON, Credentials) => {
  const results = ref([]);
  const isModalOpen = ref(false);
  const controller = new AbortController();

  addModal();
  isModalOpen.value = true;
  const abortBtn = document.getElementById('modalCancelButton');
  if (abortBtn) {
    abortBtn.addEventListener("click", () => {
      controller.abort();
      closeModal();
      isModalOpen.value = false;
    })
  }

  const hasSearchParams = searchParams && Object.keys(searchParams).length > 0 ? searchParams : undefined;
  const hasJson = JSON && Object.keys(JSON).length > 0 ? JSON : undefined;
  const hasCredentials = Credentials && Credentials !== '' ? Credentials : undefined

  try {
    await ky[method](`${import.meta.env.VITE_API_BASE_URL}/${URL}`, {
      searchParams: hasSearchParams,
      json: hasJson,
      credentials: hasCredentials,
      signal: controller.signal,
      hooks: {
        afterResponse: [
          async (request, options, response) => {
            if (response.status === 401) {
              closeModal();
              isModalOpen.value = false;
            }
          }
        ]
      }
    }).json()
    .then((res) => {
      results.value = res;
      closeModal();
      isModalOpen.value = false;
    })
  } catch (error) {
    if (error.name === 'AbortError') {
      console.log('La requête a été annulée');
      closeModal();
      isModalOpen.value = false;
    } else {
      throw error;
    }
  }

  return {
    results,
    isModalOpen,
  };
};
