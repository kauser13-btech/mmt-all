import '../globals.css';
import { Montserrat, Staatliches, Roboto } from "next/font/google";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const montserrat = Montserrat({ subsets: ["latin"], display: "swap" });
const staatliches = Staatliches({ subsets: ["latin"], display: "swap", weight: "400" });
const roboto = Roboto({ subsets: ["latin"], display: "swap", weight: "400" });

export const metadata = {
  title: 'Sign Up | MatchMyTees',
  description: 'Create your MatchMyTees account',
}

export default function SignUpLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${roboto.className} bg-white text-gray-900`}>
        {children}
        <ToastContainer />
      </body>
    </html>
  )
}
