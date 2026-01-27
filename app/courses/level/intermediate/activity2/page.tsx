import Description from "./Description";
import Exercice from "./Exercice";

const Activity2Page = () => {
  return (
    <section className="bg-white py-16 md:py-20 lg:py-28">
      <div className="container flex flex-col items-center space-y-12">
        <Description />
        <div className="w-full max-w-3xl">
          <Exercice />
        </div>
      </div>
    </section>
  );
};

export default Activity2Page;
