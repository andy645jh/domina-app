import React, { useEffect, useState } from 'react';
import { PAGE_COUNT_EVT_NAME, PAGE_EVT_NAME, SEARCH_EVT_NAME } from './utils/Constants';
import styles from './style.module.css';

type Character = {
    id: number,
    name: string,
};

const UserListComponent: React.FC = () => {

    const [characters, setCharacters] = useState<Character[]>([]);
    const [searchWord, setSearchWord] = useState('');
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            setIsLoading(true);
            const path = '?name=' + searchWord + '&page=' + page;
            console.log("Path: ", path);
            await fetch('https://rickandmortyapi.com/api/character/' + path)
                .then(response => response.json())
                .then((data) => {
                    console.log("Data: ", data);

                    if (data.error) {
                        setCharacters([]);
                        setIsLoading(false);
                        return;
                    }
                    console.log("mapResult: ", data.results);
                    setCharacters(data.results);

                    const customEvent = new CustomEvent(PAGE_COUNT_EVT_NAME, { detail: data.info.pages });
                    window.dispatchEvent(customEvent);

                    setIsLoading(false);
                });
        }

        fetchUsers();

        const onSearchWordChanged = (event: CustomEventInit<string>) => {
            console.log("onSearchWordChanged: ", event.detail);
            setSearchWord(event.detail ?? '');
        };

        window.addEventListener(SEARCH_EVT_NAME, onSearchWordChanged);

        const onPageChanged = (event: CustomEventInit<number>) => {
            console.log("onPageChanged: ", event.detail);
            setPage(event.detail ?? -1);
        };

        window.addEventListener(PAGE_EVT_NAME, onPageChanged);

        return () => {
            window.removeEventListener(SEARCH_EVT_NAME, onSearchWordChanged);
            window.removeEventListener(PAGE_EVT_NAME, onPageChanged);
        }
    }, [searchWord, page]);


    return (
        <div className={styles.container}>
            {isLoading ? 'Cargando...' :
                (characters?.length > 0 ? characters.map((character) =>
                    <div key={character.id} className={styles.characterCard}>
                        <span>{character.id}</span>
                        <span>{character.name}</span>
                    </div >
                ) : "No hay personajes")}

        </div>
    );
};

export default UserListComponent;
