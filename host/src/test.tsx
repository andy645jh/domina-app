import { myContext } from './context';

export function ProviderContextComponent() {
    const sharedData = "My shared data!";

    return (
        <myContext.Provider value={sharedData}>

            {/* children components */}

        </myContext.Provider>
    );
}