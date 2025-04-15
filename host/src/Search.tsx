import { useState } from 'react';
import { SEARCH_EVT_NAME } from './utils/Constants';

export default function Search() {
    const [searchWord, setSearchWord] = useState('')

    const onChangeText: React.KeyboardEventHandler<HTMLInputElement> = () => {
        const customEvent = new CustomEvent(SEARCH_EVT_NAME, { detail: searchWord });
        window.dispatchEvent(customEvent)
    }

    return (
        <div>
            <label htmlFor='search'>Buscar</label>
            <input name='search' value={searchWord} placeholder='Buscar por nombre...' onKeyUp={onChangeText} onChange={(evt) => setSearchWord(evt.target.value)} />
        </div>
    )
}
