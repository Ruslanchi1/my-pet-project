import MainNavigation from './main-navigation'
import GlobalFooter from './global-footer'

const Layout = (props) => {

  return (
    <div className='wrapper'>
      <MainNavigation />
      <main className='content'>{props.children}</main>
      <GlobalFooter />
    </div>
  )
}

export default Layout
