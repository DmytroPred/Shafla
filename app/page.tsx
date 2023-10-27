'use client';
import { useContext, useRef, useState } from 'react';
import { IHero } from './models/hero.interface';
import { debounce } from './utils/debounce';
import HeroesContext, { HeroesContextType } from './store/heroesContext';
import AuthContext from './store/auth-context';

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
    const randomNumber = Math.floor(
      Math.random() * (heroesCtx.selectedHeroes.length + 1)
    );

    const randomHeroIndex = heroesCtx.selectedHeroes[randomNumber];

    const randHero = heroesCtx.heroList.find(
      (hero) => hero.selected && hero.id === randomHeroIndex
    );

    console.log(randHero);
    if (randHero) setRandomHero(randHero);
  };

  return (
    <>
      <div className='w-11/12 h-11/12 mt-12 mx-auto flex justify-between'>
        <input
          className='text-input'
          type='text'
          placeholder='Search by name...'
          onChange={(e) => {
            const value = e.target.value;
            searchValue.current = value;
            return searchWithDebounce(value);
          }}
        />

        {/* <div className='flex gap-x-1 bg-slate-200 rounded-full border'>
          <button
            className={`${
              tasksCtx.taskTableView && 'bg-gray-50'
            } rounded-full px-4`}
            onClick={() => tasksCtx.setTaskTableView(true)}
          >
            Table
          </button>
          <button
            className={`${
              !tasksCtx.taskTableView && 'bg-gray-50'
            } rounded-full px-4 `}
            onClick={() => tasksCtx.setTaskTableView(false)}
          >
            Cards
          </button>
        </div> */}
      </div>

      <div
        className='mt-6 mb-12 w-11/12 h-11/12 mx-auto flex flex-wrap gap-1
      '
      >
        {heroesCtx.heroList.map((hero: IHero) => {
          return (
            <div
              className='relative'
              key={hero.id}
              onClick={() => updateHeroStatus(hero)}
            >
              <img
                className={`h-16 cursor-pointer duration-100 hover:scale-110 ${
                  hero.disabled === false && 'grayscale'
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

      <div className='mx-auto w-56'>
        <button
          className='submit-button w-56'
          onClick={getRandomHeroFromSelected}
        >
          Shaffle
        </button>

        <img
          className='rounded-lg mt-4 mb-4'
          src={`./images/heroes/${randomHero?.image}_full.png`}
          alt=''
        />
      </div>
    </>
  );
}

export default HomePage;
