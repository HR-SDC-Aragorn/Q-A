# Q-A

# Systems Design Capstone Project

Project Description
----------------
This is the Hack Reactor systems design capstone project that required our group to create an API to support our front-end capstone projects. The goal of the project was to design a database and server to replace the API we used previously. The database and servers are to be deployed on AWS EC2 t2.micro instances. Once deployed, we needed to optimize the servers in order to handle a minimum of 100 clients per second with an average response time < 2000ms.

Before Optimizations (1000 clients per second for 60s, Avg 1501 ms Response, 89.1% throughput)
----------------
![1000 CPS before optimizations](https://github.com/HR-SDC-Aragorn/Q-A/blob/main/BEFORE%20questions%201000%20RPS.png)

After Optimizations (1000 clients per second for 60s, Avg 11 ms Response, 99.8% throughput)
----------------
![1000 CPS after optimizations](https://github.com/HR-SDC-Aragorn/Q-A/blob/main/BEST%201000%20RPS%20w:%20health%20check.png)


Dependencies
----------------
- PostgreSQL
- Express
- Axios
- Jest
- Webpack

## Authors
### Stephen Ho
<p><a href="https://github.com/stephen-ho"><img src="https://camo.githubusercontent.com/f6d50128cb007f85916b7a899da5d94f654dce35a37331c8d28573aef46f4274/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6769746875622d2532333132313031312e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d676974687562266c6f676f436f6c6f723d7768697465" alt="GitHub" data-canonical-src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&amp;logo=github&amp;logoColor=white" style="max-width: 100%;"></a>
<a href="mailto:stephenkho@me.com"><img src="https://camo.githubusercontent.com/571384769c09e0c66b45e39b5be70f68f552db3e2b2311bc2064f0d4a9f5983b/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f476d61696c2d4431343833363f7374796c653d666f722d7468652d6261646765266c6f676f3d676d61696c266c6f676f436f6c6f723d7768697465" alt="Gmail" data-canonical-src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&amp;logo=gmail&amp;logoColor=white" style="max-width: 100%;"></a>
<a href="https://www.linkedin.com/in/stephen-ho-51b30765/" rel="nofollow"><img src="https://camo.githubusercontent.com/7e1a1a039c75a7c4d2a91d7f97bf0a1c2adcf7cb49b7dbbfc02963a4f9fdaca4/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6c696e6b6564696e2d2532333030373742352e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d6c696e6b6564696e266c6f676f436f6c6f723d7768697465" alt="Linkedin" data-canonical-src="https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&amp;logo=linkedin&amp;logoColor=white" style="max-width: 100%;"></a>
</p>
