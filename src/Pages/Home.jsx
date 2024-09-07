import Container from "../Components/Container";
import Layout from "./Layout";

const Home = () => {
  return (
    <>
      <Layout>
        <div>
          <div className="text-center pb-6">
            <span className="bg-secondary border font-sans text-sm p-2 rounded-full text-sub">
              Hurray, it&apos;s my birthday! 🎉
            </span>
            <h1 className="font-protest my-4 text-5xl md:text-7xl gradient-text">
              Happy Birthday <br /> Gift Jackson
            </h1>
                  </div>
                  
                  <Container/>
        </div>
      </Layout>
    </>
  );
};

export default Home;
