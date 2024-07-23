import ky from "ky";

export default function useChart(BASE_URL: string) {
    const getChartData = async (chartType: string) => {
        try {
            const response = await ky.get(`${BASE_URL}/chart/${chartType}`).json();
            return response;
        } catch (error) {
            console.error('Error fetching comments by product:', error);
        }
    };

    return { getChartData  };

}




