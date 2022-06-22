import React, { useState } from 'react';
import { useEffect } from 'react';
import { Details } from '../App';
import './pokemon.css';

interface Props {
    name: string;
    id: number;
    image: string;
    abilities:
        | {
              ability: string;
              name: string;
          }[]
        | undefined;
    viewDetail: Details;
    setDetail: React.Dispatch<React.SetStateAction<Details>>;
}

const PokemonList: React.FC<Props> = (Props) => {
    const { id, name, image, abilities, viewDetail, setDetail } = Props;
    const [isSelected, setSelected] = useState(false);
    useEffect(() => {
        setSelected(id === viewDetail?.id);
    }, [viewDetail]);
    const close = () => {
     setDetail({
          id: 0,
          isOpened: false
      });
    }
    return (
        <div>
            {isSelected ? (
                <section className="pokemon-list-detailed">
                    <div className="detail container">
                        <div className="detail-close" onClick={close}>X</div>
                        <div className="detail-info">
                            <img src={image} alt="" className="detail-img" />
                            <p className="detail-name"> {name} </p>
                        </div>
                        <div className="detail-skill">
                            <p className="detail-ability"> Abilities: </p>
                            {abilities?.map((ab: any, idx) => {
                                return (
                                   <div className="" key={idx}> {ab.ability.name} </div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            ) : (
                <div className="collection-container">
                    <section className="pokemon-list-container">
                        <p className="pokemon-name">{name}</p>
                        <img src={image} alt="" />
                    </section>
                </div>
            )}
        </div>
    );
};

export default PokemonList;
