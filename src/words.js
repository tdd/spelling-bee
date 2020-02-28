const WORDS = `
  adorer adulte aimer ami amour âne anniversaire apéro armoire aspirateur assiette aujourd’hui au revoir avion
  bain balai ballon barbe bébé benoît bêtise bientôt boire bombon bonjour bonnet bouche bouchon bouteille bouton
  bracelet bras brosse bulle
  canapé carotte casque casquette chaise chambre chapeau chaud chocolat chambre chat chaussette chemise cheval
  cheveux chien christophe cinéma citron clown cochon coffre concombre confiture content cool copain copine
  costaud couche couette coussin couteau couvert couverture crayon crèche cuiller cuisine culotte
  d’accord demain dessin difficile docteur dodo dormir douce doucement douche doudou doux drapeau dur
  eau école éléphant élodie elliott enfant
  facile famille félix fenêtre fesses feutre fort four fourchette fraise framboise frère froid front
  génial gentil gentille
  haricot hippopotame
  gant gâteau genou girafe grand granny gustave
  hamburger héros hier histoire
  jambe jeu joue jouer jouet jour
  karaté ketchup koala
  lampe lent lion lit livre long longue luc lumière lunettes
  main maîtresse malade maladie maman mamie manger manteau matin maxence maxime méchant méchante meilleur
  menton merci micro-ondes midi miroir montre mouchoir moutarde mouton moyen moyenne mur
  nettoyer nez nuit
  ordinateur oreille oreiller
  paille pantalon papa papier parc pardon parents pâtes peluche personne petit peur pied piquant plafond plein
  poisson popcorn porte poule poulet poussière propre pull
  radiateur rapide regarder réveil rideau robot
  sac salade sale salon sauce semaine serviette siège sieste s’il te plaît singe soir sol soupe stylo sourire super
  table tableau tapis télé télévision terre tête tétine tigre tiroir toilettes tomate tortue toujours tousser
  train triste trottinette
  vacances valise vélo ventilateur verre véronique viande vide vite vitre voiture voyage
  yeux
`.split(/[\n\t ]+/)

export function pickRandomWord() {
  return WORDS[Math.floor(Math.random() * WORDS.length)]
}

export function stripDiacritics(word) {
  return word
    .replace(/[âä]/g, 'a')
    .replace(/ç/g, 'c')
    .replace(/[éèêë]/g, 'e')
    .replace(/[îï]/g, 'i')
    .replace(/[ôö]/g, 'o')
    .replace(/[ûü]/g, 'u')
}
