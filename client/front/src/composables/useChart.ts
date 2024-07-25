import ky from "ky";

export default function useChart(BASE_URL: string) {
    const getChartData = async (chartType: string) => {
        try {
            const response = await ky.get(`${BASE_URL}/chart/${chartType}`, {
                credentials: "include"
            }).json();
            return response;
        } catch (error) {

        }
    };

    return { getChartData  };

}



