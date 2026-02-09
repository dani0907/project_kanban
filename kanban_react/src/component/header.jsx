function Header(){
  return(
    <header className="border-b border-gray-100 px-10 py-6 flex justify-between items-center bg-white/80 backdrop-blur-md sticky top-0 z-10">
      <h1 className="text-xl font-black tracking-tighter">KANBAN.</h1>
      <div className="flex items-center gap-4 text-sm font-medium text-gray-500">
        <button className="hover:text-black">Boards</button>
        <button className="hover:text-black">Members</button>
        <div className="w-8 h-8 rounded-full bg-gray-200 border border-gray-100 flex items-center justify-center text-xs font-bold text-gray-600">D</div>
      </div>
    </header>
  )
}

export default Header;