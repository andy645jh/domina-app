import { useState } from 'react';
import { SEARCH_EVT_NAME } from '../utils/Constants';
import { useDebouncedCallback } from "use-debounce";
import styles from '../styles/style.module.css';

export default function Search() {
    const [searchWord, setSearchWord] = useState('');

    const debounced = useDebouncedCallback(
        // function
        () => {
            const customEvent = new CustomEvent(SEARCH_EVT_NAME, { detail: searchWord });
            window.dispatchEvent(customEvent)
        },
        500
    );

    const onChangeText = (word: string) => {
        setSearchWord(word);
        debounced();
    };

    return (
        <div>
            <input className={styles.searchInput} name='search' value={searchWord} placeholder='Buscar por nombre...' onChange={(evt) => onChangeText(evt.target.value)} />
        </div>
    )
}
