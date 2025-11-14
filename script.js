const  inputBox=document.getElementById("input-box");
const  listContainer=document.getElementById("list-container");

function addTask(){
    if(inputBox.value === ''){
        alert("You need to write somtheing!!");
    }
    else{
        let li=document.createElement("li");
        li.innerHTML=inputBox.value;
        listContainer.appendChild(li);
        let span=document.createElement("span");
        span.innerHTML="\u00d7";
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData();
}

listContainer.addEventListener("click",function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
    }
else if(e.target.tagName === "SPAN"){
    e.target.parentElement.remove();
    saveData();
    }
},false);
function saveData(){
    localStorage.setItem("data",listContainer.innerHTML);
}
function showTask(){
    listContainer.innerHTML=localStorage.getItem("data");
}
showTask();




























Docker

III. Docker / Docker Compose (6 Qs) 

Fresh Ubuntu Setup for Docker Practical Exam (Q1–Q6)
Step 1: Update and Upgrade OS
sudo apt update -y
sudo apt upgrade -y
 Ensures system packages are up-to-date.

Step 2: Install Required Packages
sudo apt install -y apt-transport-https ca-certificates curl software-properties-common gnupg lsb-release
Needed for adding Docker repository and secure installation.

Step 3: Install Docker

Add Docker GPG key and repository:
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

Install Docker Engine:
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io
Verify Docker installation:
docker --version
docker run hello-world

Step 4: Allow Docker Without sudo (Optional for Convenience)
sudo usermod -aG docker $USER
Then logout and login again so group changes apply.
Now you can run Docker commands without sudo.

Step 5: Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
docker-compose --version

Step 6: Install curl for Testing (Q1 & Q2)
sudo apt install -y curl
Needed to test HTTP requests inside Ubuntu container or for Nginx/HTTPD containers.

Step 7: (Optional) Install a Text Editor
sudo apt install -y nano vim
Useful for editing docker-compose.yml files (Q5 & Q6).

Step 8: Verify Setup for Exam
Run docker ps → should return empty container list (but Docker engine working).
Run docker-compose version → verify Compose installed.
Pull and run any simple container to test, e.g.,
docker run -it --rm ubuntu bash
If you can get into Ubuntu shell and run ls, setup is confirmed.
________________________________________
Q1. Pull any Docker image from Docker Hub and run it.
Step 1: Pull the Nginx Image
@skfatima26 ➜ /workspaces/devops-practice (main) $ docker pull nginx
Using default tag: latest
latest: Pulling from library/nginx
5c32499ab806: Pull complete 
375a694db734: Pull complete 
5f825f15e2e0: Pull complete 
16d05858bb8d: Pull complete 
08cfef42fd24: Pull complete 
3cc5fdd1317a: Pull complete 
4f4e50e20765: Pull complete 
Digest: sha256:8adbdcb969e2676478ee2c7ad333956f0c8e0e4c5a7463f4611d7a2e7a7ff5dc
Status: Downloaded newer image for nginx:latest
docker.io/library/nginx:latest
Explanation:
Pulls the latest version of the nginx image from Docker Hub.

Step 2: Verify the Images
@skfatima26 ➜ /workspaces/devops-practice (main) $ docker images
REPOSITORY   TAG       IMAGE ID       CREATED        SIZE
ubuntu       latest    ce8f79aecc43   44 hours ago   78.1MB
mysql        8.0       94753e67a0a9   8 days ago     780MB
ubuntu       <none>    6d79abd4c962   3 weeks ago    78.1MB
nginx        latest    203ad09fc156   7 weeks ago    192MB
Explanation:
Lists all downloaded images including the newly pulled nginx image.

Step 3: Run Nginx Container with Port Mapping
@skfatima26 ➜ /workspaces/devops-practice (main) $ docker run -d --name mynginx -p 8080:80 nginx
419889832c69b1174c390309e155f09b3ca02bf0042596346aea7b65ae7cb1fa
Explanation:
Runs container in detached mode (-d)
Names it mynginx
Maps host port 8080 to container port 80 (-p 8080:80)
Uses nginx image

