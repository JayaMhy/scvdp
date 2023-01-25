# AI and Blockchain-based Source Code Vulnerability Detection and Prevention System for Multiparty Software Development

Panchanan Nath, Jaya Rani Mushahary, Ujjal Roy, Maharaj Brahma, Pranav Kumar Singh

Department of Computer Science and Engineering

Central Institute of Technology Kokrajhar, BTR, Assam, 783370, India

This repository contains the official code for the [paper](https://www.sciencedirect.com/science/article/pii/S0045790623000320) accepted at Journal of Computers and Electrical Engineering.


Usage:

```sh
npm install
```

```sh
bower install
```

For Development (With auto reloading)

```sh
npm run dev
```

or

```sh
npm run start
```

To start Vulnerability Detection server

In new terminal

```sh
cd vulnerability-detector
python app.py
```

To start IPFS

```sh
ipfs daemon
```

### Citation
If this work helps in your research, please cite:

    @article{NATH2023108607,
    title = {AI and Blockchain-based source code vulnerability detection and prevention system for multiparty software development},
    journal = {Computers and Electrical Engineering},
    volume = {106},
    pages = {108607},
    year = {2023},
    issn = {0045-7906},
    doi = {https://doi.org/10.1016/j.compeleceng.2023.108607},
    url = {https://www.sciencedirect.com/science/article/pii/S0045790623000320},
    author = {Panchanan Nath and Jaya Rani Mushahary and Ujjal Roy and Maharaj Brahma and Pranav Kumar Singh},
    keywords = {Deep learning, Blockchain, Smart contract, IPFS, Software testing, Software development},
    abstract = {With the growing demand for application software, there is a race among industries to develop software as quickly as possible. However, maintaining pace and ensuring bug-free software has become increasingly challenging in a work-from-home arrangement as software developers are not under constant supervision. It increases the possibility of buggy products, and traditional testing techniques fail to provide optimal performance. We propose an Artificial Intelligence (AI) and blockchain-based novel decentralized software testing system. The proposed system aims to detect and prevent vulnerable code by synergizing deep learning capabilities and smart-contract-powered blockchain. The vulnerability detection is performed automatically without relying on manually written rules. We propose a non-vulnerability score range map to classify the source code. Furthermore, we integrate an InterPlanetary File System (IPFS) to ensure efficient storage over the blockchain. We conduct a testbed-based experiment to demonstrate the effectiveness of AI and blockchain integration for secure code development and testing.}
    }

### Acknowledgments
We would like to thank Daniel Lin for making [function level vulnerability detection](https://github.com/DanielLin1986/Function-level-Vulnerability-Detection) available.
