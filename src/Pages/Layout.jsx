import prop from 'prop-types'
const Layout = ({children}) => {
  return (
      <>
          <div className='w-[90%] md:w-[700px] mx-auto my-10'>
              <div>{children}</div>
      </div>
      </>
  )
}

Layout.propTypes = {
    children: prop.node.isRequired
}

export default Layout