<p align="center">
  <img src="https://drive.google.com/uc?export=view&id=1z9_X5uvEfuPqrVxRbAWlLlviN9PdhcCp">
</p>

---

## Background

Div Graphs is a web application that helps you visualize and comprehend your investment portfolio using imported transaction data.  Upon creating an account, you can upload your transaction data through .csv files and view the visualized data on the dashboard page. Your current stocks owned, dividend earnings history and overall portfolio information are shown on this page. The frontend part of this project was developed with with React, Redux, Javascript, and Docker.

---

## Usage

### Register and Login
<p align="left">
  <img src="https://drive.google.com/uc?export=view&id=1UIw0fZGlRGl7YWP6r5bFiNLnuSxrTXm7" height="600">
</p>
  
<br />

### Import CSV transaction data from TD Ameritrade [Settings Page]

<br />

**TD Ameritrade download CSV**
* Export your transaction data by year to a .csv using the 'Download' feature under your TD Ameritrade History and Statements.
<p align="left">
  <img src="https://drive.google.com/uc?export=view&id=1_lhrSOvZsH3gorflFFKG4oLMu2DSkVjo" height="370">
</p>
<br /><br />

**[Settings Page]  -  Data Import and Edit**
<br />

  - Using the .csv file that you downloaded from Ameritrade, you can import the file under "DATA IMPORT" by either:
      - Click and selecting the file 
      - Drag and dropping the file
  - Once uploaded, the years corresponding to the file should show in the "EDIT DATA" section.

<p align="left">
  <img src="https://drive.google.com/uc?export=view&id=1ev172uFsCBz3D410qfo8W5Gjha85A67Y" height="600">
</p>

<br />

### Overview of transaction data [Dashboard Page]

- After importing your transaction data, a visualization and overview of the transactions can be seen below in the Dashboard Page.  
<p align="left">
  <img src="https://drive.google.com/uc?export=view&id=1Nf_3mpI8K8UWGHu-e8-_SBF67hVWpnjA" height="650">
</p>

<br />

### View transactions and export data [Reports Page]

- The reports page shows the data in table form, in which each table has the option to be exported into a .csv file.
<p align="left">
  <img src="https://drive.google.com/uc?export=view&id=1ngco-o0Pj2OcjTdpksrZgBGg3SwC5UQL" height="400">
</p>

<br />

---

## Development

### Setup Locally

> Make sure backend image and container is running first.

* Install [docker](https://www.docker.com/get-started) dependency
* Clone the frontend repo to your local machine:
```sh
git clone git@github.com:invest-io/frontend.git
```
* Build and run image in the frontend directory:
```sh
# build image
docker build -t docker.pkg.github.com/invest-io/frontend/frontend:latest .
# run image
docker run --name=test -p 80:80 -td docker.pkg.github.com/invest-io/frontend/frontend:latest
```

* Application is now running on localhost:  `http://localhost/`