Step 4: Verify the Running Container
@skfatima26 ➜ /workspaces/devops-practice (main) $ docker ps
CONTAINER ID   IMAGE     COMMAND                  CREATED          STATUS          PORTS                                     NAMES
419889832c69   nginx     "/docker-entrypoint.…"   13 seconds ago   Up 13 seconds   0.0.0.0:8080->80/tcp, [::]:8080->80/tcp   mynginx
Explanation:
Shows that the container mynginx is running and port 8080 is mapped to container’s port 80.

Step 5: Test Nginx Server
@skfatima26 ➜ /workspaces/devops-practice (main) $ curl http://localhost:8080
<!DOCTYPE html>
<html>
<head>
<title>Welcome to nginx!</title>
<style>
html { color-scheme: light dark; }
body { width: 35em; margin: 0 auto;
font-family: Tahoma, Verdana, Arial, sans-serif; }
</style>
</head>
<body>
<h1>Welcome to nginx!</h1>
<p>If you see this page, the nginx web server is successfully installed and
working. Further configuration is required.</p>

<p>For online documentation and support please refer to
<a href="http://nginx.org/">nginx.org</a>.<br/>
Commercial support is available at
<a href="http://nginx.com/">nginx.com</a>.</p>

<p><em>Thank you for using nginx.</em></p>
</body>
</html>
Explanation:
Confirms that the nginx server is running and serving content. Browser can also be used: http://localhost:8080 → “Welcome to nginx!”

________________________________________
Q2. Start a Docker container of any image and expose port 9000 from it.
Step 1: Pull the Image
@skfatima26 ➜ /workspaces/devops-practice (main) $ docker pull httpd
Using default tag: latest
latest: Pulling from library/httpd
8c7716127147: Pull complete 
af3b83c443ec: Pull complete 
4f4fb700ef54: Pull complete 
6c19a85825c3: Pull complete 
12844f4198f6: Pull complete 
fbb3c2cad9f8: Pull complete 
Digest: sha256:ca375ab8ef2cb8bede6b1bb97a943cce7f0a304d5459c05235b47bc2dccb98cd
Status: Downloaded newer image for httpd:latest
docker.io/library/httpd:latest
Explanation:
Pulls the latest version of the Apache HTTP server image (httpd) from Docker Hub.

Step 2: Run the Container with Port Mapping
@skfatima26 ➜ /workspaces/devops-practice (main) $ docker run -d --name myhttpd -p 9000:80 httpd
e57135afbc753a4ed10ff0e8728deda0581bd6c9bb314b79761f7649cda4c36b
Explanation:
Runs the container in detached mode (-d)
Names it myhttpd
Maps host port 9000 to container port 80 (-p 9000:80)
Uses httpd image

Step 3: Verify the Running Container
@skfatima26 ➜ /workspaces/devops-practice (main) $ docker ps
CONTAINER ID   IMAGE     COMMAND                  CREATED          STATUS          PORTS                                     NAMES
e57135afbc75   httpd     "httpd-foreground"       13 seconds ago   Up 12 seconds   0.0.0.0:9000->80/tcp, [::]:9000->80/tcp   myhttpd
419889832c69   nginx     "/docker-entrypoint.…"   17 minutes ago   Up 17 minutes   0.0.0.0:8080->80/tcp, [::]:8080->80/tcp   mynginx
Explanation:
Shows that the container myhttpd is running and port 9000 is mapped to container’s port 80.

Step 4: Test the Container in Browser or with curl
@skfatima26 ➜ /workspaces/devops-practice (main) $ curl http://localhost:9000
<html><body><h1>It works!</h1></body></html>
Explanation:
Verifies that the Apache server is serving content on port 9000.
Browser can also be used: http://localhost:9000 → shows “It works!”

________________________________________
Q3. Execute the following Docker commands: docker exec, docker rm, docker rmi.
Step 1: Run an Ubuntu Container

@skfatima26 ➜ /workspaces/devops-practice (main) $ docker run -it -d --name myubuntu ubuntu
21a0c840015d4170abc29605551f1a6b88ee019b1963dff4a666536fd6b90c34
Explanation:
This command creates and starts a new Ubuntu container in detached mode (-d) with an interactive terminal (-it) and assigns it the name myubuntu.

