<script setup>

import Logo from "../components/Logo.vue";
</script>

<template>
  <div class="border-t-2 border-primary mt-10 pt-10 px-9">
    <div class="max-w-125 m-auto flex flex-col gap-16">
      <div class="flex justify-between flex-wrap-reverse gap-y-12 gap-x-4">
        <div class="flex flex-col gap-8">
          <a href="#">Politique de confidentialité</a>
          <a href="#">Conditions d'utilisations</a>
          <a href="#">Mentions légales</a>
        </div>
        <div class="flex flex-grow">
          <div class="flex flex-col items-end gap-5 align-center-small flex-grow">
            <Logo />
            <div class="flex gap-11">
              <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 0.5C1.35503 0.5 0 1.85503 0 3.5V15.5C0 17.145 1.35503 18.5 3 18.5H15C16.645 18.5 18 17.145 18 15.5V3.5C18 1.85503 16.645 0.5 15 0.5H3ZM9 4.5H11C11 5.505 12.471 6.5 13 6.5V8.5C12.395 8.5 11.668 8.23416 11 7.78516V11.5C11 13.154 9.654 14.5 8 14.5C6.346 14.5 5 13.154 5 11.5C5 9.846 6.346 8.5 8 8.5V10.5C7.448 10.5 7 10.949 7 11.5C7 12.051 7.448 12.5 8 12.5C8.552 12.5 9 12.051 9 11.5V4.5Z" fill="#201F20"/>
              </svg>
              <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 0.5C2.239 0.5 0 2.739 0 5.5V13.5C0 16.261 2.239 18.5 5 18.5H13C15.761 18.5 18 16.261 18 13.5V5.5C18 2.739 15.761 0.5 13 0.5H5ZM15 2.5C15.552 2.5 16 2.948 16 3.5C16 4.052 15.552 4.5 15 4.5C14.448 4.5 14 4.052 14 3.5C14 2.948 14.448 2.5 15 2.5ZM9 4.5C11.761 4.5 14 6.739 14 9.5C14 12.261 11.761 14.5 9 14.5C6.239 14.5 4 12.261 4 9.5C4 6.739 6.239 4.5 9 4.5ZM9 6.5C8.20435 6.5 7.44129 6.81607 6.87868 7.37868C6.31607 7.94129 6 8.70435 6 9.5C6 10.2956 6.31607 11.0587 6.87868 11.6213C7.44129 12.1839 8.20435 12.5 9 12.5C9.79565 12.5 10.5587 12.1839 11.1213 11.6213C11.6839 11.0587 12 10.2956 12 9.5C12 8.70435 11.6839 7.94129 11.1213 7.37868C10.5587 6.81607 9.79565 6.5 9 6.5Z" fill="#201F20"/>
              </svg>

              <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 0.5H2C0.895 0.5 0 1.395 0 2.5V16.5C0 17.605 0.895 18.5 2 18.5H9.621V11.539H7.278V8.814H9.621V6.809C9.621 4.485 11.042 3.218 13.116 3.218C13.815 3.216 14.513 3.252 15.208 3.323V5.753H13.78C12.65 5.753 12.43 6.287 12.43 7.075V8.81H15.13L14.779 11.535H12.414V18.5H16C17.105 18.5 18 17.605 18 16.5V2.5C18 1.395 17.105 0.5 16 0.5Z" fill="#201F20"/>
              </svg>

            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-center font-medium text-center">
        &copy; 2024 Luzaya - Votre beauté, notre passion.
      </div>
    </div>
  </div>
</template>

<style scoped>

@media (max-width: 403px) {
  .align-center-small {
    align-items: center;
  }
}

</style>
