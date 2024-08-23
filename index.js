const generateMenu = require('./generateMenu');

// Exemple d'utilisation : génération d'un menu pour une personne avec des préférences spécifiques
const preferences = ["vegan"];
const allergies = ["gluten"];
const dailyCalories = 2200;

// Générer le menu pour une journée
const menu = generateMenu(dailyCalories, preferences, allergies);

// Générer un fichier PDF avec le menu
generateMenu.createMenuPDF(menu, 'menu_Alex.pdf');

console.log("Le menu a été généré avec succès !");
