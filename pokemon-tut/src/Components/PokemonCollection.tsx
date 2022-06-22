import React from 'react';
import { Details } from '../App';
import { Pokemon, PokemonDetail } from '../interfaces';
import PokemonList from './PokemonList';

interface Props {
    pokemons: PokemonDetail[];
    viewDetail: Details;
    setDetail: React.Dispatch<React.SetStateAction<Details>>;
}
const PokemonCollection: React.FC<Props> = (Props) => {
    const { pokemons, viewDetail, setDetail } = Props;
    const selectPokemon = (id: number) => {
        if (!viewDetail.isOpened) {
            setDetail({
                id: id,
                isOpened: true,
            });
        }
    };
    return (
        <>
            <section className={viewDetail.isOpened ? 'collection-container-active' : 'collection-container'}>
                {viewDetail.isOpened ? <div className="overlay"></div> : <div className=""></div>}
                {pokemons.map((poke) => {
                    return (
                        <div key={poke.id} onClick={() => selectPokemon(poke.id)}>
                            <PokemonList
                                key={poke.id}
                                name={poke.name}
                                id={poke.id}
                                image={poke.sprites.front_default}
                                abilities={poke.abilities}
                                viewDetail={viewDetail}
                                setDetail={setDetail}
                            />
                        </div>
                    );
                })}
            </section>
        </>
    );
};

export default PokemonCollection;
