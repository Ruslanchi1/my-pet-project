import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { useState } from 'react'
import Button from '../button/Button'
import classes from './burger-menu.module.sass'

const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false)

  const openMenuHandler = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className={`${classes.burger}`}>
      <div
        className={`${classes['burger-menu']}  ${
          isOpen ? classes['burger-menu__is-open'] : null
        }`}
        onClick={openMenuHandler}
      >
        <div className={classes['burger-menu__row']}>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className={classes['burger-menu__row']}>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className={classes['burger-menu__row']}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <div
        className={`${classes.content} ${isOpen ? classes['is-open'] : null}`}
      >
        <div className={classes['content__inner']} onClick={openMenuHandler}>
          <Link className={classes['content__item']} href="/">
            описание
          </Link>
          <Link className={classes['content__item']} href="/chat">
            чат
          </Link>
          <div className={classes['content__item']} onClick={() => signOut()}>
            выйти
          </div>
        </div>
        <div
          className={`${classes.arrow} ${
            isOpen ? classes['arrow_is-open'] : null
          }`}
          onClick={openMenuHandler}
        >
          <svg
            className={classes['arrow__svg']}
            viewBox="0 0 24 24"
            width="100%"
            height="100%"
            xmlns="http://www.w3.org/2000/svg"
            fill-rule="evenodd"
            clip-rule="evenodd"
          >
            <path d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm0 1c6.071 0 11 4.929 11 11s-4.929 11-11 11-11-4.929-11-11 4.929-11 11-11zm5.247 8l-5.247 6.44-5.263-6.44-.737.678 6 7.322 6-7.335-.753-.665z" />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default BurgerMenu