Step 2: Execute Commands Inside the Running Container
@skfatima26 ➜ /workspaces/devops-practice (main) $ docker exec -it myubuntu bash
root@21a0c840015d:/# ls
bin  boot  dev  etc  home  lib  lib64  media  mnt  opt  proc  root  run  sbin  srv  sys  tmp  usr  var
root@21a0c840015d:/# exit
Explanation:
The docker exec command is used to open a bash shell inside the running container.
The ls command lists all directories in the container’s root.

Step 3: Stop the Container
@skfatima26 ➜ /workspaces/devops-practice (main) $ docker stop myubuntu
myubuntu
Explanation:
Stops the running container myubuntu.

Step 4: Remove the Stopped Container
@skfatima26 ➜ /workspaces/devops-practice (main) $ docker rm myubuntu
myubuntu
Explanation:
Deletes the stopped container myubuntu from the system.

Step 5: Check Existing Containers
@skfatima26 ➜ /workspaces/devops-practice (main) $ docker ps -a

CONTAINER ID   IMAGE          COMMAND                  CREATED          STATUS                        PORTS                                                    NAMES
e57135afbc75   httpd          "httpd-foreground"       9 minutes ago    Up 9 minutes                  0.0.0.0:9000->80/tcp, [::]:9000->80/tcp                  myhttpd
419889832c69   nginx          "/docker-entrypoint.…"   26 minutes ago   Up 26 minutes                 0.0.0.0:8080->80/tcp, [::]:8080->80/tcp                  mynginx
54c6646903b5   ubuntu         "bash"                   31 minutes ago   Exited (130) 27 minutes ago                                                            ubuntu_test
9ff82a9ba37c   mysql:8.0      "docker-entrypoint.s…"   21 hours ago     Exited (255) 33 minutes ago   33060/tcp, 0.0.0.0:3307->3306/tcp, [::]:3307->3306/tcp   mysql_user_container
2ffaffdbdba6   6d79abd4c962   "bash"                   22 hours ago     Exited (0) 22 hours ago                                                                inspiring_northcutt

Step 6: Remove the Extra Container
@skfatima26 ➜ /workspaces/devops-practice (main) $ docker rm 54c6646903b5
54c6646903b5
Explanation:
Removes the ubuntu_test container which was using the Ubuntu image.

Step 7: Remove the Ubuntu Image
@skfatima26 ➜ /workspaces/devops-practice (main) $ docker rmi ubuntu
Untagged: ubuntu:latest
Untagged: ubuntu@sha256:fdb6c9ceb1293dcb0b7eda5df195b15303b01857d7b10f98489e7691d20aa2a1
Deleted: sha256:ce8f79aecc435fc0b22d4dd58c72836e330beddf204491eef3f91af51bc48ed7
Deleted: sha256:65b08cd99c6053451d2752c3a9a1c048ca23ff1151f0985f5772d898a1efb816

________________________________________
Q4. Pull a Ubuntu image from Docker Hub and execute the ls command.
Step 1 — 
@skfatima26 ➜ /workspaces/devops-practice (main) $ cd /workspaces/devops-practice

Step 2 — Pull the Ubuntu image
@skfatima26 ➜ /workspaces/devops-practice (main) $ docker pull ubuntu
Output:
Using default tag: latest
latest: Pulling from library/ubuntu
a1a21c96bc16: Pull complete 
Digest: sha256:fdb6c9ceb1293dcb0b7eda5df195b15303b01857d7b10f98489e7691d20aa2a1
Status: Downloaded newer image for ubuntu:latest
docker.io/library/ubuntu:latest

