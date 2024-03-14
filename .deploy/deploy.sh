cd ~/project_as_production
npm run build:prod

rm -rf ~/../var/www/project_as_production/html
mv ~/project_as_production/build ~/../var/www/project_as_production/html