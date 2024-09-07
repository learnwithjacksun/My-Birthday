import prop from 'prop-types'
const Modal = ({children,title, toggleModal}) => {
  return (
      <>
          <div className="fixed inset-0">
              <div onClick={toggleModal} className="absolute inset-0 -z-10 bg-[rgba(0,0,0,0.5)] "></div>
              <div className='bg-white shadow-xl p-4 border w-[80%] md:w-[480px] mx-auto rounded-lg mt-20'>
                  <div className='flex items-center justify-between'>
                      <h2 className='text-xl font-bold'>{title}</h2>
                      <div onClick={toggleModal} className='h-12 w-12 flex-center rounded-full bg-secondary'>
                      <span className="material-symbols-outlined">
close
</span>
                      </div>
                  </div>
                  <div className='mt-4'>{children}</div>
              </div>
      </div>
      
      </>
  )
}

Modal.propTypes = {
    children: prop.node,
    toggleModal: prop.func,
    title: prop.string
}

export default Modal