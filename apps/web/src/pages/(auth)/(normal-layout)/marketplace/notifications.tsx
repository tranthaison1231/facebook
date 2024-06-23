

function notification() {
  return (
    <div className="w-full flex justify-between bg-[#f0f2f5] ">
      <div className='w-1/4'></div>
      <div className='w-1/2 bg-white rounded-md min-h-72 p-6'>
        <h1 className=' font-bold text-2xl'>Thông báo</h1>
        <div className=' flex flex-col justify-center items-center'>
            <div className=' w-28 overflow-hidden'>
              <img className =" w-full object-cover" src="https://www.facebook.com/images/comet/empty_states_icons/notifications/null_states_notifications_gray_wash.svg" alt="" />
            </div>
            <p className='font-bold text-secondaryColor'>Bạn không có thông báo nào.</p>
        </div>
      </div>
      <div className='w-1/4'></div>
    </div>

  )
}

export default notification