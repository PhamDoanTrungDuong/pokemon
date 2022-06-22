import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import PokemonCollection from './Components/PokemonCollection';
import { Pokemon } from './interfaces';

interface Pokemons {
    name: string;
    url: string;
}

export interface Details {
    id: number;
    isOpened: boolean;
}

const App: React.FC = () => {
    const [pokemon, setPokemon] = useState<Pokemon[]>([]);
    const [nextUrl, setNextUrl] = useState('');
    const [loading, setLoading] = useState<boolean>(true);
    const [viewDetail, setDetail] = useState<Details>({
        id: 0,
        isOpened: false
    })

    useEffect(() => {
        const getPokemon = async () => {
            const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=20&offset=20');

            setNextUrl(res.data.next);

            res.data.results.forEach(async (pokemon: Pokemons) => {
                const poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
                setPokemon((p) => [...p, poke.data]);
                setLoading(false);
            });
        };

        getPokemon();
    }, []);

    const nextPage = async () => {
        setLoading(true);
        let res = await axios.get(nextUrl);

        setNextUrl(res.data.next);

        res.data.results.forEach(async (pokemon: Pokemons) => {
            const poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
            setPokemon((p) => [...p, poke.data]);
            setLoading(false);
        });
    };

    return (
        <div className="App">
            <div className="container">
                <div className="pokemon-header">Pokemon</div>
                <PokemonCollection 
                    pokemons={pokemon} 
                    viewDetail={viewDetail} 
                    setDetail={setDetail} 
                />
                <div className="btn">
                    <button onClick={nextPage}> {loading ? "Loading..." : "Load More"} </button>
                </div>
            </div>
        </div>
    );
};

export default App;
