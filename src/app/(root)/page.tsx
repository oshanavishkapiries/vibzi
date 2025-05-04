import Hero from "@/components/common/Home/Hero";
import Activities from "@/components/common/Home/Activities";
import Explore from "@/components/common/Home/Explore";
import Header from "@/components/common/Header";
import SignUp from "@/components/common/Home/SignUp";

export default function Home() {
  return (
    <div className="overflow-y-scroll h-screen snap-y snap-mandatory scrollbar-hide">
      <Header />
      <section className="h-screen w-full snap-start snap-always">
        <Hero />
      </section>
      <section className="h-screen w-full snap-start snap-always">
        <Activities />
      </section>
      <section className="h-screen w-full snap-start snap-always">
        <Explore />
      </section>
      <section className="h-screen w-full snap-start snap-always">
        <SignUp />
      </section>
    </div>
  );
}
