export const devicesQuery = async (userId: string, orgId: string) => {
    return fetch(
        "https://mockapi.lumi.systems/getdevices?" +
            new URLSearchParams({
                userId: userId,
                orgId: orgId,
            })
    ).then((res) => res.json());
};
