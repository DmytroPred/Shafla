'use client';
import { Dispatch, PropsWithChildren, createContext, useState } from 'react';
import { IHero } from '../models/hero.interface';
import { HEROES_DATA } from '@/public/data/heroes';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

export interface HeroesContextType {
  heroList: IHero[];
  selectedHeroes: number[];
  updateSelectedHeroes: Dispatch<{ hero: IHero; userId: string }>;
  updateHeroList: Dispatch<IHero[]>;
  setSelectedHeroList: Dispatch<number[]>;
  updateSelectedHeroesState: Dispatch<UpdateState>;
}

interface UpdateState {
  heroIds: number[];
  selectedHeroIndex: number;
  state?: boolean;
}
const HeroesContext = createContext<HeroesContextType>({
  heroList: HEROES_DATA,
  selectedHeroes: [],
  updateSelectedHeroes: () => {},
  updateHeroList: () => {},
  setSelectedHeroList: () => {},
  updateSelectedHeroesState: () => {},
});

export function HeroesContextProvider(props: PropsWithChildren) {
  const [heroes, setHeroes] = useState<IHero[]>(HEROES_DATA);
  const [selectedHeroes, setSelectedHeroes] = useState<number[]>([]);

  async function updateSelectedHeroesHandler({
    hero,
    userId,
  }: {
    hero: IHero;
    userId: string;
  }): Promise<void> {
    let updatedSelectedHeroes: number[] = [];
    const updatedHeroIndex = selectedHeroes.findIndex((id) => id === hero.id);

    if (updatedHeroIndex >= 0) {
      updatedSelectedHeroes = [
        ...selectedHeroes.slice(0, updatedHeroIndex),
        ...selectedHeroes.slice(updatedHeroIndex + 1),
      ];
    } else {
      updatedSelectedHeroes = [...selectedHeroes];
      updatedSelectedHeroes.push(hero.id);
    }

    await updateDoc(doc(db, `users/${userId}`), {
      selectedHeroes: updatedSelectedHeroes,
    }).then(() => {
      const heroIndex = heroes.findIndex((el) => el.id === hero.id);
      setSelectedHeroListHandler(updatedSelectedHeroes);

      updateSelectedHeroesStateHandler({
        heroIds: updatedSelectedHeroes,
        selectedHeroIndex: heroIndex,
        state: !heroes[heroIndex].selected,
      });
    });
  }

  function updateHeroListHandler(heroes: IHero[]): void {
    setHeroes(heroes);
  }

  function setSelectedHeroListHandler(heroesIds: number[]): void {
    setSelectedHeroes(heroesIds);
  }

  function updateSelectedHeroesStateHandler({
    heroIds,
    selectedHeroIndex,
    state,
  }: UpdateState): void {
    const selectedHeroesIds = [...heroIds];

    setHeroes((prevValue) => {
      const updatedHeroesState = [...prevValue];

      if (selectedHeroIndex >= 0) {
        updatedHeroesState[selectedHeroIndex].selected = state;
      } else {
        selectedHeroesIds.forEach((heroId) => {
          const selectedHeroIndex = updatedHeroesState.findIndex(
            (hero) => hero.id === heroId
          );
          if (selectedHeroIndex < 0) return;

          updatedHeroesState[selectedHeroIndex].selected = true;
        });
      }

      return updatedHeroesState;
    });
  }

  const context = {
    heroList: heroes,
    selectedHeroes: selectedHeroes,
    updateSelectedHeroes: updateSelectedHeroesHandler,
    updateHeroList: updateHeroListHandler,
    setSelectedHeroList: setSelectedHeroListHandler,
    updateSelectedHeroesState: updateSelectedHeroesStateHandler,
  };

  return (
    <HeroesContext.Provider value={context}>
      {props.children}
    </HeroesContext.Provider>
  );
}

export default HeroesContext;
