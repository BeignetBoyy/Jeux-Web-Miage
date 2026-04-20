# Jeux Web Miage

## Jeux 1 - Karting

[Démonstration vidéo](https://youtu.be/THkOmA98pb4)<br>
[Présentation Powerpoint](https://unice-my.sharepoint.com/:p:/r/personal/sebastien_lallement_etu_unice_fr/Documents/Semestre%206%20Miage/Developpement%20Web/Jeux%20Web%20Miage%20presentation.pptx?d=w173450d505d144ec94628dc4e8f3043b&csf=1&web=1&e=GOvhLi)

### Infos
Seul le jeu de karting fonctionne pour le moment, le reste du site n'est pas fini. **NE SURTOUT PAS VOUS CONNECTER** les mots de passes sont en clair.

Le site peut etre deployé en local en executant ```npm run start``` à la racine du projet

Les scores sont sauvegardés dans une base mongo, et sont accessibles en cliquant sur le bouton en haut a gauche dans la page du jeu. Ce sont des données test qui sont affichés dedans mais si vous finissez une partie et rafraichissez la page ce la devrait bien prendre en et l'ajouter a la liste.

Si vous déployez en local la connexion a la base de données ne fonctionnera pas car vous n'avez pas le **.env**, je n'ai pas mis en place de stockage des scores dans le localstorage. Donc pas d'affichage des scores ni de sauvegarde

Le chargement des assets prend parfois du temps car il y a une musique a charger j'essaierais d'eviter ça la prochaine fois mais pour le moment il faut juste attendre une petite minute.

### Utilisation de l'IA
ChatGPT a été utilisé en grande majorité pour les calculs de collisions et de mouvements pour lesquels je ne comprends pas grand chose et je n'ai pas specialement pris le temps de me pencher dessus. 

Du code généré est present dans les fonctions suivantes :
- Classe Kart :
  - Update()
  - ResolveCollision()
- Script utils :
  - TerrainCollision()
  - DrawCapsule()
  - checkCollision()

### Ce dont je suis fier
Je suis satisfait du jeu de manière générale, même si les contrôles sont un peu difficiles a prendre en main, quasiment toutes les personnes qui l'ont testé ce sont amusés dessus et c'est ce qui compte le plus a mes yeux. Si je devais choisir quelque chose en particulier je dirais que je suis très content du rendu du jeu, les traces de laissées par les voitures ont été particulierement difficiles mais jouissives a implementer. Je suis très satisfait de l'experience utilisateur (les sons, musiques, visuels, gameplay)

### Credits

<span style="color:red">**Aucun des assets dans aucun des jeux n'utilisent de l'IA generative**</span>

*Tous les assets non crédité ont été fait par moi*

**Sons :**
- Musique de fond : **Stadium 64** par *flowerheadmusic* [itch.io](https://flowerheadmusic.itch.io/somewhat-good-karts)
- Moteur : **8-bit car engine** par *EVRetro* [Pixabay](https://pixabay.com/sound-effects/film-special-effects-8-bit-car-engine-64952/)
- Sound effect victoire : **You Win Sequence 1** par *floraphonix* [Pixabay](https://pixabay.com/sound-effects/musical-you-win-sequence-1-183948/)

**Sprites :** 
- Karts : **Mini Pixel Pack 2** par *GrafxKid* [itch.io](https://grafxkid.itch.io/mini-pixel-pack-2)
