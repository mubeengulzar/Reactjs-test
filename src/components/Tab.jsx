import { useState, useEffect } from "react";
import axios from "axios";

const Tabs = () => {
  const [mealRecipes, setMealRecipes] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [weekMeals, setWeekMeals] = useState({
    week1: [],
    week2: [],
    week3: [],
    week4: [],
  });
  const [selectedWeek, setSelectedWeek] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [showModal, setShowModal] = useState(false); 

  useEffect(() => {
    // Fetch all recipes from the API
    axios
      .get("https://dummyjson.com/recipes")
      .then((response) => {
        setMealRecipes(response.data.recipes);
      })
      .catch((error) => {
        console.error("Error fetching meals: ", error);
      });
  }, []);

  const handleAddToWeek = () => {
    if (!selectedMeal || !selectedWeek) return;

    const weekMealsList = weekMeals[selectedWeek];
    const mealExists = weekMealsList.some(
      (meal) => meal.id === selectedMeal.id
    );

    if (mealExists) {
      alert("Meal is already added to this week");
      return;
    }

    setWeekMeals((prevState) => ({
      ...prevState,
      [selectedWeek]: [...prevState[selectedWeek], selectedMeal],
    }));

    setSelectedMeal(null);
    setSelectedWeek("");
    setShowModal(false); 
  };

  const handleRemoveMeal = (mealId, week) => {
    setWeekMeals((prevState) => ({
      ...prevState,
      [week]: prevState[week].filter((meal) => meal.id !== mealId),
    }));
  };

  const getFilteredMeals = () => {
    if (activeTab === "all") return mealRecipes;
    return weekMeals[activeTab] || [];
  };

  return (
    <>
    <div className="container p-4 mx-auto md:p-8">
      <div className="flex flex-wrap items-center justify-between p-4 mb-4 font-bold bg-white">
        <div className="flex flex-wrap space-x-2 md:space-x-8">
          <span
            className={`cursor-pointer ${
              activeTab === "all" ? "text-blue-500 font-bold" : "text-gray-700"
            }`}
            onClick={() => setActiveTab("all")}
          >
            All Meals
          </span>
          <span
            className={`cursor-pointer ${
              activeTab === "week1" ? "text-blue-500 font-bold" : "text-gray-700"
            }`}
            onClick={() => setActiveTab("week1")}
          >
            Week 1
          </span>
          <span
            className={`cursor-pointer ${
              activeTab === "week2" ? "text-blue-500 font-bold" : "text-gray-700"
            }`}
            onClick={() => setActiveTab("week2")}
          >
            Week 2
          </span>
          <span
            className={`cursor-pointer ${
              activeTab === "week3" ? "text-blue-500 font-bold" : "text-gray-700"
            }`}
            onClick={() => setActiveTab("week3")}
          >
            Week 3
          </span>
          <span
            className={`cursor-pointer ${
              activeTab === "week4" ? "text-blue-500 font-bold" : "text-gray-700"
            }`}
            onClick={() => setActiveTab("week4")}
          >
            Week 4
          </span>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 mt-2 text-white bg-blue-600 rounded-lg disabled:opacity-50"
          disabled={!selectedMeal}
        >
          {selectedMeal ? "Add to Week" : "Select a Meal to Add"}
        </button>
      </div>
<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
{getFilteredMeals().length > 0 ? (
    getFilteredMeals().map((meal) => (
<div
  key={meal.id}
  onClick={() => setSelectedMeal(meal)}
  className={`bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:border-slate-900 hover:border-4 hover:shadow-lg transition-shadow duration-300 relative`}
>
  {/* Image */}
  <img
    src={meal.image}
    alt={meal.name}
    className="object-cover w-full h-48"
  />
<div className="absolute flex items-center justify-between space-x-2 top-2 left-2 right-2">
  {activeTab !== "all" && (
    <button
      onClick={() => handleRemoveMeal(meal.id, activeTab)}
      className="text-red-600 hover:text-red-800"
    >
      <svg
        className="w-6 h-6 p-1 rounded-sm bg-slate-300"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3 6H5V5C5 3.89543 5.89543 3 7 3H17C18.1046 3 19 3.89543 19 5V6H21V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V6Z"
          stroke="#000"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <line
          x1="18"
          y1="9"
          x2="6"
          y2="9"
          stroke="#000"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <line
          x1="18"
          y1="14"
          x2="6"
          y2="14"
          stroke="#000"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )}
    <span className="absolute right-0 px-2 py-2 text-xs font-semibold text-white bg-black rounded-full top-1">
    {meal.mealType[0]}
  </span>
</div>
  <div className="p-4 ">
    <h2 className="text-xl font-bold text-gray-900">{meal.name}</h2>
    <p className="pt-2 text-gray-700">{meal.instructions}</p>
    
    <div className="flex mt-3 space-x-5">
      <span className="text-sm text-gray-600"><strong>Cuisine:</strong> {meal.cuisine}</span>
      <div className="flex items-center">
        <span className="text-sm text-gray-600"><strong>Rating:</strong> {meal.rating}</span>
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-4 h-4 fill-current ${i < meal.rating ? "text-slate-900" : "text-gray-300"}`}
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    </div>
  </div>
</div>
))
) : (
  <p>No meals available in this category.</p>
)}
</div>

      {showModal && selectedMeal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
            <h2 className="mb-4 text-lg font-bold text-center">Select a Week</h2>
            <div className="flex space-x-4">
              {["week1", "week2", "week3", "week4"].map((week) => (
                <button
                  key={week}
                  className={`px-4 py-2 rounded-lg ${
                    selectedWeek === week ? "bg-blue-600 text-white" : "bg-gray-200"
                  }`}
                  onClick={() => setSelectedWeek(week)}
                >
                  {week.charAt(0).toUpperCase() + week.slice(1)}
                </button>
              ))}
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 mr-2 text-white bg-gray-400 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleAddToWeek}
                className={`px-4 py-2 text-white bg-blue-600 rounded ${
                  !selectedMeal || !selectedWeek
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                disabled={!selectedMeal || !selectedWeek}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div></>
    
  );
};

export default Tabs;
