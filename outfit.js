// outfit-recommendation.js
function generateOutfitRecommendation(weatherData) {
    let outfitSuggestion = '';
    let imageSrc = [];

    // Implement logic to generate outfit recommendations based on weather data
    if (weatherData.main.temp < 288.15) {
        outfitSuggestion = 'It\'s cold! Consider wearing a warm jacket, scarf, and boots.';
        imageSrc = ['cold1.jpg', 'cold2.jpg', 'cold3.jpg', 'cold4.jpg'];
    } else if (weatherData.main.temp >= 288.15 && weatherData.main.temp <= 298.15) {
        outfitSuggestion = 'It\'s mild. A light jacket, jeans, and a t-shirt should be comfortable.';
        imageSrc = ['mild1.jpg', 'mild2.jpg', 'mild3.jpg', 'mild4.jpg'];
    } else {
        outfitSuggestion = 'It\'s warm! Shorts, a tank top, and sunglasses would be great.';
        imageSrc = ['hot1.jpg', 'hot2.jpg', 'hot3.jpg', 'hot4.jpg'];
    }

    // Log to the console for debugging
    console.log('Outfit Suggestion:', outfitSuggestion);
    console.log('Image Sources:', imageSrc);

    // Return the outfit suggestion and image sources
    return { outfitSuggestion, imageSrc };
}

// Export the function to make it accessible in other files
module.exports = generateOutfitRecommendation;