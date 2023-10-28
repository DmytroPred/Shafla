'use client';
import { PropsWithChildren, useContext, useEffect } from 'react';
import Header from './Header';
import AuthContext, { AuthContextType } from '@/app/store/auth-context';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '@/app/config/firebase';
import { useRouter } from 'next/navigation';
import {
  DocumentData,
  DocumentReference,
  doc,
  getDoc,
} from 'firebase/firestore';
import HeroesContext, { HeroesContextType } from '@/app/store/heroesContext';

const Layout = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const authCtx = useContext<AuthContextType>(AuthContext);
  const heroesCtx = useContext<HeroesContextType>(HeroesContext);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      authCtx.setUser(user);
      authCtx.setIsAuthenticated(user);
      authGuard(user);

      if (user?.uid) {
        getSelectedHeroes(user.uid);
      }
    });
  }, []);

  function getSelectedHeroes(userId: string): void {
    const taskCollectionRef = doc(db, `users/${userId}`);

    fetchHeroes(taskCollectionRef);
  }

  const fetchHeroes = async (
    userRef: DocumentReference<DocumentData, DocumentData>
  ) => {
    try {
      const doc = (await getDoc(userRef)).data();

      if (!doc) return;

      heroesCtx.setSelectedHeroList(doc.selectedHeroes);
      heroesCtx.updateSelectedHeroesState({
        heroIds: doc.selectedHeroes,
        selectedHeroIndex: -1,
      });
    } catch (err) {
      console.error(err);
    }
  };

  function authGuard(user: User | null): void {
    user ? router.push('/') : router.push('/sign-in');
  }

  return (
    <div>
      <Header></Header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
