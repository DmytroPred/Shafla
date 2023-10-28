'use client';
import { useContext, useRef, useState } from 'react';
import { IHero } from './models/hero.interface';
import { debounce } from './utils/debounce';
import HeroesContext, { HeroesContextType } from './store/heroesContext';
import AuthContext from './store/auth-context';
import Background from './components/ui/Background';
import { randomNum } from './utils/random-number';

function HomePage() {
  const authCtx = useContext(AuthContext);
  const heroesCtx = useContext<HeroesContextType>(HeroesContext);
  const [randomHero, setRandomHero] = useState<IHero | null>(null);
  const searchValue = useRef<string>('');

  function updateHeroStatus(hero: IHero) {
    if (!authCtx.user?.uid) return;

    heroesCtx.updateSelectedHeroes({ hero, userId: authCtx.user?.uid });
  }

  function highlightHeroByName(searchVal: string) {
    const arr = heroesCtx.heroList.map((hero) => {
      const isInclude = hero.localized_name
        .toLocaleLowerCase()
        .includes(searchVal.toLocaleLowerCase());

      if (isInclude) {
        hero.disabled = true;
      } else {
        hero.disabled = false;
      }

      return hero;
    });

    heroesCtx.updateHeroList(arr);
  }

  const searchWithDebounce = debounce((searchVal: string) =>
    highlightHeroByName(searchVal)
  );

  const getRandomHeroFromSelected = () => {
    const randomNumber = randomNum(heroesCtx.selectedHeroes.length);

    const randomHeroIndex = heroesCtx.selectedHeroes[randomNumber];
    const randHero = heroesCtx.heroList.find(
      (hero) => hero.selected && hero.id === randomHeroIndex
    );

    if (randHero) setRandomHero(randHero);
  };

  return (
    <>
      <Background />
      <div className='w-11/12 h-11/12 mx-auto flex justify-between'>
        <input
          className='text-input mt-4'
          type='text'
          placeholder='Search by name...'
          onChange={(e) => {
            const value = e.target.value;
            searchValue.current = value;
            return searchWithDebounce(value);
          }}
        />

        <div className='w-56'>
          <button
            className='submit-button w-56 mt-4'
            onClick={getRandomHeroFromSelected}
          >
            Shaffle
          </button>
        </div>
      </div>

      <div
        className='mt-6 mb-12 w-11/12 h-11/12 mx-auto flex flex-wrap gap-1
      '
      >
        {heroesCtx.heroList.map((hero: IHero) => {
          return (
            <div
              className={`relative z-0 hover:!z-10 ${
                hero.id === randomHero?.id && '!z-10'
              }`}
              key={hero.id}
              onClick={() => updateHeroStatus(hero)}
            >
              <img
                className={`h-12 cursor-pointer duration-100 hover:scale-110 ${
                  hero.disabled === false && 'grayscale'
                } ${
                  hero.id === randomHero?.id &&
                  'scale-125 shadow-[0_0_20px_15px] shadow-yellow-400'
                }`}
                src={`./images/heroes/${hero.image}_full.png`}
                alt={hero.localized_name}
              />
              {hero.selected && (
                <img
                  className='absolute h-4 top-1 right-1'
                  src='./icons/green_checkmark.png'
                />
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default HomePage;
