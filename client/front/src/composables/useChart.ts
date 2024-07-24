import ky from "ky";

export default function useChart(BASE_URL: string) {
    const getChartData = async (chartType: string) => {
        try {
            console.log(`${BASE_URL}/chart/${chartType}`)
            const response = await ky.get(`${BASE_URL}/chart/${chartType}`, {
                credentials: "include"
            }).json();
            console.log('response:', response);
            return response;
        } catch (error) {
            console.error('Error fetching comments by product:', error);
        }
    };

    return { getChartData  };

}




