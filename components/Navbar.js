import Link from 'next/link';
import styles from '../app/navbar.module.css'
import Image from 'next/image'
import LogoEramus from '../public/eramus.png'

const Navbar = () => {
    return (
        <nav className={styles.navbar}>
              <Link href="/" className={styles.logo}>
                Client PND Eramus
            </Link>
            <Image
            src={LogoEramus}
            width={50}
            height={50}
            ></Image>
                
          
            {/* Aggiungi qui ulteriori link o elementi della navbar se necessario */}
        </nav>
    );
};

export default Navbar;
