import { useSession, signOut } from 'next-auth/react'
import classes from './main-navigation.module.sass'

import Button from '../button/Button'
import BurgerMenu from '../burger/burger-menu'

const MainNavigation = (props) => {
  const { data: session, status } = useSession()

  const signOutHandler = () => {
    signOut()
  }

  return (
    <header className={classes.header}>
      <div className={classes['header-container']}>
        <nav>
          <ul className={classes['navigation-list']}>
            {session ? <li>header</li> : <li>Русланский проект</li>}
            {session && <li>you signed in as {session.user.name}</li>}
          </ul>
        </nav>
        {session && <BurgerMenu/>}
        {/* {session && <Button onClick={signOutHandler}>sign out</Button>} */}
      </div>
    </header>
  )
}

export default MainNavigation
