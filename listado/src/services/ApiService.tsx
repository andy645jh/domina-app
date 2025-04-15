export const getCharacters = async (searchWord: string, page: number) => {

    const params = '?name=' + searchWord + '&page=' + page;

    const response = await fetch('https://rickandmortyapi.com/api/character/' + params);
    if (response.status !== 200) {
        return [];
    }

    const data = await response.json();
    return data;
};