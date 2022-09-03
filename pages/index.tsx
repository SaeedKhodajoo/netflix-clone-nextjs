import {
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  onSnapshot,
  query,
} from "firebase/firestore";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { modalState, movieState } from "../atoms/modalAtom";
import { subscribeState } from "../atoms/subscribeAtom";
// import { subscribeState } from "../atoms/subscribeAtom";
import Banner from "../components/Banner";
import Header from "../components/Header";
import Modal from "../components/Modal";
// import Plans from "../components/Plans";
import Row from "../components/Row";
import { db } from "../firebase";
import useAuth from "../hooks/useAuth";
import useList from "../hooks/useList";
import { Movie } from "../typings";
import requests from "../utils/request";

interface Props {
  netflixOriginals: Movie[];
  trendingNow: Movie[];
  topRated: Movie[];
  actionMovies: Movie[];
  comedyMovies: Movie[];
  horrorMovies: Movie[];
  romanceMovies: Movie[];
  documentaries: Movie[];
}

const Home = ({
  netflixOriginals,
  trendingNow,
  topRated,
  actionMovies,
  comedyMovies,
  horrorMovies,
  romanceMovies,
  documentaries,
}: Props) => {
  const { loading, user } = useAuth();
  const showModal = useRecoilValue(modalState);
  const [isLoading, setIsLoading] = useState(true);
  const subscribed = useRecoilValue(subscribeState);
  const movie = useRecoilValue(movieState);
  const list = useList(user?.uid);
  const [product, setProduct] = useState<DocumentData>([]);
  const router = useRouter()
  

  useEffect(() => {
    const handleGetProduct = async () => {

      if (!user) return;

      // return onSnapshot(
      //   collection(db, "customers", user.uid, "product"),
      //   (snapshot) => {
      //     setProduct(
      //       snapshot.docs.map((doc) => ({
      //         id: doc.id,
      //         ...doc.data(),
      //       }))
      //     );
      //   }
      // );
      

      const q = query(collection(db, "customers", user.uid, "product"));

      // const docRef = doc(db, "customers", user.uid,'product');
      await getDocs(q).then(  (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          setProduct({
            id: doc.id,
            ...doc.data(),
          });
        });
      }
      );
      //  querySnapshot.forEach((doc) => {
      //   // doc.data() is never undefined for query doc snapshots
      //   setProduct({
      //     id: doc.id,
      //     ...doc.data(),
      //   });
      // });

      setIsLoading(false);
    };
    handleGetProduct();
  }, [db, user?.uid]);
  
  if (loading && isLoading) return <p>loading ...</p>;
  
  if(!product.subscribed && !isLoading){
   router.push('/plans') 
  }


  // if (!product.subscribed && !isLoading) return <Plans />;

  return (
    <div
      className={`relative box-border w-screen h-screen bg-gradient-to-b lg:h-[140vh] ${
        showModal && "!h-screen overflow-hidden"
      }`}
    >
      <Head>
        <title>Home - Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className="relative pl-4 pb-24 lg:space-y-24 lg:pl-16">
        <Banner netflixOriginals={netflixOriginals} />
        <section className="md:space-y-24">
          <Row title="Trending Now" movies={trendingNow} />
          <Row title="Top Rated" movies={topRated} />
          {list.length > 0 && <Row title="My List" movies={list} />}

          <Row title="Action Thrillers" movies={actionMovies} />
          <Row title="Comedies" movies={comedyMovies} />
          <Row title="Scary Movies" movies={horrorMovies} />
          <Row title="Romance Movies" movies={romanceMovies} />
          <Row title="Documentaries" movies={documentaries} />
        </section>
      </main>
      {showModal && <Modal />}
    </div>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const [
    netflixOriginals,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries,
  ] = await Promise.all([
    fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
    fetch(requests.fetchTrending).then((res) => res.json()),
    fetch(requests.fetchTopRated).then((res) => res.json()),
    fetch(requests.fetchActionMovies).then((res) => res.json()),
    fetch(requests.fetchComedyMovies).then((res) => res.json()),
    fetch(requests.fetchHorrorMovies).then((res) => res.json()),
    fetch(requests.fetchRomanceMovies).then((res) => res.json()),
    fetch(requests.fetchDocumentaries).then((res) => res.json()),
  ]);

  return {
    props: {
      netflixOriginals: netflixOriginals.results,
      trendingNow: trendingNow.results,
      topRated: topRated.results,
      actionMovies: actionMovies.results,
      comedyMovies: comedyMovies.results,
      horrorMovies: horrorMovies.results,
      romanceMovies: romanceMovies.results,
      documentaries: documentaries.results,
    },
  };
};
