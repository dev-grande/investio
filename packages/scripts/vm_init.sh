sudo apt update
sudo apt install git
sudo apt install npm

curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt update && sudo apt install yarn

curl -sL https://deb.nodesource.com/setup_current.x | sudo -E bash -
sudo apt-get install -y nodejs

sudo apt-get update
sudo apt install docker.io
sudo systemctl start docker
sudo systemctl enable docker

sudo curl -L "https://github.com/docker/compose/releases/download/1.27.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

sudo npm install -g lerna

sudo apt update && sudo apt install postgresql postgresql-contrib
sudo service postgresql stop

sudo apt update && sudo apt install nginx

sudo add-apt-repository ppa:certbot/certbot
sudo apt-get update
sudo apt-get install python-certbot-nginx

sudo vim /etc/nginx/sites-available/default
sudo systemctl reload nginx
sudo certbot --nginx -d example.com -d www.example.com
sudo systemctl stop nginx
sudo certbot renew --dry-run

