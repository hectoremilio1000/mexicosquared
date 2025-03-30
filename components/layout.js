import NavBar from "./Navbar";
import FooterFinal from "./FooterFinal";

import { useRouter } from "next/router";
import NavBarEn from "../components/NavBarEn/NavBarEn";
import NavBarEs from "../components/NavBarEs/NavBarEs";

export default function Layout({ children }) {
  // const router = useRouter();
  // const { locale } = router;

  // let NavBarComponent;

  // switch (locale) {
  //     case 'en':
  //         NavBarComponent = NavBarEn;
  //         break;
  //     case 'es':
  //         NavBarComponent = NavBarEs;
  //         break;
  //     default:
  //         NavBarComponent = NavBarEs;
  // }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Aquí arriba podrías renderizar tu <NavBar> si quieres */}
      <main className="flex-grow">{children}</main>
      <FooterFinal />
    </div>
  );
}
