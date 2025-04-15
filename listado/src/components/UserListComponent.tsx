import React, { useEffect, useState } from 'react';
import { PAGE_COUNT_EVT_NAME, PAGE_EVT_NAME, SEARCH_EVT_NAME } from '../utils/Constants';
import styles from '../style.module.css';

type Character = {
    id: number,
    name: string,
    image: string,
};

const UserListComponent: React.FC = () => {

    const [characters, setCharacters] = useState<Character[]>([]);
    const [searchWord, setSearchWord] = useState('');
    const [page, setPage] = useState(1);

    useEffect(() => {
        const fetchUsers = async () => {

            const path = '?name=' + searchWord + '&page=' + page;

            await fetch('https://rickandmortyapi.com/api/character/' + path)
                .then(response => response.json())
                .then((data) => {

                    if (data.error) {
                        setCharacters([]);
                        return;
                    }

                    setCharacters(data.results);

                    const customEvent = new CustomEvent(PAGE_COUNT_EVT_NAME, { detail: data.info.pages });
                    window.dispatchEvent(customEvent);
                });
        }

        fetchUsers();

        const onSearchWordChanged = (event: CustomEventInit<string>) => {
            setSearchWord(event.detail ?? '');
        };

        window.addEventListener(SEARCH_EVT_NAME, onSearchWordChanged);

        const onPageChanged = (event: CustomEventInit<number>) => {
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
            {
                characters?.length > 0 ? characters.map((character) =>
                    <div key={character.id} className={styles.characterCard}>
                        <img src={character.image} alt={character.name} width={200} />
                        <span>{character.id}</span>
                        <span>{character.name}</span>
                    </div >
                ) : "No hay personajes"
            }
        </div>
    );
};

export default UserListComponent;
