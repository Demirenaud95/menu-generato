const recipes = require('./recipes');
const PDFDocument = require('pdfkit');
const fs = require('fs');

function filterRecipesByTags(recipes, tagsToAvoid) {
  return recipes.filter(recipe => {
    return !tagsToAvoid.some(tag => recipe.tags.includes(tag));
  });
}

function generateMenu(caloriesGoal, preferences = [], allergies = []) {
  let totalCalories = 0;
  let menu = [];

  while (totalCalories < caloriesGoal) {
    for (let mealType in recipes) {
      let options = recipes[mealType];
      let filteredOptions = filterRecipesByTags(options, preferences.concat(allergies));
      if (filteredOptions.length === 0) continue;

      let recipe = filteredOptions[Math.floor(Math.random() * filteredOptions.length)];
      menu.push(recipe);
      totalCalories += recipe.calories;
      if (totalCalories >= caloriesGoal) break;
    }
  }

  return menu;
}

function createMenuPDF(menu, fileName) {
  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream(fileName));

  doc.fontSize(20).text('Menu Personnalisé', { align: 'center' });
  doc.moveDown();

  menu.forEach((item, index) => {
    doc.fontSize(14).text(`${index + 1}. ${item.name} - ${item.calories} kcal`);
  });

  doc.end();
}

const alexPreferences = ["vegan"];
const alexAllergies = ["gluten"];

const alexCalories = 2200;
const alexMenu = generateMenu(alexCalories, alexPreferences, alexAllergies);
createMenuPDF(alexMenu, 'menu_Alex.pdf');
