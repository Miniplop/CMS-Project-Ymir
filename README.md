Ymir project
========================

Welcome to the Ymir project.

This application is developed by 4 students of Ensimag.



1) Installing Ymir project
----------------------------------


Dans un premier temps mes amis vous devez telecharger et installer :

- http://rubyinstaller.org/

- https://getcomposer.org/Composer-Setup.exe

- http://nodejs.org/dist/v0.12.4/x64/node-v0.12.4-x64.msi

- http://www.wampserver.com/en/download-wampserver-32bits/


Puis lancer votre terminal : 

- npm install -g bower

- gem install sass

- gem update --system

- gem install compass


Maintenant il ne reste plus qu'a mettre à jour fichier.

Vous devez aller, avec votre terminal, dans le fichier contenant le bower.json et composer.json

Tapez les commandes suivantes :

- bower update

- composer update


2) Deployement des ressources publiques :
----------------------------------

Dans le répertoire de base (contenant bower.json et composer.json) et tapez les commandes : 

-php app/console assets:install

-php app/console assetic:dump