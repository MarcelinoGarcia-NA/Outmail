# Outmail

#############################EXECUTANDO A API(back_end)###################################################
#YARN
Para inicializar o projeto é necessario ter o pacote YARN
Para instalar ultilize o comando no (prompt comand):

choco install yarn

Se não tiver o software chocolatey não será possivel instalar o yarn, então se não tiver o chocolatey instale com comando no prompt:

Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

Após repita o comando choco install yarn

após o yarn instalado abra a pasta do projeto back_end com comando cd e o caminho, como no exemplo abaixo:

cd C:\Users\Garcia\Desktop\Project_Email\back_end

logo será necessario instalar a pasta node_modules com as dependencias, para isso execute:

yarn install 

será instalado todas as dependecias

e por fim podemos executar nossa api rest, execute:

yarn dev

na pasta do back_end existe a pasta src, e dentro o arquivo routes.js nele está presente todas routas para teste no postman ou insomnia

########################################EXECUTANDO CLIENTE(front_end)################################################################

Para executar cliente abra a pasta front_end e execute o comando cd e o caminho, como no exemplo abaixo:

cd C:\Users\Garcia\Desktop\Project_Email\front_end

logo será necessario instalar a pasta node_modules com as dependencias, para isso execute:

yarn install 

será instalado todas as dependecias

e por fim podemos executar nosso lado cliente, execute:

yarn start

agora é possivel abrir nosso cliente acesse no navegador http://localhost:3000/login