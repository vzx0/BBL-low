// Standardized styles for all quiz components
export const quizStyles = {
  // Main colors
  primary: "#ea749b",
  primaryHover: "#d85d87",
  
  // Styles for selected alternatives
  selectedOption: "border-[#ea749b] bg-[#ea749b] text-white shadow-lg transform scale-105",
  unselectedOption: "border-gray-200 bg-white hover:border-[#ea749b]/30 hover:shadow-md",
  
  // Styles for circular icons
  selectedIcon: "bg-white/20",
  unselectedIcon: "bg-gray-100",
  selectedIconText: "text-white",
  unselectedIconText: "text-gray-600",
  
  // Button styles
  primaryButton: "w-full bg-[#ea749b] text-white py-4 px-8 rounded-full font-semibold text-lg hover:bg-[#d85d87] transition-all duration-200",
  
  // Default container
  container: "bg-white min-h-screen",
  maxWidth: "max-w-4xl mx-auto px-4 py-8 md:py-16",
  
  // Options grid
  optionsGrid: "grid grid-cols-1 gap-4 max-w-3xl mx-auto",
  
  // Centered title
  title: "text-center mb-12",
  titleText: "text-3xl md:text-4xl font-bold text-gray-900 mb-4",
  subtitle: "text-gray-600 text-lg",
  
  // Contextual icons for informational pages
  contextualIcons: {
    success: "w-12 h-12 bg-green-100 rounded-full flex items-center justify-center",
    warning: "w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center", 
    error: "w-12 h-12 bg-red-100 rounded-full flex items-center justify-center",
    default: "w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center"
  }
};

// Utility function for option styles
export const getOptionStyles = (isSelected: boolean) => ({
  container: `relative p-6 border-2 rounded-2xl cursor-pointer transition-all duration-300 hover:shadow-lg ${
    isSelected ? quizStyles.selectedOption : quizStyles.unselectedOption
  }`,
  icon: `w-12 h-12 rounded-full flex items-center justify-center ${
    isSelected ? quizStyles.selectedIcon : quizStyles.unselectedIcon
  }`,
  iconText: isSelected ? quizStyles.selectedIconText : quizStyles.unselectedIconText
});

// Consistent style for quiz buttons
export const getButtonStyles = (disabled = false) => `
  w-full bg-[#ea749b] hover:bg-[#d85d87] text-white font-bold py-4 px-8 rounded-full text-lg 
  transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105
  ${disabled ? 'opacity-50 cursor-not-allowed hover:scale-100' : ''}
`;