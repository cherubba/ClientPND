import Image from 'next/image'
import styles from './page.module.css'
import Navbar from '../components/Navbar'
import Dashboard from '../components/Dashboard'

export default function Home() {
  return (
    <div className={styles.main}>
      <Dashboard/>
      </div>

  )
}
