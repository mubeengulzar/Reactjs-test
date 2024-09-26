const Header = () => {
  return (
    <><div className="relative h-[350px] text-center p-10  bg-center bg-cover" style={{ backgroundImage: "url('https://cdn.dummyjson.com/recipe-images/1.webp')" }}>
    <div className="absolute inset-0 bg-gradient-to-r from-[#faeaf7] via-[#e9f0f9] to-[#faf3ee] opacity-50"></div>
    <div className="relative z-10 p-10 text-center text-black">
      <h1 className="text-5xl font-bold">Optimized Your Meal</h1>
      <p className="mt-2">Select Meal to Add in Week. You will be able to edit, modify and change the Meal Weeks.</p>
    </div>
  </div>
  <div className="bg-gradient-to-r from-[#faeaf7] via-[#e9f0f9] to-[#faf3ee] opacity-50] p-[30px] ">
    <h1 className="font-bold  text-3xl ml-[25px]">Week Order</h1>

  </div></>
    
  );
};

export default Header;
