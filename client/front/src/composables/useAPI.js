import { ref } from "vue";
import ky from "ky";

export const useAPI =  async (searchParams, URL) => {
  const results = ref([]);
  const controller = new AbortController();

   await ky
    .get(`${import.meta.env.VITE_API_BASE_URL}/${URL}`, {
      searchParams: searchParams,
    })
    .json()
    .then((response) => {
      results.value = response;
    });

  console.log('test search Input', searchInput);
  console.log("test results", results.value);

  // return {
  //   results,
  // };
};
