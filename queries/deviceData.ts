export const deviceDataQuery = async (queryKey: string) => {
    return fetch(
        "https://mockapi.lumi.systems/getdevicedata?" +
            new URLSearchParams({
                deviceId: queryKey,
            })
    ).then((res) => res.json());
};