Step 3 — Run the Ubuntu container
@skfatima26 ➜ /workspaces/devops-practice (main) $ docker run -it --name ubuntu_test ubuntu bash
Output:
root@54c6646903b5:/#
Explanation:
docker run → runs a container.
-it → opens interactive terminal.
--name ubuntu_test → gives a name to container.
ubuntu bash → runs bash shell inside Ubuntu container.
At this point, you are inside the container (prompt starts with root@...:/#).

Step 4 — Execute the ls command inside container
root@54c6646903b5:/# ls
Output:
bin  boot  dev  etc  home  lib  lib64  media  mnt  opt  proc  root  run  sbin  srv  sys  tmp  usr  var

Step 5 — Exit the container
root@54c6646903b5:/# exit
@skfatima26 ➜ /workspaces/devops-practice (main) $
________________________________________
Q5. Write a Docker Compose file for MySQL installation.
Step 1: Create a docker-compose.yml file
@skfatima26 ➜ /workspaces/devops-practice (main) $ touch docker-compose.yml
@skfatima26 ➜ /workspaces/devops-practice (main) $ code docker-compose.yml
Explanation:
Creates a docker-compose.yml file
Opens it in editor (VS Code / Codespace)
Step 2: Add MySQL Service to the Compose File
docker-compose.yml
version: "3.8"

services:
  mysql-db:
    image: mysql:8.0
    container_name: mysql_container
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: Root@123
      MYSQL_DATABASE: mydatabase
      MYSQL_USER: user1
      MYSQL_PASSWORD: User@123
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql

volumes:
  mysql_data:
 Explanation:
version: Specifies Docker Compose version
services: Defines containerized services
mysql-db: Service name
image: Uses official MySQL 8.0 image
container_name: Friendly container name
restart: Always restart container if it stops
environment: Set root password, database, user, and user password
ports: Map host port 3306 to container port 3306
volumes: Persist data on host (so database is not lost on container removal)

Step 3: Run the Compose File
@skfatima26 ➜ /workspaces/devops-practice (main) $ docker-compose up -d
Creating network "devops-practice_default" with the default driver
Creating mysql_container ... done
Explanation:
docker-compose up -d starts all services in detached mode
Creates network, volumes, and the MySQL container

Step 4: Verify Running Containers
@skfatima26 ➜ /workspaces/devops-practice (main) $ docker ps
CONTAINER ID   IMAGE       COMMAND                  CREATED          STATUS          PORTS                    NAMES
abcdef123456   mysql:8.0   "docker-entrypoint.s…"   5 seconds ago    Up 4 seconds    0.0.0.0:3306->3306/tcp   mysql_container
Explanation:
Confirms MySQL container is running and port 3306 is exposed
Data is persisted in the Docker volume mysql_data

________________________________________
Q6. Write a Docker Compose file for MySQL user creation.
Step 1: Navigate to project directory
@skfatima26 ➜ /workspaces/devops-practice (main) $ cd docker

Step 2: Create Docker Compose file
@skfatima26 ➜ /workspaces/devops-practice/docker (main) $
 nano docker-compose-mysql-user.yml
services:
  mysql:
    image: mysql:8.0
    container_name: mysql_user_container
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: root123
      MYSQL_DATABASE: userdb
      MYSQL_USER: devuser
      MYSQL_PASSWORD: devpass
    ports:
      - "3307:3306"
    volumes:
      - db_user_data:/var/lib/mysql

volumes:
  db_user_data:

Step 3: Run the MySQL container
@skfatima26 ➜ /workspaces/devops-practice/docker (main) $ docker-compose -f docker-compose-mysql-user.yml up -d
Output:
[+] Running 3/3
 Network docker_default          Created
Volume "docker_db_user_data"    Created
Container mysql_user_container  Started

Step 4: Verify container is running
@skfatima26 ➜ /workspaces/devops-practice/docker (main) $ docker ps
Output:
CONTAINER ID   IMAGE       COMMAND                  CREATED          STATUS         PORTS                                                    NAMES
b752f3734b24   mysql:8.0   "docker-entrypoint.s…"   10 seconds ago   Up 9 seconds   0.0.0.0:3307->3306/tcp, [::]:3307->3306/tcp   mysql_user_container

Step 5: Access MySQL inside container
@skfatima26 ➜ /workspaces/devops-practice/docker (main) $ 
docker exec -it mysql_user_container mysql -u devuser -p
Then enter password: devpass
Output:
Welcome to the MySQL monitor.  Commands end with ; or \g.
Server version: 8.0.43 MySQL Community Server - GPL

Step 6: Verify database
mysql> SHOW DATABASES;
Output:
+--------------------+
| Database           |
+--------------------+
| information_schema |
| performance_schema |
| userdb             |
+--------------------+
3 rows in set (0.00 sec)

Step 7: Exit MySQL
mysql> exit
Step 8: Stop and remove container
@skfatima26 ➜ /workspaces/devops-practice/docker (main) $ 
docker-compose -f docker-compose-mysql-user.yml down
Output:
[+] Running 2/2
 Container mysql_user_container  Removed
 Network docker_default          Removed

