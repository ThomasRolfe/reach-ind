export const deviceDataQuery = async (
    queryKey: string | string[] | undefined
) => {
    if (typeof queryKey !== "string") {
        return;
    }

    return fetch(
        "https://mockapi.lumi.systems/getdevicedata?" +
            new URLSearchParams({
                deviceId: queryKey,
            })
    ).then((res) => res.json());
};
